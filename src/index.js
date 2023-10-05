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

function showWeatherCondition(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;
  document.querySelector("#currentTemp").innerHTML = Math.round(
    response.data.main.temp
  );
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
  let temperatura = temperaturaElement.innerHTML;
  temperatura = Number(temperatura);
  temperaturaElement.innerHTML = Math.round(temperatura * 1.8 + 32);
}

let farrenLink = document.querySelector("#tempFar");
farrenLink.addEventListener("click", convertToFar);

function convertToCel(event) {
  event.preventDefault();
  let temperaturaElement = document.querySelector("#currentTemp");
  let temperatura = temperaturaElement.innerHTML;
  temperatura = Number(temperatura);
  temperaturaElement.innerHTML = Math.round(((temperatura - 32) * 5) / 9);
}

let celLink = document.querySelector("#tempCel");
celLink.addEventListener("click", convertToCel);

DefaultCity("Kyiv");
