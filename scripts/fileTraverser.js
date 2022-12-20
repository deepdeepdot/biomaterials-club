//requiring path and fs modules
const path = require('path');
const fs = require('fs');


const isImage = file => file.endsWith('.jpg') || file.endsWith('.png');
const isMovie = file => file.endsWith('.mp4') || file.endsWith('.MOV');

const writeImageTag = file => console.log(`
<img src="${file}"/>
`);

function fileTraverser(dir = '.', callback = writeImageTag, filter = isImage) {
    const directoryPath = path.join(__dirname, dir);

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        let reversed = files.reverse();

        reversed.forEach(function (file) {
            if (filter(file)) {
                callback(file);
            }
        });
    });    
}

fileTraverser('../images');
