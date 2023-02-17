// @ts-check
// ---------------- Image Loader

import createCounterWait from './counterwait.mjs';

let createThumbnail = (img) => {
  let image = new Image();
  image.src = `images/th/${img}`;
  return image;
};

function splitIntoBatches(images, batchSize) {
  let batches = [];
  let newBatch;
  let i = 0;

  while (i < images.length) {
    newBatch = [];
    batches.push(newBatch);
    while (newBatch.length < batchSize && i < images.length) {
      newBatch.push(images[i]);
      i++;
    }
  }
  return batches;
}

function createImageLoader() {
  let main = document.querySelector('.main');
  let batchSize, interval;

  function setup(options) {
    ({ batchSize = 50, interval = 3000 } = options);
  }

  function loadImagesForBatch(images, clickHandler) {
    let counterWait = createCounterWait();
    let thumbnails = [];

    images.forEach((image) => {
      let thumbnail = createThumbnail(image);
      thumbnail.onclick = clickHandler;
      thumbnail.onload = counterWait.incrementCount;
      thumbnails.push(thumbnail);
    });

    counterWait
      .waitFor(function (count) {
        return count >= images.length;
      })
      .then(() => {
        thumbnails.forEach((thumbnail) => {
          main.appendChild(thumbnail);
        });
      });
  }

  function loadAllImages(images, clickHandler) {
    images.forEach((image) => {
      let thumbnail = createThumbnail(image);
      thumbnail.onclick = clickHandler;
      thumbnail.onload = () => main.appendChild(thumbnail);
    });
  }

  const SECOND = 1000;

  function loadImages(images, clickHandler, timeDiff) {
    let isSuperSlow = timeDiff > 5 * SECOND;
    if (isSuperSlow) return;

    let myImages = [...images]; // clone this

    let isFastSpeed = timeDiff < 3 * SECOND;

    console.log(`isSuperSlow: ${isSuperSlow}`);
    console.log(`isFastSpeed: ${isFastSpeed}`);

    if (isDesktop() && isFastSpeed) {
      loadAllImages(myImages, clickHandler);
    } else {
      let batches = splitIntoBatches(myImages, batchSize);
      for (let i = 0; i < batches.length; i++) {
        let batch = batches[i];
        let load = () => loadImagesForBatch(batch, clickHandler);
        setTimeout(load, interval * i); // batch every interval
      }
    }
  }

  return {
    setup,
    loadImages,
  };
}

// ----------------------------- Device detection

function isDesktop() {
  let isTouch = 'ontouchstart' in window; // exception: surface, some Android/chrome laptops?
  return !isTouch;
}

let ImageLoader = createImageLoader();

export default ImageLoader;
