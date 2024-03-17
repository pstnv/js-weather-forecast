const path = require("path");

function notFound(req, res) {
    res.status(400).type("html").send("<h1>The page you are looking for does not exist</h1>")
        // sendFile(path.resolve(__dirname, "../public/not-found.html"));
}

module.exports = notFound;
