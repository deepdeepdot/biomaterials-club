/* eslint import/extensions: ["off"] */

// @ts-check
import fs from 'fs';
import imageTraverser from './utils/imageTraverser.js';
import incrementVersion from './utils/version.js';

const HTML_FILE = 'public/index.html';

async function getImages() {
  let images = [];
  let getImageFileName = (file) => images.push(file);
  await imageTraverser('./public/images', getImageFileName);
  return images;
}

function getImageTags(images) {
  let getImageTag = (file) =>
    `        <img loading="lazy" src="images/th/${file}" />`;
  let lines = images.map(getImageTag);
  return lines.join('\n');
}

function getImagesAsJS(images) {
  let blanks = ' '.repeat(12);
  let imageNames = images.map((img) => `${blanks}'${img}',`);

  blanks = ' '.repeat(10);
  let imagesAsJS = `${blanks}window.images = [
${imageNames.join('\n')}
${blanks}];`;
  return imagesAsJS;
}

let readTextFile = (file) =>
  fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });

function getHtml(imageTags, imagesAsJS) {
  let version = incrementVersion();
  let template = readTextFile('./templates/index.tpl');
  /* eslint-disable no-template-curly-in-string */
  let html = template
    .replace('${imageTags}', imageTags)
    .replace('${imagesAsJS}', imagesAsJS)
    .replace('${version}', version);
  return html;
}

function getImageCode(images, splitNum) {
  let first = images.slice(0, splitNum);
  let rest = images.slice(splitNum);
  return {
    imageTags: getImageTags(first),
    imagesAsJS: getImagesAsJS(rest),
  };
}

async function createIndexHtml(splitNum) {
  let images = await getImages();
  let { imageTags, imagesAsJS } = getImageCode(images, splitNum);
  let html = getHtml(imageTags, imagesAsJS);
  fs.writeFileSync(HTML_FILE, html);
}

let splitNum = 50;
createIndexHtml(splitNum);
