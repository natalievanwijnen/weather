function getTextWidth(text) {
  let hiddenText = document.getElementById("hiddenText");
  hiddenText.innerText = text;
  return hiddenText.offsetWidth;
}

function adjustWidth() {
  let inputElement = document.getElementById("citySearch");
  let minWidth = 30;

  let inputValue = inputElement.value.trim();
  let newWidth =
    inputValue === ""
      ? minWidth + "px"
      : Math.max(getTextWidth(inputValue), minWidth) + "px";

  inputElement.style.width = newWidth;
}

function showWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);
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

let searchFormElement = document.querySelector("#searchForm");
searchFormElement.addEventListener("submit", handleSearch);

searchCity("Perth");
