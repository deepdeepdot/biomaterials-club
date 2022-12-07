https://app.slack.com/client/T9NK8472R/C03AG47UC84

file_image_thumbnail_img

imgs = document.querySelectorAll('img[data-qa="file_image_thumbnail_img"]')

// imgs.forEach(img => console.log(img))

imgs.forEach(img => console.log(img.src))


url = 'https://files.slack.com/files-tmb/T9NK8472R-F03N7K6NK9A-8d3f05c2eb/image_720.png'
image = await fetch(url, { mode: 'no-cors'})


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

thumbnails.forEach(img => downloadLink(img.src))

    // //Dispatching click event.
    // if (document.createEvent) {
    //     var e = document.createEvent('MouseEvents');
    //     e.initEvent('click', true, true);
    //     link.dispatchEvent(e);
    //     return true;
    // }        
    // window.open(sUrl, '_blank');
    // return true;

imgs.forEach(img => downloadFile(img.src))

downloadFile(imgs[1].src)

function downloadImageFromSlack() {
    var thumbnail = document.querySelector('img[data-qa="file_image_thumbnail_img"]')
    downloadFile(thumbnail.src)    
}

var thumbnails = document.querySelectorAll('img[data-qa="file_image_thumbnail_img"]')
downloadFile(thumbnails[0].src)

async function downloadImage(imageSrc) {
    const image = await fetch(imageSrc,
    {
            mode: 'no-cors',
            credentials: 'same-origin', // include, *same-origin, omit
            // redirect: 'follow'
    })
    const imageBlob = await image.blob()
    if (imageBlob.size > 0) {
        const imageURL = URL.createObjectURL(imageBlob)
  
        const link = document.createElement('a')
        link.href = imageURL
        link.download = imageSrc.split('/').pop();
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    } else {
        alert("Empty download")
    }
}

var thumbnails = document.querySelectorAll('img[data-qa="file_image_thumbnail_img"]')

thumbnails.forEach(async img => await downloadImage(img.src))

