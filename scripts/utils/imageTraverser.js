// @ts-check
import fs from 'fs';

export let isImage = file => file.endsWith('.jpg') || file.endsWith('.png');
export let isVideo = file => file.endsWith('.mp4') || file.endsWith('.MOV');

function fileTraverser(folder = '..', callback, filter = isImage) {
    return new Promise((resolve, reject) => {
        let lines = [];

        fs.readdir(folder, function (err, files) {
            if (err) {
                reject('Unable to scan directory: ' + err);
            }
            let reversed = files.reverse();

            reversed.forEach(function (file) {
                if (filter(file)) {
                    lines.push(callback(file));
                }
            });
            resolve(lines);
        });
    });
}

export default fileTraverser;
