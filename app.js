const api = {
  key: "78829551b2608c7cf39d924fa10fdf31",
  baseurl: "https://api.openweathermap.org/data/2.5/forecast?q=",
};
const container = document.querySelector(".weather-info-container");
const button = document
  .querySelector(".btn")
  .addEventListener("click", handleClick);
const search = document.querySelector(".text-input");
const loading = document.querySelector(".loading");

window.addEventListener("load", handleLoad);

function handleLoad() {
  loading.style.display = "block";
  search.value = "";
  loading.innerHTML = "<h1>Enter a city!</h1>";
  container.style.visibility = "hidden";
}

function handleClick() {
  city = search.value;
  getData(city);
}

function getData(city) {
  fetch(`${api.baseurl}${city}&units=metric&cnt=9&appid=${api.key}`)
    .then((weather) => {
      return weather.json();
    })
    .then(formatWeather);
}

function formatWeather(weather) {
  container.innerHTML = "";
  var ListOfDays = weather["list"];
  loading.style.display = "block";
  loading.innerHTML = "<h1>Loading...</h1>";
  container.style.visibility = "hidden";
  try {
    ListOfDays.forEach((stamp) => {
      unixTimeStamp = stamp["dt"];
      var date = new Date(unixTimeStamp * 1000);
      var time = `${date.getDate()}/${
        date.getMonth() + 1
      } ${date.getHours()}:00`;
      var conditionIconID = stamp["weather"]["0"]["icon"];
      var conditionURL = `http://openweathermap.org/img/wn/${conditionIconID}@2x.png`;
      var temp = stamp["main"]["temp"];
      temp = Math.round(temp);
      var html = `<div class="weather-info--child">
        <h1>${time}</h1>
        <img src="${conditionURL}">
        <p>${temp}°C</p>
      </div>
      `;
      container.innerHTML += html;
    });
  } catch (TypeError) {
    loading.innerHTML = "<h1>Wrong city name entered, try again...</h1>";
  }

  loading.style.display = "none";
  container.style.visibility = "visible";
}
