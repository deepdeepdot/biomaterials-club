// @ts-check

import fs from 'fs';
import sharp from 'sharp';
import imageTraverser from './utils/imageTraverser.js';

let path = './config/project.json';
let project = JSON.parse(fs.readFileSync(path, 'utf-8'));

const { thumbnailWidth, imageSourceFolder, thumbnailsFolder } =
  project['create_thumbnails'];

function resize(file, width) {
  let source = `${imageSourceFolder}/${file}`;
  let resizing = sharp(source).resize(width);
  return resizing;
}

function processFile(file) {
  let outfile = `${thumbnailsFolder}/${file}`;
  let resizing = resize(file, thumbnailWidth);

  return new Promise((resolve, reject) => {
    /* eslint-disable no-console */
    resizing.toFile(outfile, (err, info) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
    /* eslint-enable no-console */
  });
}

function createThumbnails() {
  if (!fs.existsSync(thumbnailsFolder)) {
    fs.mkdirSync(thumbnailsFolder);
  }
  imageTraverser(`${imageSourceFolder}`, processFile);
}

createThumbnails();
