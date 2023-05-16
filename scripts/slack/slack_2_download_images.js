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
  ];

  imageUrls = [
    "https://files.slack.com/files-tmb/T9NK8472R-F04UY4YLP1S-ba0353a39a/img_4676_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04UY4YLQ76-ccefba9b4a/img_4678_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F0505BE30GY-5c0cd061df/img_4680_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04UF4WGMKR-e5d6d7c641/img_4681_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04USUW5J21-b125f7b3f8/img_1384_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04UYBMT092-2b731444bc/img_1385_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04UVTG3JD8-c0e2a92017/img_1389_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04UFBLFEHM-aba6eefdc7/img_1394_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04V8G90YUR-4828b248a6/img_1396_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04V8G910G1-cbebeeddc7/img_1397_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04UFBLFPU7-5a6230aa8d/img_1402_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04UYBQ4E8L-08753cd63b/img_1400_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04V8G91BJ5-06a3b8d393/img_1399_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04UP9HEEK0-7e61ff482e/img_1398_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F0505J5GG2U-f2e1a13413/img_1406_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04UP9HEL3G-ec7e839a36/img_1408_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04UFHVKHGX-b07f1f33c7/img_2114_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04V8NJ5401-52ced8f4bb/img_2107_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04UPFSJ7AS-0775f4d3f3/img_2093_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04UW0E510T-62108bee15/img_2091_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F04UFHVKUSK-968004147e/img_2083_720.jpg"
  ];

  imageUrls = [
    "https://files.slack.com/files-tmb/T9NK8472R-F0506H0G6BX-72f95ab4fa/img_1443_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F050Z6E0JGG-d69d6bb2b9/img_1444_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F05039HCNR5-23d91b3fa4/img_1484_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F050B7EFSTG-b2cd91770d/img_1482_720.jpg",
    "https://files.slack.com/files-tmb/T9NK8472R-F050X4G2M1P-b8b4c818fa/img_1487_720.jpg"
 ];

 imageUrls = [
  "https://files.slack.com/files-tmb/T9NK8472R-F04TPMYBFJ9-193f64d748/img_1368_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04TC4HRHQF-216c8708e0/img_1369_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04U5950GJV-e898ceeab6/img_1370_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04TSL9J482-0748b6d9b4/img_1371_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04TSGFBXLK-653e110f19/img_1372_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04TV4ERRHS-5a44211697/img_1373_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04TVDJ89NY-620d3b8275/img_1848_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04UY4YLP1S-ba0353a39a/img_4676_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04UY4YLQ76-ccefba9b4a/img_4678_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F0505BE30GY-5c0cd061df/img_4680_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04UF4WGMKR-e5d6d7c641/img_4681_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04USUW5J21-b125f7b3f8/img_1384_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04UYBMT092-2b731444bc/img_1385_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04UVTG3JD8-c0e2a92017/img_1389_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04UFBLFEHM-aba6eefdc7/img_1394_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04V8G90YUR-4828b248a6/img_1396_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04V8G910G1-cbebeeddc7/img_1397_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04UFBLFPU7-5a6230aa8d/img_1402_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04UYBQ4E8L-08753cd63b/img_1400_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04V8G91BJ5-06a3b8d393/img_1399_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04UP9HEEK0-7e61ff482e/img_1398_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F0505J5GG2U-f2e1a13413/img_1406_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04UP9HEL3G-ec7e839a36/img_1408_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04UFHVKHGX-b07f1f33c7/img_2114_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04V8NJ5401-52ced8f4bb/img_2107_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04UPFSJ7AS-0775f4d3f3/img_2093_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04UW0E510T-62108bee15/img_2091_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F04UFHVKUSK-968004147e/img_2083_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F0506H0G6BX-72f95ab4fa/img_1443_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F050Z6E0JGG-d69d6bb2b9/img_1444_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F05039HCNR5-23d91b3fa4/img_1484_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F050B7EFSTG-b2cd91770d/img_1482_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F050X4G2M1P-b8b4c818fa/img_1487_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F051EAUEDEG-b2add4a169/img_2832_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F051E7A77TL-6e249cf49c/pxl_20230402_163435981_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F05203Z6J0H-6219aeab2f/img_1529_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052B5X7248-1b78c2eb8b/img_1537_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F0516USLZEK-480bfc2bff/img_1530_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F051MF761QA-e352cda7b5/img_1531_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F051MBC7SAF-45c7846712/img_1532_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F051MF770M8-e152f4ef33/img_1533_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F051ESS2GAJ-413898921a/img_1541_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F051MF7SVNE-3836efe60c/img_1540_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F0516UTD7NK-defdf64009/img_1539_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F051MBCUYHH-48b93a0ac9/img_1538_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F051ESS3W6S-9e6c9066af/img_1537_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F051JGN82QM-75a9bc4f4b/img_1536_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F051ESS5LES-d8cc6f3379/img_1535_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F0520402849-e9518aca73/img_1534_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F051FGVANBG-279caba650/img_3074_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F051N5B5N3C-15ae930931/img_3055_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F051N5B5YP4-5ba0467c07/img_3042_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F0520RH9EGZ-0766664571/img_0720_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F051WKN5P5J-52d489986b/img_3159_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F051YHKA0MV-921cae0759/img_1566_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F0523PQE2GP-a6a4e6b988/img_1152_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052BMSHC78-ba24f430c0/img_1150_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052DFY1370-f47a27f329/img_1203_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052L49F6NN-6cf0183b43/img_1206_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052M09EAHY-87604eac0a/img_3368_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052EBY26QN-40f4031a99/img_3356_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052M09F8NN-86ce30ae57/img_3350_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052PE75P1S-2d8ce466b3/img_3345_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052LRZ0XQB-ffd1e60fa9/img_3343_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052J1UN12R-6c34970086/img_3336_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052A0TVBPZ-5d438ffc5b/img_2215_720.jpg",

  
  "https://files.slack.com/files-tmb/T9NK8472R-F054BVCEP53-b54fa32408/image_from_ios_720.png",
  "https://files.slack.com/files-tmb/T9NK8472R-F0550TP2001-5c72c12950/img_2270_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F054N5FSE6P-24411ca060/img_2245_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F0547NPBX2B-5ea837dd3c/img_2232_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F055C045C80-2c3b1aa056/img_2216_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F054KAZ9M8D-307a9932b5/img_2211_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F054NP8RZ2N-b8b62c5315/img_6731_720.png",
  "https://files.slack.com/files-tmb/T9NK8472R-F054G13KF55-096e8eec01/img_6757_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F055ER92MLN-11f6c4b4f0/img_2219_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F055BA3J5KR-54142cf8a0/img_0554_720.jpg"
];

