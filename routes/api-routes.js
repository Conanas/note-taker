const util = require('util');
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

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
            const id = uuidv4();
            dbParsed = JSON.parse(db);
            req.body.id = id;
            dbParsed.push(req.body);
            await asyncWriteFile("./db/db.json", JSON.stringify(dbParsed, null, 2));
            res.json(req.body);
        } catch (error) {
            console.log(error);
        }
    });

    app.delete("/api/notes/:id", async function(req, res) {
        try {
            const db = await asyncReadFile("./db/db.json", "utf-8");
            const id = req.params.id;
            dbParsed = JSON.parse(db);
            dbParsed.forEach(item => {
                if (item.id === id) {
                    dbParsed.splice(dbParsed.indexOf(item), 1);
                    return;
                }
            });
            await asyncWriteFile("./db/db.json", JSON.stringify(dbParsed, null, 2));
            res.json(req.body);
        } catch (error) {
            console.log(error);
        }
    })
}