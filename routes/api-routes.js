const util = require('util');
const fs = require("fs");

const asyncReadFile = util.promisify(fs.readFile);

module.exports = function(app) {
    app.get("/api/notes", async function(req, res) {
        try {
            const db = await asyncReadFile("./db/db.json", "utf-8");
            res.json(db);
        } catch (error) {
            console.log(error);
        }
    });

    app.post("/api/notes", async function(req, res) {
        try {
            const db = await asyncReadFile("./db/db.json", "utf-8");
            dbParsed = JSON.parse(db);
            dbParsed.push(req.body);
            console.log(dbParsed);
        } catch (error) {
            console.log(erro);
        }
    })
}