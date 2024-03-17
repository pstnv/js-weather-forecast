const express = require("express");
require("dotenv").config();

const _API = {
    link: "https://api.openweathermap.org/data/2.5/",
    key: process.env.OPENWEATHER_API_KEY,
    geocodingLink: "https://api.openweathermap.org/geo/1.0",
};

const app = express();
app.use(express.static("./src/public"));

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/city", getRequestHandler);
app.get("/city/:city", getRequestHandler);

app.use("*", (req, res) => {
    res.status(400)
        .type("html")
        .send(
            '<h3>The page does not exist <a href=" / ">Return home page</a></h3>'
        );
});

app.listen(5000, () => {
    console.log("server is listening on port 5000");
});

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

async function getRequestHandler(req, res) {
    const { city } = req.params;
    const { lon, lat } = req.query;
    if (!city && !(lat && lon)) {
        return res.status(401).json({
            success: false,
            message: "Please, provide city or coordinates",
        });
    }
    const currentLocation = { city, lat, lon };
    try {
        const location = await getLocation(currentLocation);
        const data = await getForecast(location);
        return res.status(200).json({ success: true, data });
    } catch (err) {
        return res
            .status(err.status || 400)
            .json({ success: false, message: err.message });
    }
}
