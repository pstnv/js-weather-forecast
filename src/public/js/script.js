import {
    loadForecastCurrentLocation,
    onFormSubmit,
} from "./utils/eventHandlers.js";

const form = document.querySelector("#search");

window.addEventListener("DOMContentLoaded", loadForecastCurrentLocation);

form.addEventListener("submit", onFormSubmit);
