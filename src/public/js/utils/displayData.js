const weekDayField = document.querySelector("#weekDay");
const dateField = document.querySelector("#date");
const daysForecast = document.querySelector("#coming");

const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

export function displayTodayData(today) {
    const day = today.getDay();
    const date = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    const weekDay = weekDays[day];
    weekDayField.textContent = `${weekDay}`;

    dateField.textContent = `${date}/${month + 1}/${year}`;
}

export function displayDailyForecast(dailyForecast) {
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
