const util = require('util');
const fs = require("fs");

const asyncReadFile = util.promisify(fs.readFile);
const asyncWriteFile = util.promisify(fs.writeFile);

module.exports = function(app) {

    app.get("/api/notes", async function(req, res) {
        try {
            const db = await asyncReadFile("./db/db.json", "utf-8");
            const parsedDB = JSON.parse(db);
            res.json(parsedDB);
        } catch (error) {
            console.log(error);
        }
    });

    app.post("/api/notes", async function(req, res) {
        try {
            const db = await asyncReadFile("./db/db.json", "utf-8");
            dbParsed = JSON.parse(db);
            if (dbParsed.length === "") {
                req.body.id = 1;
            } else {
                req.body.id = dbParsed.length + 1;
                dbParsed.push(req.body);
            }
            await asyncWriteFile("./db/db.json", JSON.stringify(dbParsed, null, 2));
            res.json(req.body);
        } catch (error) {
            console.log(error);
        }
    });

    app.delete("/api/notes/:id", async function(req, res) {
        try {
            const db = await asyncReadFile("./db/db.json", "utf-8");
            dbParsed = JSON.parse(db);

        } catch (error) {
            console.log(error);
        }
    })
}