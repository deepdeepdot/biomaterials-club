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
    fs.mkdirSync(folder, { recursive: true });
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

  [
    "https://files.slack.com/files-tmb/T9NK8472R-F04R5N8N10U-99a5773d9a/img_1279_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04R5N8N0UC-adea07f369/img_1280_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04R34WP4MR-1cd6673e6a/img_1281_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RFT9109X-df4e9ce70d/img_1282_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04QNN83RLP-ccd5a3c46f/img_1283_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04R38HDXPU-749314ba0c/img_1284_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04QNNA8TCP-98c9eebf9e/img_1285_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04R0AFK50D-70e0e19b62/img_1286_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04QNNA99RD-1df862ce5b/img_1287_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04R38KKCF4-3333fec178/img_1288_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04R2H21UNS-c966afd7ce/img_0909_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RYRKHV9N-a5a5660af0/img_0919_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RPB67C5B-dce23a90e5/img_5437_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RPB6QMB7-9c28046cdc/img_5438_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RS9B3XL2-1423e329ff/img_5439_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04SG033ZDW-641c7aae88/img_5440_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RKLZM8NA-8cf73caeb4/img_5441_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04S4U3QQ8H-cce1aa586c/img_5442_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04S4U45001-107f45e729/img_5443_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04S4U4J46M-bded3e8149/img_5445_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RKM14WK0-a49d5cf5c4/img_5446_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RBP46VUP-8c989a3e48/img_5448_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04S4UC39S5-1a6fdcfd9c/img_5338_2_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RS9LT7CJ-098b8f5c47/img_5339_2_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RKM9243G-16ff1f3fba/img_5341_2_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04S4UD4BUZ-7f1257ba68/img_5343_2_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04S4UDCQRF-71e6196c7e/img_5344_2_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RUPDKN68-5529a69e38/img_5346_2_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RS9NBM0A-bd70e4b1e2/img_5350_2_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RPBJPL13-ee52b8afbc/img_5355_2_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RPBK1W2H-e8c54bebcd/img_5358_2_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04S4UES3SM-70100e83dd/img_5360_2_720.png",
    "https://files.slack.com/files-tmb/T9NK8472R-F04S3ANJ7BP-2a71c9cff2/img_9837_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04SJTDTTDX-474c29e1f4/img_9836_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RRNJSQBZ-eb83cae6bd/img_9835_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04T20PNG80-0bcd7580d1/img_2568_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04SCA09M1Q-1a87063ee1/img_2566_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04SQUL7DED-afaaf51eee/img_2565_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04SCA09M5G-e5163f8a2f/img_2563_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04SQUL7SF3-a2a4576cb3/img_2561_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RXPR521M-69fdb15518/img_2560_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04T20PP6G0-b90b2e4a27/img_2559_720.jpg"
  ]

  imageUrls = [
    "https://files.slack.com/files-tmb/T9NK8472R-F04S3ANJ7BP-2a71c9cff2/img_9837_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04SJTDTTDX-474c29e1f4/img_9836_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RRNJSQBZ-eb83cae6bd/img_9835_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04T20PNG80-0bcd7580d1/img_2568_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04SCA09M1Q-1a87063ee1/img_2566_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04SQUL7DED-afaaf51eee/img_2565_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04SCA09M5G-e5163f8a2f/img_2563_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04SQUL7SF3-a2a4576cb3/img_2561_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04RXPR521M-69fdb15518/img_2560_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04T20PP6G0-b90b2e4a27/img_2559_720.jpg"
  ];

  imageUrls = [
    "https://files.slack.com/files-tmb/T9NK8472R-F04TCU4HATS-1c195e16c2/img_1323_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04SL9YD9CM-0618ad3d61/img_1324_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04SP83U7GS-ea9b1cedfa/img_1328_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04T1SPRRG9-f99dc0d76f/img_1325_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04TCU7D1H6-4cc921bed8/img_1333_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04SP86PUKU-788f3fa8e5/img_1330_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04T1SSMFCH-a601ea449f/img_1329_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04SLA19CKF-a9cf7a2526/img_1332_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04SP86QS82-b541e1b37f/img_1336_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04SP4EE83D-9cf7ec6040/img_1341_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04SPNHCTGA-03ec7bf9ea/img_1484_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04TPMYBFJ9-193f64d748/img_1368_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04TC4HRHQF-216c8708e0/img_1369_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04U5950GJV-e898ceeab6/img_1370_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04TSL9J482-0748b6d9b4/img_1371_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04TSGFBXLK-653e110f19/img_1372_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04TV4ERRHS-5a44211697/img_1373_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04TVDJ89NY-620d3b8275/img_1848_720.jpg"
  ]

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
