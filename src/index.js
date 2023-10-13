function setCurrentDateTime() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hours = now.getHours().toString().padStart(2, "0");
  let min = now.getMinutes().toString().padStart(2, "0");

  let currentDayTime = document.querySelector("#day-time");
  currentDayTime.innerHTML = `${day} ${hours}:${min}`;
}
setCurrentDateTime();

function formateDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayforecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2 weather-forecast-daily">
      <div class="weather-forecast-daily_day_name">${formateDay(
        forecastDay.dt
      )}</div>
        <img 
                  src="https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  class="daily_weather_forecast_picture"
                />
        <div class="daily_weather_forecast_temps">
          <span class="day_temp_forecast">${Math.round(
            forecastDay.temp.max
          )}°</span>
          <span class="night_temp_forecast">${Math.round(
            forecastDay.temp.min
          )}°</span>
      </div>
    </div>
            
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1dbf926d3b4417bf379db7043bec1047";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(`${apiUrl}`).then(displayforecast);
}

function showWeatherCondition(response) {
  console.log(response);
  document.querySelector("#cityName").innerHTML = response.data.name;
  //
  celsiusTemperatura = response.data.main.temp;
  //
  document.querySelector("#currentTemp").innerHTML =
    Math.round(celsiusTemperatura);

  //
  let description = response.data.weather[0].description;
  description = description.charAt(0).toUpperCase() + description.slice(1);
  let descriptionElement = document.querySelector("#short-description");
  descriptionElement.innerHTML = `${description}`;
  //
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  //
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  //
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  //
  iconElement.setAttribute("alt", description);
  getForecast(response.data.coord);
}

function DefaultCity(city) {
  let apiKey = "1dbf926d3b4417bf379db7043bec1047";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${urlApi}`).then(showWeatherCondition);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  DefaultCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

function searchLocation(position) {
  let apiKey = "1dbf926d3b4417bf379db7043bec1047";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-place-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function convertToFar(event) {
  event.preventDefault();
  let temperaturaElement = document.querySelector("#currentTemp");
  temperaturaElement.innerHTML = Math.round(celsiusTemperatura * 1.8 + 32);
  celLink.classList.remove("active");
  farrenLink.classList.add("active");
}

let farrenLink = document.querySelector("#tempFar");
farrenLink.addEventListener("click", convertToFar);

let celsiusTemperatura = null;

function convertToCel(event) {
  event.preventDefault();
  let temperaturaElement = document.querySelector("#currentTemp");
  temperaturaElement.innerHTML = Math.round(celsiusTemperatura);
  farrenLink.classList.remove("active");
  celLink.classList.add("active");
}

let celLink = document.querySelector("#tempCel");
celLink.addEventListener("click", convertToCel);

DefaultCity("Kyiv");
