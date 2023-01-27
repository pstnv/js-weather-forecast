const input = document.querySelector('#input');
const btn = document.querySelector('#btn');

input.addEventListener('keypress', (e) => {
    document.querySelector('.notFound').style.visibility = "hidden";
    if (e.keyCode === 13) {
        enter();
    }
});

btn.addEventListener('click', enter);


function enter() {
    if (input.value.trim() !== '') {
        getData(input.value.trim());
    }
}

const api = {
    link: "https://api.openweathermap.org/data/2.5/",
    key: "ddf769883d2c7f595668469959ddb290",
    geocodingLink: "https://api.openweathermap.org/geo/1.0/"
}

async function getData (city) {
    const geocode = await fetch(`${api.geocodingLink}direct?q=${city}&appID=${api.key}`);
    const geocodeRes = await geocode.json();
    if (geocodeRes.length !== 0) {
        const res = await fetch(`${api.link}onecall?lat=${geocodeRes[0].lat}&lon=${geocodeRes[0].lat}&exclude=minutely,hourly,alerts&units=metric&appID=${api.key}`);
        const result = await res.json();
        if (result.cod !== '404') {    
            fillInfo(geocodeRes, result);
        }
        else {
            document.querySelector('.notFound').style.visibility = "initial";
        }
    }  
    else {
        document.querySelector('.notFound').style.visibility = "initial";
    }
}


function fillInfo(geoCode, data) {
    let weatherPic = document.querySelector('#weatherPic');
    weatherPic.innerHTML = `<img id="weatherNow" src="https://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png">`;

    let city = document.querySelector('#city');
    city.textContent = `${geoCode[0].name}, ${geoCode[0].country}`;

    getTodayDate(new Date(data.current.dt*1000));

    let temp = document.querySelector('#temp');
    temp.textContent = `${Math.floor(data.current.temp)}°C`;
    
    let feelsLike = document.querySelector('#feelsLike');
    feelsLike.innerHTML = `Feels like <span>${Math.round(data.current.feels_like)}°C</span>`;
    
    let conditions = document.querySelector('#conditions');
    conditions.innerHTML = `Conditions <span>${data.current.weather[0].description}</span>`;
    
    let wind = document.querySelector('#wind');
    wind.innerHTML = `Wind <span>${Math.round(data.current.wind_speed)} km/h</span>`;
    
    let humidity = document.querySelector('#humidity');
    humidity.innerHTML = `Humidity <span> ${Math.round(data.current.humidity)} %</span>`;
    
    let pressure = document.querySelector('#pressure');
    pressure.innerHTML = `Pressure <span>${Math.round(data.current.pressure)} Pa</span>`;


    let daysForecast = document.querySelectorAll('.oneDay');
    daysForecast.forEach((item, index) => {
        let soonDay = weekDays[(new Date(data.daily[index+1].dt*1000)).getDay()];
        item.querySelector('.OneDayHeader').textContent = soonDay;
        item.querySelector('.soonPic').src = `https://openweathermap.org/img/wn/${data.daily[index+1].weather[0].icon}@2x.png`;
        item.querySelector('.soonTemp').textContent = `${Math.round(data.daily[index+1].temp.day)}`;
    });
}


const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
function getTodayDate(today) {
    const weekDay = document.querySelector('#weekDay');
    weekDay.textContent = `${weekDays[today.getDay()]}`;

    const date = document.querySelector('#date');
    date.textContent = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`;
};

gsap.from(".oneDay", {
    scrollTrigger: ".oneDay", // start the animation when ".box" enters the viewport (once)
    y: 100,
    stagger: 1,
    duration: .5,
    opacity: 0
  });