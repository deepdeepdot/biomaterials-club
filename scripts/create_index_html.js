// @ts-check
import fs from 'fs';
import imageTraverser from './utils/imageTraverser.js';
import incrementVersion from './utils/version.js';

const HTML_FILE = 'public/index.html';

let readTextFile = (file) =>
  fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });

async function getImageTags() {
  let getImageTag = (file) =>
    `        <img loading="lazy" src="images/th/${file}" />`;
  let lines = await imageTraverser('./public/images', getImageTag);
  return lines.join('\n');
}

async function getJSForImages() {
  let images = [];
  let getImageFileName = (file) => {
    images.push(file);
  };
  await imageTraverser('./public/images', getImageFileName);
  let array = JSON.stringify(images);
  let code = `
<script>
  var images = ${array};
</script>
`;
  return code;
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
  // let imageTags = await getImageTags();
  let imageTags = await getJSForImages();
  let html = getHtml(imageTags);
  fs.writeFileSync(HTML_FILE, html);
}

createIndexHtml();
