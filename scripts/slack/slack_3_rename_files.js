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
    "https://files.slack.com/files-tmb/T9NK8472R-F04S4UES3SM-70100e83dd/img_5360_2_720.png"
  ]

let imageUrls = [
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

let prefixMapping =
{
  img_090: '20230228',
  img_091: '20230228',
  img_543: '20230228',
  img_544: '20230228',
  img_533: '20230228',
  img_534: '20230228',
  img_535: '20230228',
  img_536: '20230228'
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
