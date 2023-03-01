// @ts-check
import createCounterWait from './counterwait.mjs';

const PRELOAD_BATCHES = 1;
const USE_CACHE_BUSTER = false;

let cacheBuster = USE_CACHE_BUSTER ? '?ts=' + Date.now() : '';

// ----------------------------- Image Loader

let createThumbnail = (img) => {
  let image = new Image();
  image.src = `images/th/${img}${cacheBuster}`;
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
      i += 1;
    }
  }
  return batches;
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

  return counterWait
    .waitFor('loadImagesForBatch', (count) => {
      return count >= images.length;
    })
    .then(() => {
      return thumbnails;
    });
}

function setupIntersectionObserverForThumbnails(
  thumbnailBatches,
  totalBatches,
  clickHandler,
  main
) {
  let io;
  let done = false; // we want to stop listening after we reach currentBatch == totalBatches-1
  let bottom = document.querySelector('.bottom');
  let currentBatch = 0;

  let appendThumbnails = (thumbnails) => {
    thumbnails.forEach((thumbnail) => {
      thumbnail.onclick = clickHandler;
      main.appendChild(thumbnail);
    });
  };

  let ioCallback = (entries) => {
    let checkIntersection = (entry) => {
      if (!done && currentBatch < totalBatches && entry.isIntersecting) {
        thumbnailBatches
          .getThumbnailBatch(currentBatch)
          .then(appendThumbnails)
          .then(() => {
            currentBatch += 1;
            done = !(currentBatch < totalBatches);
            if (done) {
              io.unobserve(bottom);
            }
          });
      }
    };
    entries.forEach(checkIntersection);
  };

  let ioOptions = {
    threshold: 0,
    rootMargin: '300px',
    root: null, // documemt.querySelector('body'),
  };
  io = new IntersectionObserver(ioCallback, ioOptions);
  io.observe(bottom);
}

function createImageLoader() {
  let main = document.querySelector('.main');
  let batchSize;
  let clickHandler;

  function loadThumbnailBatches(batches) {
    let preloadedBatches = [];

    function loadBatch(batch) {
      return loadImagesForBatch(batch, clickHandler).then((batch) => {
        preloadedBatches.push(batch);
        return batch;
      });
    }

    function getThumbnailBatch(i) {
      // We always return the next batch and end of this function
      let isPreloadReady = PRELOAD_BATCHES && preloadedBatches[i];

      let batch = isPreloadReady
        ? Promise.resolve(preloadedBatches[i])
        : loadBatch(batches[i]);

      if (PRELOAD_BATCHES && i + 1 < batches.length) {
        let loadNextBatch = () => loadBatch(batches[i + 1]);
        setTimeout(loadNextBatch, 200);
      }
      return batch;
    }

    return {
      getThumbnailBatch,
    };
  }

  function loadImages(images, options) {
    ({ batchSize = 50, clickHandler } = options);

    // Intersection observer
    let batches = splitIntoBatches(images, batchSize);
    let totalBatches = Math.ceil(images.length / batchSize);
    let thumbnailBatches = loadThumbnailBatches(batches);

    setupIntersectionObserverForThumbnails(
      thumbnailBatches,
      totalBatches,
      clickHandler,
      main
    );
  }
  return {
    loadImages,
  };
}

let ImageLoader = createImageLoader();

export default ImageLoader;
