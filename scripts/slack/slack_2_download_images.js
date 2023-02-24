// @ts-check

let axios = require('axios');
let fs = require('fs');
let getImageUrlsFromSlack = require('./slack_1_get_urls');

// Get headers from the curl config file
function getHeaders(curlConfig) {
  let lineToTuple = (line) => {
    if (!line) return null;

    let trimmedLine = line.trim();
    let len = trimmedLine.length;
    let tuple = trimmedLine.substring(10, len - 1); // Skip: "header = "
    let pair = tuple.split(':');
    return [pair[0].trim(), pair[1].trim()];
  };
  let tupleToJson = (accumulator, currentValue) => {
    if (!currentValue) return accumulator;
    let newState = {
      [currentValue[0]]: currentValue[1],
    };
    return { ...accumulator, ...newState };
  };
  let lines = curlConfig.split('\n');
  let tuples = lines.map(lineToTuple);
  let values = tuples.reduce(tupleToJson, {});
  return values;
}

function download(url, headers) {
  return axios({
    url,
    method: 'GET',
    headers,
    responseType: 'stream',
  });
}

async function downloadAndPipe(url, headers, writer) {
  let response = await download(url, headers);
  response.data.pipe(writer);
  return response;
}

function downloadAndWrite(url, headers, path) {
  let writer = fs.createWriteStream(path);
  downloadAndPipe(url, headers, writer);
  return writer;
}

function downloadAndHandleWrite(url, headers, path) {
  let writer = downloadAndWrite(url, headers, path);
  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

let getFilenameFromUrl = (url) => {
  let idx = url.lastIndexOf('/');
  let filename = url.substring(idx + 1);
  return filename;
};

function downloadImagesFromUrls(imageUrls, headers, folder) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  let downloadUrl = (url) => {
    let filename = getFilenameFromUrl(url);
    let path = `${folder}/${filename}`;

    return downloadAndHandleWrite(url, headers, path)
      .then(() => console.log(`Downloaded: ${filename}`))
      .catch((e) => console.log(`FAILED ${filename}: ${e}`));
  };
  return imageUrls.map(downloadUrl);
}

// Read curl config
// # curl --config slack-headers.config https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX6NM6-270049c8b4/img_1227_720.jpg --output img_1227_720.jpg

function downloadSlackImages(urls, folder) {
  let curlConfig = fs.readFileSync(
    './scripts/slack/slack-headers.config',
    'utf-8'
  );
  let headers = getHeaders(curlConfig);
  let downloadUrls = downloadImagesFromUrls(urls, headers, folder);
  let allDownloads = Promise.all(downloadUrls);
  return allDownloads;
}

function executeImageDownload() {
  // let imageUrls = getImageUrlsFromSlack();
  // imageUrls = imageUrls.slice(46); //  May need to slice and skip repetitions

  let imageUrls = [
    'https://files.slack.com/files-tmb/T9NK8472R-F04PLJENX89-8b98f6b195/img_9076_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04P8LD150W-724fdb5762/img_1224_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX693J-cb163f9a01/img_1225_720.jpg',
  ];

  imageUrls = [
    'https://files.slack.com/files-tmb/T9NK8472R-F04QU5JQVK4-2aebb8ef46/img_9566_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04R6QABEGH-eee1382a04/img_9572_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04RHRSUQE4-ca22e7370f/img_9575_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04QWKA4TJQ-5f897f0169/img_9578_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04R6QAH3MX-8565c738a6/img_9579_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04QMHCTD9U-ebd601f859/img_9582_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04QDS49K5M-defea5e1a8/img_0708_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04QDS49KB9-8f3a2cdce2/img_0702_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04QWS4RJH2-cf935bac4e/img_0688_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04QUCDKNJW-866cd37d51/img_0679_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04QMQ7FNKG-cac31c1ed6/img_0675_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04QPFXB362-baf58e6377/img_0766_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04R5N8N10U-99a5773d9a/img_1279_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04R5N8N0UC-adea07f369/img_1280_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04R34WP4MR-1cd6673e6a/img_1281_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04RFT9109X-df4e9ce70d/img_1282_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04QNN83RLP-ccd5a3c46f/img_1283_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04R38HDXPU-749314ba0c/img_1284_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04QNNA8TCP-98c9eebf9e/img_1285_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04R0AFK50D-70e0e19b62/img_1286_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04QNNA99RD-1df862ce5b/img_1287_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04R38KKCF4-3333fec178/img_1288_720.jpg',
  ];
  let folder = './download_slack';

  downloadSlackImages(imageUrls, folder)
    .then(() => {
      console.log('All downloads succeeded! :)');
    })
    .catch((e) => {
      console.log('Not all downloads worked :(');
    });
}

module.exports = {
  getHeaders,
  download,
  downloadAndPipe,
  downloadAndWrite,
  downloadAndHandleWrite,
  getFilenameFromUrl,
  downloadImagesFromUrls,
  downloadSlackImages,
  executeImageDownload,
};
