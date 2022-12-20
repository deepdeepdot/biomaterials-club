// https://app.slack.com/client/T9NK8472R/C03AG47UC84

function downloadLink(url) {
    //Creating new link node.
    var link = document.createElement('a');
    link.href = url;

    var filename = url.split('/').pop();
    link.setAttribute('target','_blank');
    link.setAttribute('download', filename)

    document.body.appendChild(link);

    link.click();
    link.remove();
}

let thumbnails = document.querySelectorAll('img[data-qa="file_image_thumbnail_img"]')
thumbnails.length

downloadLink(thumbnails[0].src);
downloadLink(thumbnails[1].src);
downloadLink(thumbnails[2].src);
