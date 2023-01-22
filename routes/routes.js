const fs = require("fs");
const util = require("util");
const path = require("path");
const app = require("express").Router();
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);
var notesData;


//Reads file and sends JSON of data
app.get("/api/notes", (req, res) => {

  readFileAsync("db/db.json", "utf8").then(function (data) {

    notesData = JSON.parse(data);
    res.json(notesData);
  });
});



//adds new note and writes new JSON file
app.post("/api/notes", (req, res) => {
  readFileAsync("db/db.json", "utf8").then(function (data) {

    notesData = JSON.parse(data);

    let newNote = req.body;
    let currentID = notesData.length;

    newNote.id = currentID + 1;
    notesData.push(newNote);
    notesData = JSON.stringify(notesData);

    writeFileAsync("db/db.json", notesData).then(function (data) {

    });
    res.json(notesData);
  });
});

// loops through matching id and delets any notes that match
app.delete("/api/notes/:id", (req, res) => {
  let selID = parseInt(req.params.id);
  for (let i = 0; i < notesData.length; i++) {
    if (selID === notesData[i].id) {
      notesData.splice(i, 1);
      let noteJSON = JSON.stringify(notesData, null, 2);
      writeFileAsync("db/db.json", noteJSON).then(function () {
        console.log("Note has been deleted.");
      });
    }
  }
  res.json(notesData);
});


// Sends notes.html file
app.get("/notes", (req, res) => {
  console.log('/notes')
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// Sends index.html file 
app.get("*", (req, res) => {
  console.log('*');
  res.sendFile(path.join(__dirname, "../public/index.html"));
});


module.exports = app;