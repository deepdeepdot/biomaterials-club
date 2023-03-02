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
    'https://files.slack.com/files-tmb/T9NK8472R-F04R2H21UNS-c966afd7ce/img_0909_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04RYRKHV9N-a5a5660af0/img_0919_720.jpg',
    'https://files.slack.com/files-tmb/T9NK8472R-F04RPB67C5B-dce23a90e5/img_5437_720.png',
    'https://files.slack.com/files-tmb/T9NK8472R-F04RPB6QMB7-9c28046cdc/img_5438_720.png',
    'https://files.slack.com/files-tmb/T9NK8472R-F04RS9B3XL2-1423e329ff/img_5439_720.png',
    'https://files.slack.com/files-tmb/T9NK8472R-F04SG033ZDW-641c7aae88/img_5440_720.png',
    'https://files.slack.com/files-tmb/T9NK8472R-F04RKLZM8NA-8cf73caeb4/img_5441_720.png',
    'https://files.slack.com/files-tmb/T9NK8472R-F04S4U3QQ8H-cce1aa586c/img_5442_720.png',
    'https://files.slack.com/files-tmb/T9NK8472R-F04S4U45001-107f45e729/img_5443_720.png',
    'https://files.slack.com/files-tmb/T9NK8472R-F04S4U4J46M-bded3e8149/img_5445_720.png',
    'https://files.slack.com/files-tmb/T9NK8472R-F04RKM14WK0-a49d5cf5c4/img_5446_720.png',
    'https://files.slack.com/files-tmb/T9NK8472R-F04RBP46VUP-8c989a3e48/img_5448_720.png',
    'https://files.slack.com/files-tmb/T9NK8472R-F04S4UC39S5-1a6fdcfd9c/img_5338_2_720.png',
    'https://files.slack.com/files-tmb/T9NK8472R-F04RS9LT7CJ-098b8f5c47/img_5339_2_720.png',
    'https://files.slack.com/files-tmb/T9NK8472R-F04RKM9243G-16ff1f3fba/img_5341_2_720.png',
    'https://files.slack.com/files-tmb/T9NK8472R-F04S4UD4BUZ-7f1257ba68/img_5343_2_720.png',
    'https://files.slack.com/files-tmb/T9NK8472R-F04S4UDCQRF-71e6196c7e/img_5344_2_720.png',
    'https://files.slack.com/files-tmb/T9NK8472R-F04RUPDKN68-5529a69e38/img_5346_2_720.png',
    'https://files.slack.com/files-tmb/T9NK8472R-F04RS9NBM0A-bd70e4b1e2/img_5350_2_720.png',
    'https://files.slack.com/files-tmb/T9NK8472R-F04RPBJPL13-ee52b8afbc/img_5355_2_720.png',
    'https://files.slack.com/files-tmb/T9NK8472R-F04RPBK1W2H-e8c54bebcd/img_5358_2_720.png',
    'https://files.slack.com/files-tmb/T9NK8472R-F04S4UES3SM-70100e83dd/img_5360_2_720.png',
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
