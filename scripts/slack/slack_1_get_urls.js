// @ts-check

function getImageUrlsFromThumbnails(thumbnails) {
  let imageUrls = [];
  thumbnails?.forEach((thumbnail) => {
    let src = thumbnail.src;
    imageUrls.push(src);
  });
  return imageUrls;
}

let getThumbnails = () =>
  document.querySelectorAll('img[data-qa="file_image_thumbnail_img"]');

function getImageUrlsFromSlack() {
  let thumbnails = getThumbnails();
  let imageUrls = getImageUrlsFromThumbnails(thumbnails);
  // imageUrls = imageUrls.slice(46); //  May need to slice and skip repetitions
  console.log(imageUrls);
  return imageUrls;
}

/*
// Open Slack on a browser
// Visit genspace's biomaterials channel
// Open dev console and copy paste: getImageUrlsFromThumbnails(), getThumbnails()

let imageUrls = getImageUrlsFromSlack();

// Example
var imageUrls =
[
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

*/

module.exports = {
  getImageUrlsFromThumbnails,
  getImageUrlsFromSlack,
};
