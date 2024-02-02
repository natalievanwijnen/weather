// Input
function handleInput(event) {
  const inputElement = document.getElementById("citySearch");
  const minWidth = 40;

  if (event.key === "Enter") {
    event.preventDefault();
    searchCity(inputElement.value.trim());
  } else {
    const inputValue = inputElement.value.trim();
    const newWidth =
      inputValue === ""
        ? `${minWidth}px`
        : `${Math.max(getTextWidth(inputValue), minWidth)}px`;

    inputElement.style.width = newWidth;
  }
}

// Display
function showWeather(response) {
  const { temperature, condition, wind } = response.data;
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
  const now = new Date();
  const todayElement = document.getElementById("today");
  const timeElement = document.getElementById("time");
  const weekdays = [
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

// API
function searchCity(city) {
  const apiKey = "ofa25a26c683btbc029a13b3d2bf94cc";
  const apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios.get(apiURL).then(showWeather);
}

// Event handling
function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#citySearch");
  searchCity(searchInput.value);
  return false;
}

// Initialization
function getTextWidth(text) {
  const hiddenText = document.getElementById("hiddenText");
  hiddenText.innerText = text;
  return hiddenText.offsetWidth;
}

searchCity("Perth");
updateDateTime();

setTimeout(() => {
  updateDateTime();
  setInterval(updateDateTime, 60000);
}, (60 - new Date().getSeconds()) * 1000);
