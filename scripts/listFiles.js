//requiring path and fs modules
const path = require('path');
const fs = require('fs');

//joining path of directory 
const directoryPath = path.join(__dirname, '..'); // path.join(__dirname, 'Documents');

const isImage = file => file.endsWith('.jpg') || file.endsWith('.png');

//passsing directoryPath and callback function
fs.readdir(directoryPath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    let reversed = files.reverse();

    //listing all files using forEach
    reversed.forEach(function (file) {
        // Do whatever you want to do with the file
        if (isImage(file))
            console.log(`
            <img src="${file}"/>
            `);
    });
});
