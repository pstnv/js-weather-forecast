const express = require("express");
const getCityWeather = require("../controllers/city");

const router = express.Router();

router.get("/", getCityWeather);
router.get("/:city", getCityWeather);

module.exports = router;
