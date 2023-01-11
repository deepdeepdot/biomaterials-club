// @ts-check
import fs from 'fs';
import sharp from 'sharp';
import imageTraverser from './utils/imageTraverser.js';
import project from '../config/project.json' assert { type: 'json' };

const { thumbnailWidth, imageSourceFolder, thumbnailsFolder } =
  project['create_thumbnails'];

function processFile(file) {
  let outfile = `${thumbnailsFolder}/${file}`;

  sharp(`${imageSourceFolder}/${file}`)
    .resize(thumbnailWidth)
    .toFile(outfile, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
}

function createThumbnails() {
  if (!fs.existsSync(thumbnailsFolder)) {
    fs.mkdirSync(thumbnailsFolder);
  }
  imageTraverser(`${imageSourceFolder}`, processFile);
}

createThumbnails();
