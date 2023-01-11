// @ts-check
import fs from 'fs';
import imageTraverser from './utils/imageTraverser.js';
import incrementVersion from './utils/version.js';

const HTML_FILE = 'public/index.html';

function readTextFile(file) {
  return fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
}

async function getImageTags() {
  let getImageTag = (file) =>
    `        <img loading="lazy" src="images/th/${file}" />`;
  let lines = await imageTraverser('./public/images', getImageTag);
  return lines.join('\n');
}

function getHtml(imageTags) {
  let version = incrementVersion();
  let template = readTextFile('./templates/index.tpl');
  let html = template
    .replace('${images}', imageTags)
    .replace('${version}', version);
  return html;
}

async function createIndexHtml() {
  let imageTags = await getImageTags();
  let html = getHtml(imageTags);
  fs.writeFileSync(HTML_FILE, html);
}

createIndexHtml();
