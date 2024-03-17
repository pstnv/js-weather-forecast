require("dotenv").config();

const _API = {
    link: "https://api.openweathermap.org/data/2.5/",
    key: process.env.OPENWEATHER_API_KEY,
    geocodingLink: "https://api.openweathermap.org/geo/1.0",
};

async function fetchData(link) {
    try {
        const response = await fetch(link);
        if (Math.floor(response.status / 100) !== 2) {
            throw Error(`${response.message}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error.message);
        return;
    }
}
async function getLocation(currentLocation = {}) {
    const { city, lat, lon } = currentLocation;
    let geocodingLink = city
        ? `${_API.geocodingLink}/direct?q=${city}&appid=${_API.key}`
        : `${_API.geocodingLink}/reverse?lat=${lat}&lon=${lon}&appid=${_API.key}`;
    const geocodeData = await fetchData(geocodingLink);
    if (!geocodeData) {
        return;
    }
    const [location] = geocodeData;
    return location;
}

async function getForecast(location) {
    const forecastLink = `${_API.link}onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly,alerts&units=metric&appID=${_API.key}`;
    const forecastData = await fetchData(forecastLink);
    if (!forecastData) {
        return;
    }
    return { location, forecastData };
}

module.exports = { getLocation, getForecast };
