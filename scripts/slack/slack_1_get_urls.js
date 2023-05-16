// @ts-check

let getImageUrlsFromThumbnails = function(thumbnails) {
  let imageUrls = [];
  thumbnails?.forEach((thumbnail) => {
    let src = thumbnail.src;
    imageUrls.push(src);
  });
  return imageUrls;
}

let getThumbnails = () =>
  document.querySelectorAll('img[data-qa="file_image_thumbnail_img"]');

let getImageUrlsFromSlack = function() {
  let thumbnails = getThumbnails();
  let imageUrls = getImageUrlsFromThumbnails(thumbnails);
  // imageUrls = imageUrls.slice(46); //  May need to slice and skip repetitions
  console.log(imageUrls);
  return imageUrls;
}

// 21 count: 69 - 21 = 48

let imageUrls = getImageUrlsFromSlack();
imageUrls = imageUrls.slice(48);

['https://files.slack.com/files-tmb/T9NK8472R-F04UFBLFEHM-aba6eefdc7/img_1394_720.jpg', 'https://files.slack.com/files-tmb/T9NK8472R-F04V8G90YUR-4828b248a6/img_1396_720.jpg', 'https://files.slack.com/files-tmb/T9NK8472R-F04V8G910G1-cbebeeddc7/img_1397_720.jpg', 'https://files.slack.com/files-tmb/T9NK8472R-F04UFBLFPU7-5a6230aa8d/img_1402_720.jpg', 'https://files.slack.com/files-tmb/T9NK8472R-F04UYBQ4E8L-08753cd63b/img_1400_720.jpg', 'https://files.slack.com/files-tmb/T9NK8472R-F04V8G91BJ5-06a3b8d393/img_1399_720.jpg', 'https://files.slack.com/files-tmb/T9NK8472R-F04UP9HEEK0-7e61ff482e/img_1398_720.jpg', 'https://files.slack.com/files-tmb/T9NK8472R-F0505J5GG2U-f2e1a13413/img_1406_720.jpg', 'https://files.slack.com/files-tmb/T9NK8472R-F04UP9HEL3G-ec7e839a36/img_1408_720.jpg', 'https://files.slack.com/files-tmb/T9NK8472R-F04UFHVKHGX-b07f1f33c7/img_2114_720.jpg', 'https://files.slack.com/files-tmb/T9NK8472R-F04V8NJ5401-52ced8f4bb/img_2107_720.jpg', 'https://files.slack.com/files-tmb/T9NK8472R-F04UPFSJ7AS-0775f4d3f3/img_2093_720.jpg', 'https://files.slack.com/files-tmb/T9NK8472R-F04UW0E510T-62108bee15/img_2091_720.jpg', 'https://files.slack.com/files-tmb/T9NK8472R-F04UFHVKUSK-968004147e/img_2083_720.jpg']

https://www.freeformatter.com/json-formatter.html#before-output

imageUrls =
[
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
]
/*
// Open Slack on a browser
// Visit genspace's biomaterials channel
// Open dev console and copy paste: getImageUrlsFromThumbnails(), getThumbnails()

let imageUrls = getImageUrlsFromSlack();

// Example
var imageUrls =
[
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
  'https://files.slack.com/files-tmb/T9NK8472R-F04S4UES3SM-70100e83dd/img_5360_2_720.png'
]

*/

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
  "https://files.slack.com/files-tmb/T9NK8472R-F052A0TVBPZ-5d438ffc5b/img_2215_720.jpg"
];

imageUrls = [
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


module.exports = {
  getImageUrlsFromThumbnails,
  getImageUrlsFromSlack,
};
