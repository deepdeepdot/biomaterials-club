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

function waitFor(condition, execution, waitCycleDuration = 500) {
  let interval = setInterval(() => {
    if (condition()) {
      execution();
      clearInterval(interval);
    }
  }, waitCycleDuration);
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

  function loadAllImages(images, clickHandler) {
    images.forEach((image) => {
      let thumbnail = createThumbnail(image);
      thumbnail.onclick = clickHandler;
      thumbnail.onload = () => main.appendChild(thumbnail);
    });
  }

  function loadImages(images, clickHandler) {
    // if (isSuperSlow()) return; // Do not bother with all images, use IntersectionObserver?

    let myImages = [...images]; // clone this

    if (isDesktop() && isFastSpeed()) {
      loadAllImages(myImages, clickHandler);
    }
    else {
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

function isSuperSlow() {
  return navigator.connection.effectiveType == '2g' || navigator.connection.downlink < 2 || navigator.connection.rtt >= 1000
}

function isFastSpeed() {
  return navigator.connection.effectiveType == '4g' || navigator.connection.downlink >= 10 || navigator.connection.rtt >= 50;
}

function isDesktop() {
  let isTouch = ('ontouchstart' in window); // exception: surface, some Android/chrome laptops?
  return !isTouch;
}

let ImageLoader = createImageLoader();

export default ImageLoader;
