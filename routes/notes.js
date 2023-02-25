const notes = require('express').Router();
const fs = require('fs');
const uuid = require('uuid');

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
            "id": uuid,
        };

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

notes.delete('/:id', function(req, res) {
    const id = req.params.id;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            jsonRes = JSON.parse(data);
            for (let i = 0; i < jsonRes.length; i++) {
                if (jsonRes[i].id == id) {
                    jsonRes.splice([i],1);
                }
            }
            fs.writeFile('./db/db.json', JSON.stringifu(jsonRes), (err) =>
            err ? console.error(err) : console.info(`\nData in database`));
            res.json(jsonRes);
        }})
});

module.exports = notes;