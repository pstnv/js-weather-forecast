const { getLocation, getForecast } = require("../utils/getData");

async function getCityWeather(req, res) {
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

module.exports = getCityWeather;
