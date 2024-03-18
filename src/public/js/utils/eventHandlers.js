import { getForecast } from "./getData.js";

const form = document.querySelector("#search");

export function loadForecastCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userCoordinates = position.coords;
            console.log("load window, ok", userCoordinates);
            getForecast(userCoordinates);
        },
        (err) => {
            console.log(`Error: ${err.message}`);
            console.log("load window, error");
            getForecast();
        }
    );
}

export function onFormSubmit(e) {
    e.preventDefault();
    const city = form.elements["city"].value.trim();
    if (!city) {
        return;
    }
    console.log("function form submit", city);
    getForecast({ city });
}
