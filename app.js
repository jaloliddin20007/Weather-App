const apiKey = "d52285ff8d2ccd2ae623dfff0d4d6593";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon")

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    var data = await response.json();

    if (data.cod !== 200) {
      cityElement.textContent = "City not found";
      tempElement.textContent = "";
      humidityElement.textContent = "";
      windElement.textContent = "";
      return;
    }

    cityElement.textContent = data.name;
    tempElement.textContent = Math.round(data.main.temp) + "°C";
    humidityElement.textContent = data.main.humidity + "%";
    windElement.textContent = data.wind.speed + " km/h";
  } catch (error) {
    console.error("Error fetching weather data:", error);
    cityElement.textContent = "Error fetching data";
    tempElement.textContent = "";
    humidityElement.textContent = "";
    windElement.textContent = "";
  }
  if(data.weather[0].main == "Clouds"){
    weatherIcon.src = "images/clouds.png"
  }
  else if(data.weather[0].main == "Clear"){
    weatherIcon.src = "images/clear.png"
  }
  else if(data.weather[0].main == "Rain"){
    weatherIcon.src = "images/rain.png"
  }
  else if(data.weather[0].main == "Drizzle"){
    weatherIcon.src = "images/drizzle.png"
  }
  else if(data.weather[0].main == "Mist"){
    weatherIcon.src = "images/mist.png"
  }
  else if(data.weather[-0].main == "Snow"){
    weatherIcon.src = "images/snow.png"
  }

  document.querySelector("weather").style.display = "block"
}

async function handleSearch() {
  const city = searchBox.value.trim();
  if (city) {
    await checkWeather(city);
  } else {
    cityElement.textContent = "Please enter a city";
    tempElement.textContent = "";
    humidityElement.textContent = "";
    windElement.textContent = "";
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

// Initial weather check for New York
checkWeather("New York");
