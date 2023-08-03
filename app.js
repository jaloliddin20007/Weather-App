const apiKey = "863242cfb2b1d357e6093d9a4df19a4b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + `${city}&appid=${apiKey}`);
    const data = await response.json();
    console.log(data);

    if (data.cod !== 200) {
      cityElement.innerHTML = "City not found";
      tempElement.innerHTML = "";
      humidityElement.innerHTML = "";
      windElement.innerHTML = "";
      return;
    }

    cityElement.innerHTML = data.name;
    tempElement.innerHTML = Math.round(data.main.temp) + "°c";
    humidityElement.innerHTML = data.main.humidity + "%";
    windElement.innerHTML = data.wind.speed + " km/h";
  } catch (error) {
    console.error("Error fetching weather data:", error);
    cityElement.innerHTML = "Error fetching data";
    tempElement.innerHTML = "";
    humidityElement.innerHTML = "";
    windElement.innerHTML = "";
  }
}

async function handleSearch() {
  const city = searchBox.value.trim();
  if (city) {
    await checkWeather(city);
  } else {
    cityElement.innerHTML = "Please enter a city";
    tempElement.innerHTML = "";
    humidityElement.innerHTML = "";
    windElement.innerHTML = "";
  }
}

searchBtn.addEventListener("click", async (event) => {
  event.preventDefault();
  await handleSearch();
});

searchBox.addEventListener("keydown", async (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    await handleSearch();
  }
});

checkWeather("New York");