imageUrls = [
  "https://files.slack.com/files-tmb/T9NK8472R-F0520RH9EGZ-0766664571/img_0720_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F051WKN5P5J-52d489986b/img_3159_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F051YHKA0MV-921cae0759/img_1566_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F0523PQE2GP-a6a4e6b988/img_1152_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052BMSHC78-ba24f430c0/img_1150_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052DFY1370-f47a27f329/img_1203_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052L49F6NN-6cf0183b43/img_1206_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052M09EAHY-87604eac0a/img_3368_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052EBY26QN-40f4031a99/img_3356_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052M09F8NN-86ce30ae57/img_3350_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052PE75P1S-2d8ce466b3/img_3345_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052LRZ0XQB-ffd1e60fa9/img_3343_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052J1UN12R-6c34970086/img_3336_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F052A0TVBPZ-5d438ffc5b/img_2215_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F054BVCEP53-b54fa32408/image_from_ios_720.png",
  "https://files.slack.com/files-tmb/T9NK8472R-F0550TP2001-5c72c12950/img_2270_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F054N5FSE6P-24411ca060/img_2245_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F0547NPBX2B-5ea837dd3c/img_2232_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F055C045C80-2c3b1aa056/img_2216_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F054KAZ9M8D-307a9932b5/img_2211_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F054NP8RZ2N-b8b62c5315/img_6731_720.png",
  "https://files.slack.com/files-tmb/T9NK8472R-F054G13KF55-096e8eec01/img_6757_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F055ER92MLN-11f6c4b4f0/img_2219_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F055BA3J5KR-54142cf8a0/img_0554_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F055KG6K32A-72927c2eac/img_9785_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F055UJXDQVA-c67ed10c51/img_9784_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F055KG6KTP0-6b19899be1/img_9783_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F056FR2KHAL-13de05a000/img_9782_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F055S4SG8H0-cfb8b1c72e/img_9781_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F0564Q086KT-664718b58d/img_2217_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F055UKS0FGU-3a19c91d20/img_2188_720.jpg"
];
// [Error: ENOENT: no such file or directory, rename './download_slack/img_1537_720.jpg' -> './download_slack/20230403_02.jpg'] {

