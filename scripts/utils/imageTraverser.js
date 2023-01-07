// @ts-check
import fs from 'fs';

export const isImage = (file) => file.endsWith('.jpg') || file.endsWith('.png');
export const isVideo = (file) => file.endsWith('.mp4') || file.endsWith('.MOV');

function imageTraverser(folder, callback, filter = isImage) {
  return new Promise((resolve, reject) => {
    function fileScanner(err, files) {
      if (err) {
        reject(new Error(`Unable to scan directory:${err}`));
      }
      let reversed = files.reverse();
      let lines = [];

      let lineCollector = (file) => {
        if (filter(file)) {
          lines.push(callback(file));
        }
      }
      reversed.forEach(lineCollector);
      resolve(lines);
    }
    fs.readdir(folder, fileScanner);
  });
}

export default imageTraverser;
