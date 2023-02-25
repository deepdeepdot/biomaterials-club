// @ts-check

let fs = require('fs');

let errLogCallback = (err) => {
  if (err) {
    console.log(err);
    return;
  }
};

function getFilenameFromUrl(url) {
  let idx = url.lastIndexOf('/');
  let filename = url.substring(idx + 1);
  return filename;
}

let getFilenames = (urls) => urls.map(getFilenameFromUrl);

let getPrefix = (file) => file.substring(0, 7);

function getPrefixes(filenames) {
  let prefixes = filenames.map(getPrefix);
  let set = new Set(prefixes);
  return set;
}

function getSuffix(file) {
  let idx = file.lastIndexOf('.');
  let suffix = file.substr(idx + 1);
  return suffix;
}

function getPrefixMapping(filenames) {
  let today = new Date().toISOString().substr(0, 10).replaceAll('-', '');

  let mapping = {};
  let prefixes = getPrefixes(filenames);
  prefixes.forEach((prefix) => (mapping[prefix] = today));

  return mapping;
}

let mappedNames = new Map();

function getDateName(file, counterMap, prefixMapping) {
  if (mappedNames.has(file)) {
    return mappedNames.get(file);
  }
  let prefix = getPrefix(file);
  let date = prefixMapping[prefix];
  let count = 1 + counterMap.get(date);
  let suffix = getSuffix(file);

  counterMap.set(date, count);

  count = count < 10 ? `0${count}` : count; // Pad 2 digits
  let dateName = `${date}_${count}.${suffix}`;
  mappedNames.set(file, dateName);
  return dateName;
}

function getDateCounterMap(prefixMapping) {
  let counterMap = new Map();
  for (let k in prefixMapping) {
    let v = prefixMapping[k];
    counterMap.set(v, 0);
  }
  return counterMap;
}

function getDateNames(filenames, prefixMapping) {
  let counterMap = getDateCounterMap(prefixMapping);
  let mapping = {};
  filenames.forEach(
    (file) => (mapping[file] = getDateName(file, counterMap, prefixMapping))
  );
  return mapping;
}

function renameFiles(urls, prefixMapping, folder = './download_slack') {
  let filenames = getFilenames(urls);
  let nameMapping = getDateNames(filenames, prefixMapping);

  let renameFile = (file) => {
    let newFilename = nameMapping[file];
    let source = folder ? `${folder}/${file}` : file;
    let destination = folder ? `${folder}/${newFilename}` : newFilename;

    console.log(`Renaming ${source} to ${destination}`);
    fs.rename(source, destination, errLogCallback);
  };
  filenames.forEach(renameFile);
}

/*
  let imageUrls = [
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

let filenames = getFilenames(imageUrls);
let prefixMapping = getPrefixMapping(filenames);

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


let prefixMapping =
{
  img_956: '20230222',
  img_957: '20230222',
  img_958: '20230222',
  img_070: '20230222',
  img_068: '20230222',
  img_067: '20230222',
  img_076: '20230222',
  img_127: '20230223',
  img_128: '20230223'
}

renameFiles(imageUrls, prefixMapping);

*/

module.exports = {
  getFilenameFromUrl,
  getFilenames,
  getPrefix,
  getPrefixes,
  getSuffix,
  getPrefixMapping,
  getDateName,
  getDateCounterMap,
  getDateNames,
  renameFiles,
};
