// @ts-check

function getImageUrlsFromThumbnails(thumbnails) {
    let imageUrls = [];
    thumbnails?.forEach((thumbnail) => {
        let src = thumbnail.src;
        imageUrls.push(src);
    });
    return imageUrls;
}

let getThumbnails = () => document.querySelectorAll(
    'img[data-qa="file_image_thumbnail_img"]'
);

function getImageUrlsFromSlack() {
    let thumbnails = getThumbnails();
    let imageUrls = getImageUrlsFromThumbnails(thumbnails);
    // imageUrls = imageUrls.slice(46); //  May need to slice and skip repetitions
    console.log(imageUrls);
    return imageUrls
}

module.exports = getImageUrlsFromThumbnails;
