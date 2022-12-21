import fs from 'fs';
import imageTraverser from './utils/imageTraverser.js';

const HTML_FILE = 'public/index.html';

function getImageTag(file) {
    return `<img loading="lazy" src="images/th/${file}"/>`;
}

let lines = await imageTraverser('./public/images', getImageTag);
let imageTags = lines.join('\n');

let template = fs.readFileSync('./scripts/utils/index.tpl', {encoding:'utf8', flag:'r'});;
let html = template.replace('${images}', imageTags);

fs.writeFileSync(HTML_FILE, html);
