// required modules for server
const express = require("express");
const path = require("path");

// assignment of express module and port
const app = express();
const PORT = process.env.PORT || 3000;

// code required to process JSON files and objects
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// access to JavasScript and CSS files
app.use(express.static(path.join(__dirname, "/public")));

// access to server request routes for html files and api requests
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// server activation
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
})