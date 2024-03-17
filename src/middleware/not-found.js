const path = require("path");

function notFound(req, res) {
    res.status(400).sendFile(
        path.resolve(__dirname, "../public/not-found.html")
    );
}

module.exports = notFound;
