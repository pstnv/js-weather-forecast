require("dotenv").config();
const city = require("./routes/city");
const notFound = require("./middleware/notFound");

const express = require("express");
const app = express();

// statuic assets from ./src/public directory
app.use(express.static("./src/public"));
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.use("/city", city);

app.use("*", notFound);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