imageUrls = [
  "https://files.slack.com/files-tmb/T9NK8472R-F054NP8RZ2N-b8b62c5315/img_6731_720.png",
  "https://files.slack.com/files-tmb/T9NK8472R-F054G13KF55-096e8eec01/img_6757_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F055ER92MLN-11f6c4b4f0/img_2219_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F055BA3J5KR-54142cf8a0/img_0554_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F055KG6K32A-72927c2eac/img_9785_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F055UJXDQVA-c67ed10c51/img_9784_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F055KG6KTP0-6b19899be1/img_9783_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F056FR2KHAL-13de05a000/img_9782_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F055S4SG8H0-cfb8b1c72e/img_9781_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F0564Q086KT-664718b58d/img_2217_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F055UKS0FGU-3a19c91d20/img_2188_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F0565SXBDHV-80b8aa02d0/img_5326_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F056HF21GH3-52eb5b3c63/img_5325_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F0565SZ0JBZ-ac0afbd5eb/img_5327_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F057AMDSX8Q-18f8b98472/img_5378_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F056ECJ0A94-b3664b7337/img_5304_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F056R7U64J1-265459a7be/img_5459_720.jpg",
  // "https://files.slack.com/files-tmb/T9NK8472R-F0579V…cc9f/709c8417-a0ba-4bfc-8e87-d5e34e473ae0_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F056XGV2A0M-acbe50e66c/img_5440_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F0570BDB45R-5220496ce6/img_5219_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F0577V0S9V4-501bab8f4e/img_5872_720.jpg",
  "https://files.slack.com/files-tmb/T9NK8472R-F05848JFHJ4-9666e98fb0/img_5782_720.jpg"
];

> [Error: ENOENT: no such file or directory, rename './download_slack/img_6731_720.png' -> './download_slack/20230424_04.png'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'rename',
  path: './download_slack/img_6731_720.png',
  dest: './download_slack/20230424_04.png'
}
[Error: ENOENT: no such file or directory, rename './download_slack/img_6757_720.jpg' -> './download_slack/20230425_01.jpg'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'rename',
  path: './download_slack/img_6757_720.jpg',
  dest: './download_slack/20230425_01.jpg'
}
[Error: ENOENT: no such file or directory, rename './download_slack/img_2219_720.jpg' -> './download_slack/20230411_10.jpg'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'rename',
  path: './download_slack/img_2219_720.jpg',
  dest: './download_slack/20230411_10.jpg'
}
[Error: ENOENT: no such file or directory, rename './download_slack/img_0554_720.jpg' -> './download_slack/20230501_01.jpg'] {
  errno: -2,
  code: 'ENOENT',
  syscall: 'rename',
  path: './download_slack/img_0554_720.jpg',
  dest: './download_slack/20230501_01.jpg'
}

 // https://jsonformatter.curiousconcept.com/#

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
