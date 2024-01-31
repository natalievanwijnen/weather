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

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.getElementById("citySearch");
  console.log(searchInput.value);
}

let searchFormElement = document.querySelector("#searchForm");
searchFormElement.addEventListener("submit", handleSearch);
