const notes = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const db = require('../db/db.json');
const readAndDelete = require('../middlewarehelpers/fsUtils').readAndDelete;

notes.get('/', function(req, res) {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

// notes.post('/', (req, res) => {
//     const { title, text } = req.body;
//     if(title && text) {
//         const newNote = {
//             title,
//             text,
//         };
//         //push uuid to newNote
//         newNote.id = uuid.v4();
//         //push newNote to db.json

//         fs.readFile('./db/db.json', 'utf8', (err, data) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 const parsedData = JSON.parse(data);
//                 parsedData.push(newNote);
//                 fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err) =>
//                 err ? console.error(err) : console.info(`\nData placed in database!`)
//                 );
//             }
//         });

//         const response = {
//             status: 'success',
//             body: newNote,
//         };
//         res.json(response);
//     } else {
//         res.json(`Error in posting note`);
//     }
// });

// notes.delete('/api/notes/:id', (req, res)  => {
//    let db = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
//     let noteID = req.params.id;
//     console.log(noteID)
//     let newDb = db.filter(item => item.id !== req.params.id);
//     console.log(req.params.id);
//     fs.writeFileSync('./db/db.json', JSON.stringify(newDb));
//     res.json(newDb);
// });

notes.post('/', (req, res) => {
    const newNote = req.body;
    newNote.id = uuidv4();
    db.push(newNote);
    fs.writeFile('./db/db.json', JSON.stringify(db), (err) =>
    err ? console.error(err) : console.info(`\nData placed in database!`)
    );
    res.json(db);

})

//delete a note
notes.delete('/api/notes:id', (req, res) => {
   //read the databse
    fs.read('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        //filter out the note with the id
        const newNotes = notes.filter(note => note.id !== req.params.id);
        //write the new array to the database
        fs.writeFile('./db/db.json', JSON.stringify(newNotes), (err) =>
        err ? console.error(err) : console.info(`\nData placed in database!`)
        );
        res.json(newNotes);
    });
});

module.exports = notes;