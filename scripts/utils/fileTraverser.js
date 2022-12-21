import path from 'path';
import fs from 'fs';

export const isImage = file => file.endsWith('.jpg') || file.endsWith('.png');
export const isVideo = file => file.endsWith('.mp4') || file.endsWith('.MOV');

const writeImageTag = file => console.log(`<img src="${file}"/>`);

function fileTraverser(dir = '..', callback = writeImageTag, filter = isImage) {
    const directoryPath = dir; // path.join(__dirname, dir);

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

export default fileTraverser;

