const options = {
  method: "GET",
  headers: {
    "Transfer-Encoding": "chunked",
    Connection: "keep-alive",
    Vary: "Accept-Encoding",
    "CDN-PullZone": "93447",
    "CDN-Uid": "8fa3a04a-75d9-4707-8056-b7b33c8ac7fe",
    "CDN-RequestCountryCode": "GB",
    "CDN-ProxyVer": "1.03",
    "CDN-RequestPullSuccess": "True",
    "CDN-RequestPullCode": "200",
    "CDN-CachedAt": "06/07/2023 10:43:08",
    "CDN-EdgeStorageId": "947",
    "CDN-Status": "200",
    "CDN-RequestId": "a83ed6be3dc65fe78b8ece425fe518f8",
    "CDN-Cache": "MISS",
    "Cache-Control": "public, max-age=180",
    "Content-Type": "application/json",
    Date: "Wed, 07 Jun 2023 10:43:08 GMT",
    Server: "BunnyCDN-FR1-1073",
  },
};

// accessing HTML elements
const cityInput = document.getElementById("cityInput");
const submitButton = document.getElementById("submit");
const displayTemp = document.getElementById("displayTemp");
const displayLocation = document.getElementById("locationName");
const weatherType = document.getElementById("weather-type");
const currentWeatherLogo = document.getElementById("current-weather-logo");
const displayHumidity = document.getElementById("displayHumidity");
const displayFeelsLike = document.getElementById("feelsLike");
const displayVisibility = document.getElementById("displayVisibility");
const displayWindSpeed = document.getElementById("displayWindSpeed");
const displayPressure = document.getElementById("displayPressure");
const displayPm25 = document.getElementById("PM25");
const displaySo2 = document.getElementById("SO2");
const displayO3 = document.getElementById("O3");
const displayNo2 = document.getElementById("NO2");
const airQualityBtn = document.getElementById("air-index");

async function fetchWeatherData(city) {
  const apiKey = "ff8697ecfab046fdacf103948230706";
  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  try {
    const response = await fetch(apiUrl);
    const weatherData = await response.json();

    // destructring response object and assigning them into varibles..
    const {
      location: { name: locationName },
      current: {
        temp_c: temperature,
        condition: { text: weatherCondition },
        humidity,
        feelslike_c: feelsLike,
        vis_km: visibility,
        wind_kph: windSpeed,
        pressure_mb: pressure,
        air_quality: { no2, o3, so2, pm2_5: pm25, "us-epa-index": epaIndex },
      },
    } = weatherData;

    displayTemp.innerHTML = `${temperature}<sup>°C</sup>`;
    displayLocation.innerHTML = locationName;
    weatherType.innerHTML = weatherCondition;
    displayHumidity.innerHTML = `${humidity}%`;
    displayFeelsLike.innerHTML = `${feelsLike}<sup>°C</sup>`;
    displayVisibility.innerHTML = `${visibility} Km`;
    displayWindSpeed.innerHTML = `${windSpeed} km/h`;
    displayPressure.innerHTML = `${pressure}hPa`;
    displayPm25.innerHTML = Math.ceil(pm25 * 100) / 100;
    displayNo2.innerHTML = Math.ceil(no2 * 100) / 100;
    displaySo2.innerHTML = Math.ceil(so2 * 100) / 100;
    displayO3.innerHTML = Math.ceil(o3 * 100) / 100;

    if (weatherCondition === "Mist") {
      currentWeatherLogo.setAttribute(
        "src",
        "./assets/images/weather_icons/04d.png"
      );
    } else if (weatherCondition === "Sunny" || weatherCondition === "clear") {
      currentWeatherLogo.setAttribute(
        "src",
        "./assets/images/weather_icons/01d.png"
      );
    } else if (weatherCondition === "Partly cloudy") {
      currentWeatherLogo.setAttribute(
        "src",
        "./assets/images/weather_icons/03n.png"
      );
    } else if (weatherCondition === "Cloudy") {
      currentWeatherLogo.setAttribute(
        "src",
        "./assets/images/weather_icons/03d.png"
      );
    } else if (weatherCondition === "Overcast") {
      currentWeatherLogo.setAttribute(
        "src",
        "./assets/images/weather_icons/02d.png"
      );
    } else if (weatherCondition === "Patchy rain possible") {
      currentWeatherLogo.setAttribute(
        "src",
        "./assets/images/weather_icons/10d.png"
      );
    } else if (
      weatherCondition === "Patchy snow possible" ||
      weatherCondition === "Patchy freezing drizzle possible" ||
      weatherCondition === "Blowing snow" ||
      weatherCondition === "Freezing fog" ||
      weatherCondition === "Moderate or heavy snow with thunder" ||
      weatherCondition === "Light showers of ice pellets" ||
      weatherCondition === "Moderate or heavy showers of ice pellets" ||
      weatherCondition === "Patchy light snow" ||
      weatherCondition === "Patchy moderate snow" ||
      weatherCondition === "Moderate snow" ||
      weatherCondition === "Heavy snow"
    ) {
      currentWeatherLogo.setAttribute(
        "src",
        "./assets/images/weather_icons/13d.png"
      );
    } else if (
      weatherCondition === "Patchy light rain" ||
      weatherCondition === "Moderate rain at times" ||
      weatherCondition === "Moderate rain" ||
      weatherCondition === "Heavy rain at times"
    ) {
      currentWeatherLogo.setAttribute(
        "src",
        "./assets/images/weather_icons/09d.png"
      );
    } else if (
      weatherCondition === "Thundery outbreaks possible" ||
      weatherCondition === "Patchy light drizzle" ||
      weatherCondition === "Light drizzle" ||
      weatherCondition === "Moderate or heavy rain with thunder"
    ) {
      currentWeatherLogo.setAttribute(
        "src",
        "./assets/images/weather_icons/11n.png"
      );
    }

    if (epaIndex === 1) {
      airQualityBtn.innerHTML = "Good";
      airQualityBtn.style.background = "#8ee28d";
    } else if (epaIndex === 2) {
      airQualityBtn.innerHTML = "Moderate";
      airQualityBtn.style.background = "#98EECC";
    } else if (epaIndex === 3 || epaIndex === 4) {
      airQualityBtn.innerHTML = "Unhealthy";
      airQualityBtn.style.background = "#FF55BB";
    } else if (epaIndex === 5) {
      airQualityBtn.innerHTML = "Very Unhealthy";
      airQualityBtn.style.background = "#2CD3E1";
    } else if (epaIndex === 6) {
      airQualityBtn.innerHTML = "Hazardous";
      airQualityBtn.style.background = "#D4ADFC";
    }

    console.log(weatherData);
  } catch (error) {
    console.log("Error:", error);
  }
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  fetchWeatherData(cityInput.value);
});

fetchWeatherData("Delhi India");
