// @ts-check
import createCounterWait from './counterwait.mjs';
import TRACE from './trace.mjs';

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

  let bottom = document.querySelector('.bottom');
  let progressBarStarted = false;
  let proportion = 0;
  let counter = 0;

  // Flaky progress bar due to parallel ImageLoaders for 2 batches at the same time!
  // That might be the extra performance boost compared with rxjs
  function incrementProgressBar() {
      if (!progressBarStarted) {
          counter = 0; // reset counter
          progressBarStarted = true;
      }
      counter += 1;
      proportion = Math.floor(100 * counter / images.length);
      bottom.style.width = proportion + '%';
  }

  images.forEach((image) => {
    let thumbnail = createThumbnail(image);
    thumbnail.onclick = clickHandler;
    thumbnail.onload = () => {
      incrementProgressBar();
      counterWait.incrementCount();
    };
    thumbnails.push(thumbnail);
  });

  return counterWait
    .waitFor('loadImagesForBatch', (count) => {
      return count >= images.length;
    })
    .then(() => {
      bottom.style.width = '1%'; // reset width
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
              alert('done io!')
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
    let imagesForBatch = [];
    let imagesForBatchAppended = [];

    function loadBatch(batch) {
      return loadImagesForBatch(batch, clickHandler).then((batch) => {
        imagesForBatch.push(batch);
        return batch;
      });
    }

    function appendThumbnails(thumbnails, main, i) {
      TRACE(`Appended ${i} batch`)
      thumbnails.forEach((thumbnail) => {
        thumbnail.onclick = clickHandler;
        main.appendChild(thumbnail);
        imagesForBatchAppended[i] = true;
      });
    };

    function loadThumbnailsAndAppend(i, main) {
      let isPreloadReady = PRELOAD_BATCHES && imagesForBatch[i];

      let batch = isPreloadReady
        ? Promise.resolve(imagesForBatch[i])
        : loadBatch(batches[i]);

      // Without the PRELOAD_BATCHES, this works perfectly
      // With the PRELOAD_BATCHES, chances are that the last batch may be loaded but not appended
      // -> Need some trigger for future "appendToDom" request

      if (PRELOAD_BATCHES && i + 1 < batches.length) {
        let loadNextBatch = () => {
          loadBatch(batches[i + 1]).then(() => {
            setTimeout(() => {
              // check if it was inserted into the dom
              if (!imagesForBatchAppended[i + 1]) {
                // alert("Appending pending request");
                appendThumbnails(imagesForBatch[i + 1], main, i+1);
              }
            }, 500);
          })
        }
        setTimeout(loadNextBatch, 200);
      }
      return batch.then((thumbnails) => appendThumbnails(thumbnails, main, i));
    }

    return {
      loadThumbnailsAndAppend,
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
      main
    );
  }
  return {
    loadImages,
  };
}

let ImageLoader = createImageLoader();

export default ImageLoader;
