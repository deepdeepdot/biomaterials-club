// @ts-check
import fs from 'fs';

export let isImage = (file) => file.endsWith('.jpg') || file.endsWith('.png');
export let isVideo = (file) => file.endsWith('.mp4') || file.endsWith('.MOV');

function imageTraverser(folder = '..', callback, filter = isImage) {
  return new Promise((resolve, reject) => {
    fs.readdir(folder, function (err, files) {
      if (err) {
        reject('Unable to scan directory: ' + err);
      }
      let reversed = files.reverse();

      let lines = [];
      reversed.forEach(function (file) {
        if (filter(file)) {
          lines.push(callback(file));
        }
      });
      resolve(lines);
    });
  });
}

export default imageTraverser;
