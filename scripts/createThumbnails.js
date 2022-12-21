import sharp from 'sharp';
import fileTraverser from './utils/fileTraverser.js'

const processFile = function(file) {

    const outfile = `images/th/${file}`;

    sharp(`images/${file}`)
    .resize(220)
    .toFile(outfile, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })
}

fileTraverser('./images', processFile);

