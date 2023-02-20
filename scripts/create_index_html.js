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
  let getImageTag = (file) => `        <img loading="lazy" src="images/th/${file}" />`;
  let lines = images.map(getImageTag);
  return lines.join('\n');
}

function getJSForImagesAndTime(images) {
  let blanks = ' '.repeat(12);
  let array = images.map((img) => `${blanks}'${img}',`);
  let code = `        <script type="module">
          import { setupDashboard } from './js/dashboard.mjs';
          var startTime = window.performance.now();
          window.images = [
${array.join('\n')}
          ];
          setupDashboard(startTime);
        </script>`;
  return code;
}

let readTextFile = (file) =>
  fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });

function getHtml(imageTags) {
  let version = incrementVersion();
  let template = readTextFile('./templates/index.tpl');
  let html = template
    .replace('${images}', imageTags)
    .replace('${version}', version);
  return html;
}

async function createIndexHtml(threshold = 50) {
  let images = await getImages();

  let first = images.slice(0, threshold);
  let rest = images.slice(threshold);

  let imageTags = getImageTags(first);
  let imagesAsJS = getJSForImagesAndTime(rest);

  let code = `${imageTags}\n${imagesAsJS}`;
  let html = getHtml(code);

  fs.writeFileSync(HTML_FILE, html);
}

createIndexHtml();
