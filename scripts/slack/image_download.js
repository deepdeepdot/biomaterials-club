let axios = require('axios');
let fs = require('fs');

async function download(url, path, headers) {
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

let headers = {};
const url = 'https://unsplash.com/photos/AaEQmoufHLk/download?force=true';
download(url, 'code.jpg', headers);
