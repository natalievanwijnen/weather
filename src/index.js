function getTextWidth(text) {
  let hiddenText = document.getElementById("hiddenText");
  hiddenText.innerText = text;
  return hiddenText.offsetWidth;
}

function adjustWidth() {
  let inputElement = document.getElementById("citySearch");
  let minWidth = 40;

  let inputValue = inputElement.value.trim();
  let newWidth =
    inputValue === ""
      ? minWidth + "px"
      : Math.max(getTextWidth(inputValue), minWidth) + "px";

  inputElement.style.width = newWidth;
}

function showWeather(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );
}

function updateDateTime() {
  let todayElement = document.getElementById("today");
  let timeElement = document.getElementById("time");
  let now = new Date();
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  todayElement.innerHTML = weekdays[now.getDay()];
  timeElement.innerHTML = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function searchCity(city) {
  let apiKey = "ofa25a26c683btbc029a13b3d2bf94cc";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiURL).then(showWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#citySearch");
  searchCity(searchInput.value);
}

searchCity("Perth");

updateDateTime();

setTimeout(function () {
  updateDateTime();
  setInterval(updateDateTime, 60000);
}, (60 - new Date().getSeconds()) * 1000);
