//import
const util = require('util');
const fs = require('fs');

//promisify
const readFromFile = util.promisify(fs.readFile);
/** 
@param {string} destination
@param {object} content
@returns {void}
*/

const writeToFile = (destination, content) =>
fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
err ? console.error(err) : console.info(`\nData written to ${destination}`));
/** 
@param {string} content
@param {object} file
@returns {void}
*/

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

const readAndDelete = (id) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if(err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data)
            for(let i=0; i < parsedData.length; i++) {
                let currentNote = parsedData[i]
                if(currentNote.note_id === id) {
                    parsedData.splice(i, 1)
                    writeToFile('./db/db.json', parsedData);
                }
            }
        }
    });
};

module.exports = { readFromFile, writeToFile, readAndAppend, readAndDelete };
