const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const default_city = "Yekaterinburg";

window.addEventListener("DOMContentLoaded", () => {
    getForecast(default_city);
});

input.addEventListener("keypress", (e) => {
    document.querySelector(".notFound").style.visibility = "hidden";
    if (e.keyCode === 13) {
        enter();
    }
});

btn.addEventListener("click", enter);
function enter() {
    if (input.value.trim() !== "") {
        const city = input.value.trim();
        getForecast(city);
    }
}

const api = {
    link: "https://api.openweathermap.org/data/2.5/",
    key: "ddf769883d2c7f595668469959ddb290",
    geocodingLink: "https://api.openweathermap.org/geo/1.0",
};

async function getData(link) {
    try {
        const response = await fetch(link);
        if (Math.floor(response.status / 100) !== 2) {
            throw Error(`Error: ${response.message}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getForecast(city) {
    const geocodingLink = `${api.geocodingLink}/direct?q=${city}&appid=${api.key}`;
    const geocodeData = await getData(geocodingLink);
    if (!geocodeData) {
        document.querySelector(".notFound").style.visibility = "initial";
        return;
    }
    const [location] = geocodeData;

    const forecastLink = `${api.link}onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly,alerts&units=metric&appID=${api.key}`;
    const forecastData = await getData(forecastLink);
    if (!forecastData) {
        document.querySelector(".notFound").style.visibility = "initial";
        return;
    }
    fillInfo(location, forecastData);
}

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

const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
function displayTodayData(today) {
    const day = today.getDay();
    const date = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    const weekDay = weekDays[day];
    const weekDayField = document.querySelector("#weekDay");
    weekDayField.textContent = `${weekDay}`;

    const dateField = document.querySelector("#date");
    dateField.textContent = `${date}/${month + 1}/${year}`;
}

function displayDailyForecast(dailyForecast) {
    const daysForecast = document.querySelector("#coming");
    const str = dailyForecast.reduce((acc, day, i) => {
        if (i === 0) {
            return acc;
        }
        const date = new Date(day.dt * 1000).getDay();
        const weekDay = weekDays[date];
        const dayIcon = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
        const dayTemp = Math.round(day.temp.day);
        acc += `        
                <div class="oneDay">
                    <h4 class="OneDayHeader">${weekDay}</h4>
                    <div class="DayData">
                        <img class="soonPic" src="${dayIcon}">
                        <p class="soonTemp">${dayTemp}°C</p>
                    </div>
                </div>`;
        return acc;
    }, "");
    daysForecast.innerHTML = str;
}

// gsap.from(".oneDay", {
//     scrollTrigger: ".oneDay", // start the animation when ".box" enters the viewport (once)
//     y: 100,
//     stagger: 1,
//     duration: 0.5,
//     opacity: 0,
// });
