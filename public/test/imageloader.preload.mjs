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
  let bottom = document.querySelector('.bottom');
  let thumbnails = [];

  function incrementProgressBar(count, total) {
    let proportion = Math.floor((100 * count) / total);
    bottom.style.width = proportion + '%';
  }

  function loadImages(urls) {
    let counter = 0;

    urls.forEach((image) => {
      let thumbnail = createThumbnail(image);
      thumbnail.onclick = clickHandler;
      thumbnail.onload = () => {
        counterWait.incrementCount();
        counter += 1;
        incrementProgressBar(counter, urls.length);
      };
      thumbnails.push(thumbnail);
    });
  }

  loadImages(imageUrls);

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
  let bottom = document.querySelector('.bottom');
  let done = false;
  let io;

  function checkIntersection(entry) {
    if (!done && entry.isIntersecting) {
      thumbnailBatches.loadThumbnailsAndAppend(main).then((currentBatch) => {
        done = currentBatch == totalBatches;
        if (done) {
          TRACE('done io!', 's');
          io.unobserve(bottom);
        }
      });
    }
  }

  let ioCallback = (entries) => {
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
    TRACE(`Appended ${idx} batch`);
    thumbnails.forEach((thumbnail) => {
      thumbnail.onclick = clickHandler;
      main.appendChild(thumbnail);
      imagesForBatchAppended[idx] = true;
    });
  }

  function loadThumbnailBatches(imageUrlBatches) {
    let preloadImagesForBatch = []; // To allow eager preload batch, very messy!

    function loadBatch(imageUrls) {
      return loadImagesForBatch(imageUrls, clickHandler).then((images) => {
        preloadImagesForBatch.push(images);
        return images;
      });
    }

    function preloadNextBatchImages(i) {
      if (i + 1 < imageUrlBatches.length) {
        let loadNextBatch = () => {
          loadBatch(imageUrlBatches[i + 1]).then(() => {
            TRACE(`>>> LoadBatch().then()...${i + 1}`);
            setTimeout(() => {
              TRACE(`>>> appendThumbnails()...${i + 1}`);
              appendThumbnails(preloadImagesForBatch[i + 1], main, i + 1);
            }, 1000);
          });
        };
        setTimeout(loadNextBatch, 200);
      }
    }

    let currentBatch = 0;

    function loadThumbnailsAndAppend(main) {
      // TODO: should we add a check on requests past the batchNum?

      let isPreloadReady =
        PRELOAD_BATCHES && preloadImagesForBatch[currentBatch];
      // Notes:
      // What if preload is in progress? are we going to "lose" it?
      // We'll have 2 concurrent loadBatch() happening, potentially compounded by a third request!
      let batch = isPreloadReady
        ? Promise.resolve(preloadImagesForBatch[currentBatch])
        : loadBatch(imageUrlBatches[currentBatch]);

      if (PRELOAD_BATCHES) {
        // Without the PRELOAD_BATCHES, this works perfectly
        // With the PRELOAD_BATCHES, chances are that the last batch may be loaded but not appended for slow connections
        preloadNextBatchImages(currentBatch);
      }
      return batch.then((thumbnails) => {
        appendThumbnails(thumbnails, main, currentBatch);
        currentBatch += 1;
        return currentBatch;
      });
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
