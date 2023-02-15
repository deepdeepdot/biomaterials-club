// @ts-check

// ---------------- Image Loader

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

function waitFor(condition, execution) {
  let interval = setInterval(() => {
    if (condition()) {
      execution();
      clearInterval(interval);
    }
  }, 500);
}

function createImageLoader() {
  let main = document.querySelector('.main');
  let batchSize, interval;

  function setup(options) {
    ({ batchSize = 50, interval = 3000 } = options);
  }

  function loadImagesForBatch(images, clickHandler) {
    let thumbnails = [];
    let count = 0;

    function incrementCount() {
      requestAnimationFrame(() => {
        count++;
      });
    }

    images.forEach((image) => {
      let thumbnail = createThumbnail(image);
      thumbnail.onclick = clickHandler;
      thumbnail.onload = incrementCount; // make it atomic, avoid race conditions
      thumbnails.push(thumbnail);
    });

    waitFor(
      function () {
        return count >= images.length;
      },
      () => {
        thumbnails.forEach((thumbnail) => {
          main.appendChild(thumbnail);
        });
      }
    );
  }

  function loadImages(images, clickHandler) {
    let myImages = [...images]; // clone this
    let batches = splitIntoBatches(myImages, batchSize);

    for (let i = 0; i < batches.length; i++) {
      let batch = batches[i];
      let load = () => loadImagesForBatch(batch, clickHandler);
      setTimeout(load, interval * i);
    }
  }

  return {
    setup,
    loadImages,
  };
}

let ImageLoader = createImageLoader();

export default ImageLoader;
