// @ts-check
import createCounterWait from './counterwait.mjs';
import TRACE from './trace.mjs';

const PRELOAD_BATCHES = 0;
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

function loadImagesForBatch(imageUrls, clickHandler) {
  let counterWait = createCounterWait();
  let thumbnails = [];

  let bottom = document.querySelector('.bottom');

  function incrementProgressBar(count, total) {
    let proportion = Math.floor(100 * count / total);
    bottom.style.width = proportion + '%';
  }

  let counter = 0;
  imageUrls.forEach((image) => {
    let thumbnail = createThumbnail(image);
    thumbnail.onclick = clickHandler;
    thumbnail.onload = () => {
      counterWait.incrementCount();
      counter += 1;
      incrementProgressBar(counter, imageUrls.length);
    };
    thumbnails.push(thumbnail);
  });

  return counterWait
    .waitFor('loadImagesForBatch', (count) => {
      return count >= imageUrls.length;
    })
    .then(() => {
      setTimeout(() => {
        bottom.style.width = '0%'; // reset width
      }, 1000);
      return thumbnails;
    });
}

function setupIntersectionObserverForThumbnails(
  thumbnailBatches,
  totalBatches,
  main
) {
  let io;
  let done = false; // we want to stop listening after we reach currentBatch == totalBatches-1
  let bottom = document.querySelector('.bottom');
  let currentBatch = 0;

  let ioCallback = (entries) => {
    let checkIntersection = (entry) => {
      if (!done && currentBatch < totalBatches && entry.isIntersecting) {
        thumbnailBatches
          .loadThumbnailsAndAppend(currentBatch, main)
          .then(() => {
            currentBatch += 1;
            done = !(currentBatch < totalBatches);
            if (done) {
              // Check for last batch to append to dom if needed
              TRACE('done io!', 's')
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

  let imagesForBatchAppended = [];

  function appendThumbnails(thumbnails, main, idx) {
    if (imagesForBatchAppended[idx]) {
      TRACE(`Appended ${idx} batch... already appended. Skipping`);
      return;
    }
    TRACE(`Appended ${idx} batch`)
    thumbnails.forEach((thumbnail) => {
      thumbnail.onclick = clickHandler;
      main.appendChild(thumbnail);
      imagesForBatchAppended[idx] = true;
    });
  };

  function loadThumbnailBatches(imageUrlBatches) {
    let imagesForBatch = [];

    function loadBatch(batch) {
      return loadImagesForBatch(batch, clickHandler).then((batch) => {
        imagesForBatch.push(batch);
        return batch;
      });
    }

    function preloadNextBatchImages(i) {
      if (i + 1 < imageUrlBatches.length) {
        let loadNextBatch = () => {
          loadBatch(imageUrlBatches[i + 1]).then(() => {
            TRACE(`>>> LoadBatch().then()...${i + 1}`);
            setTimeout(() => {
              // check if it was inserted into the dom
              TRACE(`>>> appendThumbnails()...${i + 1}`);
              appendThumbnails(imagesForBatch[i + 1], main, i + 1);
            }, 1000);
          })
        }
        setTimeout(loadNextBatch, 200);
      }
    }

    function loadThumbnailsAndAppend(i, main) {
      let isPreloadReady = PRELOAD_BATCHES && imagesForBatch[i];

      let batch = isPreloadReady
        ? Promise.resolve(imagesForBatch[i])
        : loadBatch(imageUrlBatches[i]);

      // Without the PRELOAD_BATCHES, this works perfectly
      // With the PRELOAD_BATCHES, chances are that the last batch may be loaded but not appended
      // -> Need some trigger for future "appendToDom" request
      if (PRELOAD_BATCHES) {
        preloadNextBatchImages(i);
      }

      return batch.then((thumbnails) => appendThumbnails(thumbnails, main, i));
    }

    return {
      loadThumbnailsAndAppend,
    };
  }

  function loadImages(imageUrls, options) {
    ({ batchSize = 50, clickHandler } = options);

    let imageUrlBatches = splitIntoBatches(imageUrls, batchSize);
    let totalBatches = Math.ceil(imageUrls.length / batchSize);
    let thumbnailBatches = loadThumbnailBatches(imageUrlBatches);

    setupIntersectionObserverForThumbnails(
      thumbnailBatches,
      totalBatches,
      main
    );
  }
  return {
    loadImages,
  };
}

let ImageLoader = createImageLoader();

export default ImageLoader;
