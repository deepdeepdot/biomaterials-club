// @ts-check
import createCounterWait from './counterwait.mjs';

const PRELOAD_BATCHES = 1;
const USE_CACHE_BUSTER = true;

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
      if (!done && entry.isIntersecting) {
        thumbnailBatches
          .getThumbnailBatch(currentBatch)
          .then(appendThumbnails)
          .then(() => {
            currentBatch += 1;
          });
        let isLast = currentBatch >= totalBatches - 1;
        if (isLast) {
          io.unobserve(bottom);
          done = true;
        }
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

  function setup(options) {
    ({ batchSize = 50, clickHandler } = options);
  }

  function loadThumbnailBatches(batches) {
    let preloadedBatches = [];
    let batchCount = 0;

    function loadBatch(index, batch) {
      if (!(index < batchCount + 1)) {
        return Promise.reject(
          new Error(`Batch loading in progress for: ${index}`)
        );
      }
      batchCount += 1;
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
        : loadBatch(i, batches[i]);
      if (PRELOAD_BATCHES && i + 1 < batches.length) {
        let loadNextBatch = () => {
          if (i + 1 < batches.length) {
            // double-check size again. things can change
            loadBatch(i + 1, batches[i + 1]);
          }
        };
        setTimeout(loadNextBatch, 200);
      }

      return batch;
    }

    return {
      getThumbnailBatch,
    };
  }

  const SECOND = 1000;

  function loadImages(images, timeDiff) {
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
    setup,
    loadImages,
  };
}

let ImageLoader = createImageLoader();

export default ImageLoader;
