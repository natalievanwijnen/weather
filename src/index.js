// Input
function handleInput(event) {
  let inputElement = document.getElementById("citySearch");
  let minWidth = 40;

  if (event.key === "Enter") {
    event.preventDefault();
    searchCity(inputElement.value.trim());
  } else {
    let inputValue = inputElement.value.trim();
    let newWidth =
      inputValue === ""
        ? `${minWidth}px`
        : `${Math.max(getTextWidth(inputValue), minWidth)}px`;

    inputElement.style.width = newWidth;
  }
}

// Display
function showWeather(response) {
  let { temperature, condition, wind } = response.data;
  document.getElementById("temperature").innerHTML = Math.round(
    temperature.current
  );
  document.getElementById("description").innerHTML = condition.description;
  document.getElementById("wind").innerHTML = Math.round(wind.speed);
  document.getElementById("humidity").innerHTML = Math.round(
    temperature.humidity
  );
  document.getElementById(
    "currentSymbol"
  ).innerHTML = `<img src="${condition.icon_url}" class="weather-app-icon" />`;
}

function updateDateTime() {
  let now = new Date();
  let todayElement = document.getElementById("today");
  let timeElement = document.getElementById("time");
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

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.slice(0, 5).forEach(function (day) {
    forecastHtml += `
      <span>
        <p class="forecast-day" id="weekday">${formatTimestamp(day.time)}</p>
        <div class="forecast-symbol" id="forecastSymbol">
          <img src="${day.condition.icon_url}" />
        </div>
        <span id="forecast-high">
          <strong>${Math.round(day.temperature.maximum)}°</strong>
        </span>
        <span id="forecast-low">${Math.round(day.temperature.minimum)}°</span>
      </span>
    `;
  });

  let forecastElement = document.getElementById("forecast");
  forecastElement.innerHTML = forecastHtml;
}

// API
function searchCity(city) {
  let apiKey = "ofa25a26c683btbc029a13b3d2bf94cc";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiURL).then(function (response) {
    showWeather(response);
    getForecast(city);
  });
}

function getForecast(city) {
  let apiKey = "ofa25a26c683btbc029a13b3d2bf94cc";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiURL).then(displayForecast);
}

// Event handling
function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#citySearch");
  searchCity(searchInput.value);
  return false;
}

// Initialization
function getTextWidth(text) {
  let hiddenText = document.getElementById("hiddenText");
  hiddenText.innerText = text;
  return hiddenText.offsetWidth;
}

function formatTimestamp(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.toLocaleDateString("en-US", { weekday: "short" });
  return day;
}

updateDateTime();

searchCity("Perth");
