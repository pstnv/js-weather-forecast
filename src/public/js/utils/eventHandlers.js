import { getForecast } from "./getData.js";

const form = document.querySelector("#search");

export function loadForecastCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const userCoordinates = position.coords;
            getForecast(userCoordinates);
        },
        (err) => {
            console.log(`Error: ${err.message}`);
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
    getForecast({ city });
}
