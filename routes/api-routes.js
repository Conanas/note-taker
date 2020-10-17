// required node modules
const util = require('util');
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

// promisifies read and write files for async implementation
const asyncReadFile = util.promisify(fs.readFile);
const asyncWriteFile = util.promisify(fs.writeFile);

// module function export
module.exports = function(app) {

    // route for getting saved notes
    app.get("/api/notes", async function(req, res) {
        try {

            // reads and parses db.json file of saved notes
            const db = await asyncReadFile("./db/db.json", "utf-8");
            const parsedDB = JSON.parse(db);

            // responds back with saved notes
            res.json(parsedDB);

        } catch (error) {
            console.log(error);
        }
    });

    // route for posting new note for db.json
    app.post("/api/notes", async function(req, res) {
        try {

            // reads db.json and parses
            const db = await asyncReadFile("./db/db.json", "utf-8");
            const id = uuidv4();

            // creates unique id for note using uuid module
            // sets id to request body
            // parses the db.json data and pushes new note with new id onto db data array
            req.body.id = id;
            dbParsed = JSON.parse(db);
            dbParsed.push(req.body);

            // writes new stringified data array to db.json
            // responds with new note
            await asyncWriteFile("./db/db.json", JSON.stringify(dbParsed, null, 2));
            res.json(req.body);

        } catch (error) {
            console.log(error);
        }
    });

    // route to delete notes from db.json
    app.delete("/api/notes/:id", async function(req, res) {
        try {

            // reads db.json and adds new id to new note from request body
            const db = await asyncReadFile("./db/db.json", "utf-8");
            const id = req.params.id;

            // parses data from db.json
            // for each object in db data check for id
            // if id is the same then splice note out and return
            dbParsed = JSON.parse(db);
            dbParsed.forEach(item => {
                if (item.id === id) {
                    dbParsed.splice(dbParsed.indexOf(item), 1);
                    return;
                }
            });

            // write new db array without deleted note to db.json
            // respond with deleted note
            await asyncWriteFile("./db/db.json", JSON.stringify(dbParsed, null, 2));
            res.json(req.body);

        } catch (error) {
            console.log(error);
        }
    })
}