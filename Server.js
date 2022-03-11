// Dependencies

const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const allNotes = require('./db/db.json');
const express = require('express');
const app = express();

// linked to assets
app.use(express.static('public'));

// Data Parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Pull INDEX AND NOTES HTML
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
})



// GET and POST function set up.
app.route("/api/notes")
    
    

.get(function (req, res) {
    res.json(database);
})

 
.post(function (req, res) {
    let jsonFilePath = path.join(__dirname, "/db/db.json");
    let newNote = req.body;

    let highestId = 99;
      
    for (let i = 0; i < database.length; i++) {
    let individualNote = database[i];

    if (individualNote.id > highestId) {
              
    highestId = individualNote.id;
    }

}
     
    newNote.id = highestId + 1;
    database.push(newNote)
        
        
    fs.writeFile(jsonFilePath, JSON.stringify(database), function (err) {
            
    if (err) {
    return console.log(err);
    }
    console.log("Your note was saved!");
        });
        // if information is 'true' note will be saved if not 'err' will return
        res.json(newNote);
    });
    
    // Delete Function set up.

app.delete("/api/notes/:id", function (req, res) {
    let jsonFilePath = path.join(__dirname, "/db/db.json");
        
    for (let i = 0; i < database.length; i++) {
    
    if (database[i].id == req.params.id) {
    
    database.splice(i, 1);
    break;
    }
}
        // JSON file stringify
fs.writeFileSync(jsonFilePath, JSON.stringify(database), function (err) {
    
    if (err) {
        return console.log(err);
        } else {
        console.log("Your note was deleted!");
        }
    });
    res.json(database);
});
    
   // LISTEN (set up server)
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });