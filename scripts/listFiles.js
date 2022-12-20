const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, '..');
const isImage = file => file.endsWith('.jpg') || file.endsWith('.png');

fs.readdir(directoryPath, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    let reversed = files.reverse();

    reversed.forEach(function (file) {
        // Do whatever you want to do with the file
        if (isImage(file))
            console.log(`
            <img src="${file}"/>
            `);
    });
});
