// required path module
const path = require("path");

// export of module function
module.exports = function(app) {

    // sends notes.html when requested for notes page
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // sends index.html when no other route is found
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
}