// Strategy: try out with the large image as POC

// Then try out the batch of images at a time

// Also consider loading in a different thread (continously)
// but only append to DOM on intersection observer

// Queue on the receiving side of blob data => Process on io zones

function createWebWorker(scriptId) {
    let URL = window.URL || window.webkitURL;
    let url = URL.createObjectURL(
        new Blob(
            [document.getElementById(scriptId).textContent],
            { type: "text/javascript" }
        )
    );
    let worker = new Worker(url);
    return worker;
}

// jsFile.js (or script tag)
self.addEventListener('message', async event => {
    const imageUrl = event.data;
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    self.postMessage({
        imageUrl,
        blob
    });
});

//==============================================================

// <script id="imgloader" type="javascript/worker">
let getImageBlob = (imageUrl) => {
    return fetch(imageUrl).then(response => response.blob());
};

let getImageResult = async (imageUrl) => ({
    imageBlob: await getImageBlob(imageUrl)
});

let getImageBatch = async (imageUrls) => {
    let blobPromises = imageUrls.map(getImageBlob);
    return {
        imageBlogs: await Promise.all(blobPromises)
    };
};

self.addEventListener('message', event => {
    let { data } = event;
    let result = {}; // not much by default

    if (data.imageUrl) { // for very large images, another thread
        result = getImageResult(data.imageUrl);
    }
    if (data.batch) {
        result = getImageResult(data.batch);
    }
    self.postMessage(result);
});
// </script>

//==============================================================


// ----- client side for one image load at a time

const ImageLoaderWorker = new Worker(jsFile);

const imageUrls = [];

function loadImages(imageUrls) {
    imageUrls.forEach(url => {
        ImageLoaderWorker.postMessage(url);
    });

    ImageLoaderWorker.addEventListener('message', event => {
        const imageData = event.data;

        const objectURL = URL.createObjectURL(imageData.blob);

        const imageElement = new Image();
        imageElement.onload = () => {
            // Append element somewhere?
            main.appendChild(imageElement);

            // Cleanup
            URL.revokeObjectURL(objectURL);
        }
    });
}

//==============================================================
// ----- client side for a batch of images
function getImageFromBlob(blob) {
    let image = new Image();
    let objectUrl = URL.createObjectURL(blob);

    return new Promise((resolve, reject) => {
        image.onload = () => {
            resolve();
            alert('can we execute after resolve()? YES!!! '); // guessing we never reach here

            // Cleanup
            URL.revokeObjectURL(objectUrl);
        };
        image.onerror = reject;
    });
}
//
// loadImagesForBatch(imageUrls);
//
function loadImagesForBatch(imageUrls) {
    ImageLoaderWorker.postMessage({ batch: imageUrls });

    function blobToImages(imageBlobs) {
        return imageBlobs.map(blob => getImageFromBlob(blob));
    }

    return new Promise((resolve, reject) => {
        let messageListener = async (event) => {
            let imageBlobs = event.data;
            try {
                let images = Promise.all(blobToImages(imageBlobs));
                resolve(images);
            } catch (e) {
                // This is too drastic. Maybe ok to fail 1 or 2? and Retry those failing ones?
                reject(e);
            }
        };
        ImageLoaderWorker.addEventListener('message', messageListener);
    });
}
//==============================================================
