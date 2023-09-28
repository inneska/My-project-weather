// Заміна дати на поточну
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

  let currentDayTime = document.querySelector("#week-day-time");
  currentDayTime.innerHTML = `${day} ${hours}:${min}`;
}
setCurrentDateTime();

// Відображення введеного міста як поточного і його погодні умови
function showTemperature(response) {
  // console.log(response);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElememt = document.querySelector("#currentTemp");
  temperatureElememt.innerHTML = `${temperature}`;
  // Короткий опис по хмарності
  let description = response.data.weather[0].description;
  description = description.charAt(0).toUpperCase() + description.slice(1);
  let descriptionElememt = document.querySelector("#short-description");
  descriptionElememt.innerHTML = `${description}`;
  // Поточна вологість
  let humidity = response.data.main.humidity;
  let humidityElememt = document.querySelector("#humidity");
  humidityElememt.innerHTML = ` Humidity: ${humidity}%`;
  // Швидкість вітру wind
  let wind = response.data.wind.speed;
  let windElememt = document.querySelector("#wind");
  windElememt.innerHTML = ` Wind: ${wind} km/h`;
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city-input");
  let currentCity = document.querySelector("#cityChoise");
  input.value = input.value.charAt(0).toUpperCase() + input.value.slice(1);
  currentCity.innerHTML = `${input.value}`;
  let apiKey = "1dbf926d3b4417bf379db7043bec1047";
  let urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric&appid=${apiKey}`;
  axios.get(`${urlApi}`).then(showTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);

// Перехід між цельсіями і фаренгейтами

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
