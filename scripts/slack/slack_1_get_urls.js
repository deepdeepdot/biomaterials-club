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
var imageUrls = [
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
*/

module.exports = {
  getImageUrlsFromThumbnails,
  getImageUrlsFromSlack,
};
