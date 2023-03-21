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

let imageUrls =
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

module.exports = {
  getImageUrlsFromThumbnails,
  getImageUrlsFromSlack,
};
