// @ts-check

import fs from 'fs';
import sharp from 'sharp';
import imageTraverser from './utils/imageTraverser.js';
import project from '../config/project.json' assert { type: 'json' };

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
    resizing.toFile(outfile, (err, info) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
}

function createThumbnails() {
  if (!fs.existsSync(thumbnailsFolder)) {
    fs.mkdirSync(thumbnailsFolder);
  }
  imageTraverser(`${imageSourceFolder}`, processFile);
}

createThumbnails();
