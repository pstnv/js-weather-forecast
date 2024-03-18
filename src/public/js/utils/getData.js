import fillInfo from "./fillInfo.js";

const form = document.querySelector("#search");
const noResults = document.querySelector(".notFound");
const DEFAULT_CITY = { city: "Marselle" };

async function getData(location = {}) {
    const { city, latitude, longitude } = location;
    console.log("getData, location is...", location);
    const link = city
        ? `/city/${city}`
        : `/city/?lat=${latitude}&lon=${longitude}`;
    console.log(link);
    try {
        const response = await fetch(link);
        console.log("response is...", response);
        const { data, message } = await response.json();
        console.log("data после деструктуризации", data);
        if (Math.floor(response.status / 100) !== 2) {
            throw new Error(message);
        }
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function getForecast(currentLocation = DEFAULT_CITY) {
    const data = await getData(currentLocation);
    if (!data) {
        noResults.style.visibility = "visible";
        return;
    }
    const { location, forecastData } = data;
    fillInfo(location, forecastData);
    noResults.style.visibility = "hidden";
    form.reset();
}
