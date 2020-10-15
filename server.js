const express = require("express");

const app = express();
const PORT = 3000;

app.listen(PORT, function(req, res) {
    console.log("App listening on PORT " + PORT);
})