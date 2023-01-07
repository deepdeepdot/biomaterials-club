// @ts-check
import fs from 'fs';
import sharp from 'sharp';
import imageTraverser from './utils/imageTraverser';

const IMAGE_WIDTH = 220; // For thumbnails

const ROOT_FOLDER = './public/images';

let thumbnailsFolder = `${ROOT_FOLDER}/th`;
if (!fs.existsSync(thumbnailsFolder)) {
  fs.mkdirSync(thumbnailsFolder);
}

let processFile = function (file) {
  let outfile = `${ROOT_FOLDER}/th/${file}`;

  sharp(`${ROOT_FOLDER}/${file}`)
    .resize(IMAGE_WIDTH)
    .toFile(outfile, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
};

imageTraverser(`${ROOT_FOLDER}`, processFile);
