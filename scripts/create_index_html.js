// @ts-check
import fs from 'fs';
import imageTraverser from './utils/imageTraverser.js';
import incrementVersion from './utils/version.js';

const HTML_FILE = 'public/index.html';

function readTextFile(file) {
    return fs.readFileSync(file, {encoding:'utf8', flag:'r'});
}

function getImageTag(file) {
    return `<img loading="lazy" src="images/th/${file}"/>`;
}

let lines = await imageTraverser('./public/images', getImageTag);
let imageTags = lines.join('\n');
let version = incrementVersion();

let template = readTextFile('./scripts/utils/index.tpl');
let html = template
    .replace('${images}', imageTags)
    .replace('${version}', version);

fs.writeFileSync(HTML_FILE, html);
