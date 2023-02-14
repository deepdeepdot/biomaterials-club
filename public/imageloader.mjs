// @ts-check

let createThumbnail = (img) => {
    let image = new Image();
    image.src = `images/th/${img}`;
    return image;
}

function splitIntoBatches(images, batchSize) {
    let containers = [];
    let newContainer;
    let i = 0;

    while (i < images.length) {
        newContainer = [];
        containers.push(newContainer);
        while (newContainer.length < batchSize && i < images.length) {
            newContainer.push(images[i]);
            i++;
        }
    }
    return containers;
}

function createImageLoader() {
    let main = document.querySelector('.main');
    let batchSize, interval;

    function setup(options) {
        ({ batchSize, interval } = options);
    }

    function loadImagesForBatch(images, clickHandler) {
        images.forEach(image => {
            let thumbnail = createThumbnail(image);
            thumbnail.onclick = clickHandler;
            main.appendChild(thumbnail);
        });
    }

    function loadImages(images, clickHandler) {
        let myImages = [...images]; // clone this
        let batches = splitIntoBatches(myImages, batchSize);

        for (let i = 0; i< batches.length; i++) {
            let batch = batches[i];
            let load = () => loadImagesForBatch(batch, clickHandler);
            setTimeout(load, interval*i);
        }
    }

    return {
        setup,
        loadImages
    };
}

let ImageLoader = createImageLoader();

export default ImageLoader;