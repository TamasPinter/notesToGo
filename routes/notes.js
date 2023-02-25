const notes = require('express').Router();
const fs = require('fs');
const uuid = require('uuid');
const readAndDelete = require('../middlewarehelpers/fsUtils').readAndDelete;

notes.get('/', function(req, res) {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;
    if(title && text) {
        const newNote = {
            title,
            text,
        };
        //push uuid to newNote
        newNote.id = uuid.v4();
        //push newNote to db.json

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const parsedData = JSON.parse(data);
                parsedData.push(newNote);
                fs.writeFile('./db/db.json', JSON.stringify(parsedData), (err) =>
                err ? console.error(err) : console.info(`\nData placed in database!`)
                );
            }
        });

        const response = {
            status: 'success',
            body: newNote,
        };
        res.json(response);
    } else {
        res.json(`Error in posting note`);
    }
});

notes.delete('/notes/:id', (req, res)  => {
   fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) throw err;
    let notes = JSON.parse(data);
    const newNotes = notes.filter(note => note.id !== parseInt(req.params.id));
    fs.writeFile('./db/dbjson', JSON.stringify(newNotes), (err, data) => {
        res.json({msg: 'Note deleted', notes: newNotes});
    })
   })
});

module.exports = notes;