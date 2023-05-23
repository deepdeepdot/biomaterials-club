// @ts-check
// https://app.slack.com/client/T9NK8472R/C03AG47UC84

function downloadLink(url) {
  // Creating new link node.
  let link = document.createElement('a');
  link.href = url;

  let filename = url.split('/').pop();
  link.setAttribute('target', '_blank');
  link.setAttribute('download', filename);

  document.body.appendChild(link);

  link.click();
  link.remove();
}

let thumbnails = document.querySelectorAll(
  'img[data-qa="file_image_thumbnail_img"]'
);

console.log(thumbnails.length);

downloadLink(thumbnails[0].src);
downloadLink(thumbnails[1].src);
downloadLink(thumbnails[2].src);

let imageUrls = [];
thumbnails.forEach((thumbnail) => {
  let src = thumbnail.src;
  imageUrls.push(src);
});
console.log(imageUrls);

let str = JSON.stringify(imageUrls);

imageUrls = imageUrls.slice(46);

// Copy paste to Node terminal to download the images onto some folder

console.log(imageUrls.length);
console.log(imageUrls);

let axios = require('axios');
let fs = require('fs');

function getHeaders(curlConfig) {
  let lines = curlConfig.split('\n');
  let tuples = lines.map((line) => {
    let len = line.length;
    let tuple = line.substring(10, len - 1);
    let pair = tuple.split(':');
    return [pair[0].trim(), pair[1].trim()];
  });
  let values = tuples.reduce((accumulator, currentValue) => {
    if (!currentValue) return accumulator;
    let newState = {
      [currentValue[0]]: currentValue[1],
    };
    return { ...accumulator, ...newState };
  }, {});
  return values;
}

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

let urls = [
  'https://files.slack.com/files-tmb/T9NK8472R-F04PLJENX89-8b98f6b195/img_9076_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04P8LD150W-724fdb5762/img_1224_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX693J-cb163f9a01/img_1225_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04PTTFP4AD-f211b715be/img_1226_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX6NM6-270049c8b4/img_1227_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04PTTFPK7T-ea90f10de3/img_1228_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04PF5862MR-f6dd9aa816/img_1231_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04PHNJSCLC-6a8be01a9a/img_1233_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04PCAGV5K7-60605aba07/img_1235_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UXAM6C-87a71f4dc0/img_1237_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04PTTFTDU1-96cdee3d12/img_1238_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04PF82FE0K-2da9724ffb/img_9307_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04PFBJCRS6-e3d6bdebbe/img_9298_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04Q52BH7AL-d6b690899e/img_9299_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04PU0W4NPK-4363004a20/img_9321_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04Q52BHQDN-b43ce68bc6/img_9301_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04PW70R2BZ-541081442c/20230219_144052_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QD715AKW-33e8986516/20230219_144457_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QFH36FH8-f3d9a2078e/img_2165_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04R58576QG-9fbdb900de/img_2167_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QDKQ3MDK-dcec7654f2/img_1264_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04Q224Q57Z-040573ce88/img_1265_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04R68SE9DE-a89e71f6c6/img_1267_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QGEEDPBM-d0428313de/img_1268_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QDKQ4KM3-ebe2919fcf/img_1270_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QK255HGU-20dd0ca956/img_1271_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04R68SGG2C-784624395a/img_1272_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QDKR42MT-94cb50de14/img_1275_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QV76K141-7a227fca24/img_1276_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04R68TEGSU-1f82d81414/img_1277_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QGEFDZQT-b4cdaccfa5/img_1266_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QDKK36BF-3068e246f6/img_1264_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QV70J3UZ-6efb9a45be/img_1265_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04Q21ZPT71-718a0d5055/img_1272_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QA02QTC6-924a6acf5a/img_1268_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04Q21ZQ4FR-fc1983c972/img_1270_720.jpg',
  'https://files.slack.com/files-tmb/T9NK8472R-F04QDKK3VQD-7cebc0b8ae/img_1273_720.jpg',
];

