// @ts-check
import fs from 'fs';
import sharp from 'sharp';
import imageTraverser from './utils/imageTraverser.js';
import project from '../config/project.json' assert { type: 'json' };

const { thumbnailWidth, imageSourceFolder, thumbnailsFolder } =
  project['create_thumbnails'];

if (!fs.existsSync(thumbnailsFolder)) {
  fs.mkdirSync(thumbnailsFolder);
}

let processFile = function (file) {
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
};

imageTraverser(`${imageSourceFolder}`, processFile);
