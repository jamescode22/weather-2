import { updateWeatherWidget, showError } from "./modules/interface.js";
import { getLocation } from "./modules/location.js";

async function getWeather() {
  try {
    const { latitude, longitude } = await getLocation();

    // CONFIGURE OPENWEATHER API
    const openWeatherAPIKey = "071a5ac51515a32204c01d5f04dcd753";
    const forecastWeatherURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${openWeatherAPIKey}`;
    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${openWeatherAPIKey}`;

    const { data: currentData } = await axios.get(currentWeatherURL);
    const { data: forecastData } = await axios.get(forecastWeatherURL);
    updateWeatherWidget(currentData, forecastData);
  } catch (error) {
    showError("Weather data error", error);
  }
}

getWeather();