// let urls =
//   [
//     'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX6NM6-270049c8b4/img_1227_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04PTTFPK7T-ea90f10de3/img_1228_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04PF5862MR-f6dd9aa816/img_1231_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04PHNJSCLC-6a8be01a9a/img_1233_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04PCAGV5K7-60605aba07/img_1235_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04Q4UXAM6C-87a71f4dc0/img_1237_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04PTTFTDU1-96cdee3d12/img_1238_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04PF82FE0K-2da9724ffb/img_9307_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04PFBJCRS6-e3d6bdebbe/img_9298_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04Q52BH7AL-d6b690899e/img_9299_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04PU0W4NPK-4363004a20/img_9321_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04Q52BHQDN-b43ce68bc6/img_9301_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04PW70R2BZ-541081442c/20230219_144052_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04QD715AKW-33e8986516/20230219_144457_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04QFH36FH8-f3d9a2078e/img_2165_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04R58576QG-9fbdb900de/img_2167_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04QDKQ3MDK-dcec7654f2/img_1264_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04Q224Q57Z-040573ce88/img_1265_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04R68SE9DE-a89e71f6c6/img_1267_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04QGEEDPBM-d0428313de/img_1268_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04QDKQ4KM3-ebe2919fcf/img_1270_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04QK255HGU-20dd0ca956/img_1271_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04R68SGG2C-784624395a/img_1272_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04QDKR42MT-94cb50de14/img_1275_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04QV76K141-7a227fca24/img_1276_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04R68TEGSU-1f82d81414/img_1277_720.jpg',
//     'https://files.slack.com/files-tmb/T9NK8472R-F04QGEFDZQT-b4cdaccfa5/img_1266_720.jpg'
//   ];

let getFilenameFromUrl = (url) => {
  let idx = url.lastIndexOf('/');
  let filename = url.substring(idx + 1);
  return filename;
};

function downloadSlackImages(
  imageUrls,
  folder = './download_slack',
  headers = {}
) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  // Bunch of promises! We can do something here
  imageUrls.forEach((url) => {
    let filename = getFilenameFromUrl(url);
    download(url, `${folder}/${filename}`, headers)
      .then(() => console.log(`Downloaded: ${filename}`))
      .catch((e) => console.log(`FAILED ${filename}: ${e}`));
  });
}

// Read curl config
// # curl --config slack-headers.config https://files.slack.com/files-tmb/T9NK8472R-F04Q4UX6NM6-270049c8b4/img_1227_720.jpg --output img_1227_720.jpg

function downloadImages(urls) {
  let curlConfig = fs.readFileSync(
    './scripts/slack/slack-headers.config',
    'utf-8'
  );
  let headers = getHeaders(curlConfig);
  downloadSlackImages(urls, './download_slack', headers);
}

downloadImages(urls);

// Group by prefix: img_23X, sometimes two adjacent groups might be the same

let getFilenames = (urls) => urls.map(getFilenameFromUrl);

let getPrefix = (file) => file.substring(0, 7);

let getSuffix = (file) => {
  let idx = file.lastIndexOf('.');
  let suffix = file.substr(idx + 1);
  return suffix;
};

function getPrefixes(urls) {
  let filenames = getFilenames(urls);
  let prefixes = filenames.map(getPrefix);

  let set = new Set();
  prefixes.forEach((prefix) => set.add(prefix));
  return set;
}

function getPrefixMapping(urls) {
  let today = new Date().toISOString().substr(0, 10).replaceAll('-', '');

  let mapping = {};
  let prefixes = getPrefixes(urls);
  prefixes.forEach((prefix) => (mapping[prefix] = today));

  return mapping;
}

let map = getPrefixMapping(urls);

// Manually mapping each category :)

let prefixMapping = {
  2023021: '20230219',
  img_907: '20230212',
  img_122: '20230213',
  img_123: '20230213',
  img_930: '20230213',
  img_929: '20230213',
  img_932: '20230213',
  img_216: '20230220',
  img_126: '20230220',
  img_127: '20230220',
};

function getNewName(file, counterMap) {
  let prefix = getPrefix(file);
  let date = prefixMapping[prefix];
  let count = counterMap.get(date) + 1;
  let suffix = getSuffix(file);

  counterMap.set(date, count);

  return `${date}_${count}.${suffix}`;
}

function getNewNames(filenames, prefixMapping) {
  let counterMap = new Map();
  for (let k in prefixMapping) {
    let v = prefixMapping[k];
    counterMap.set(v, 0);
  }
  let mapping = {};
  filenames.forEach((file) => (mapping[file] = getNewName(file, counterMap)));
  return mapping;
}

let fs = require('fs');

function renameFiles(urls, folder = './download_slack') {
  let filenames = getFilenames(urls);
  let nameMapping = getNewNames(filenames, prefixMapping);
  // console.log(nameMapping);

  filenames.forEach((file) => {
    let newFilename = nameMapping[file];
    let source = `${folder}/${file}`;
    let destination = `${folder}/${newFilename}`;

    console.log(`Renaming ${source} to ${destination}`);
    fs.rename(source, destination, (err) => {
      console.log(err);
    });
  });
}

renameFiles(urls);
