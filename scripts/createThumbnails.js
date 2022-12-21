// @ts-check
import sharp from 'sharp';
import imageTraverser from './utils/imageTraverser.js';

const IMAGE_WIDTH = 220;

let processFile = function(file) {
    let outfile = `images/th/${file}`;

    sharp(`images/${file}`)
    .resize(IMAGE_WIDTH)
    .toFile(outfile, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    });
}

imageTraverser('./images', processFile)
