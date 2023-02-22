// From: https://futurestud.io/tutorials/download-files-images-with-axios-in-node-js
import axios from 'axios';
import fs from 'fs';

async function download(url, path, headers = {}) {
  let writer = fs.createWriteStream(path);
  let response = await axios({
    url,
    method: 'GET',
    headers,
    responseType: 'stream',
  });
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

function test() {
  const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true';
  await download(url, 'code.jpg';
}

// test();
