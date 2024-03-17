import { displayTodayData, displayDailyForecast } from "./displayData.js";

function fillInfo(location, forecast) {
    const { current: currentForecast, daily: dailyForecast } = forecast;
    const {
        dt: today,
        temp,
        feels_like,
        wind_speed,
        humidity,
        pressure,
        weather: [weather],
    } = currentForecast;

    const weatherPic = document.querySelector("#weatherPic");
    weatherPic.innerHTML = `<img id="weatherNow" src="https://openweathermap.org/img/wn/${weather.icon}@2x.png">`;

    const city = document.querySelector("#city");
    city.textContent = `${location.name}, ${location.country}`;

    displayTodayData(new Date(today * 1000));

    const tempField = document.querySelector("#temp");
    tempField.textContent = `${Math.floor(temp)}°C`;

    const feelsLikeField = document.querySelector("#feelsLike");
    feelsLikeField.innerHTML = `Feels like <span>${Math.round(
        feels_like
    )}°C</span>`;

    const conditionsField = document.querySelector("#conditions");
    conditionsField.innerHTML = `Conditions <span>${weather.description}</span>`;

    const windField = document.querySelector("#wind");
    windField.innerHTML = `Wind <span>${Math.round(wind_speed)} km/h</span>`;

    const humidityField = document.querySelector("#humidity");
    humidityField.innerHTML = `Humidity <span> ${Math.round(
        humidity
    )} %</span>`;

    const pressureField = document.querySelector("#pressure");
    pressureField.innerHTML = `Pressure <span>${Math.round(
        pressure
    )} Pa</span>`;

    displayDailyForecast(dailyForecast);
}

export default fillInfo;
