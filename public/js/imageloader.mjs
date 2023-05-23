// @ts-check
import createCounterWait from './counterwait.mjs';
import TRACE from './trace.mjs';

const USE_CACHE_BUSTER = false;

let cacheBuster = USE_CACHE_BUSTER ? `?ts=${Date.now()}` : '';

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

let progressBar = {
  domNode: document.querySelector('.progress-bar'),
  setWidth: (width) => {
    progressBar.domNode.style.width = `${width}%`;
  },
  incrementProgressBar: (count, total) => {
    let proportion = Math.floor((100 * count) / total);
    progressBar.setWidth(proportion);
  },
  reset: () => {
    progressBar.setWidth(0);
  }
};

function loadImagesForBatch(imageUrls, clickHandler) {
  let counterWait = createCounterWait();
  let thumbnails = [];

  function loadImages(urls) {
    let counter = 0;

    urls.forEach((image) => {
      let thumbnail = createThumbnail(image);
      thumbnail.onclick = clickHandler;
      thumbnail.onload = () => {
        counterWait.incrementCount();
        counter += 1;
        progressBar.incrementProgressBar(counter, urls.length);
      };
      thumbnails.push(thumbnail);
    });
  }

  loadImages(imageUrls);

  return counterWait
    .waitFor('loadImagesForBatch', (count) => count >= imageUrls.length)
    .then(() => {
      setTimeout(progressBar.reset, 1000);
      return thumbnails;
    });
}

function setupIntersectionObserverForThumbnails(
  thumbnailBatches,
  totalBatches,
  main
) {
  let done = false;
  let io;

  function isItOver(currentBatch) {
    done = currentBatch === totalBatches;
    if (done) {
      TRACE('done io!', 'stronger');
      io.unobserve(progressBar.domNode);
    }
  };

  function checkIntersection(entry) {
    if (!done && entry.isIntersecting) {
      thumbnailBatches.loadThumbnailsAndAppend(main).then(isItOver);
    }
  }

  function ioCallback(entries) {
    entries.forEach(checkIntersection);
  };

  let ioOptions = {
    threshold: 0,
    rootMargin: '300px',
    root: null, // documemt.querySelector('body'),
  };

  io = new IntersectionObserver(ioCallback, ioOptions);
  io.observe(progressBar.domNode);
}

function createImageLoader() {
  let main = document.querySelector('.main');
  let imagesForBatchAppended = [];
  let clickHandler;
  let batchSize;

  function appendThumbnails(thumbnails, domTarget, idx) {
    if (imagesForBatchAppended[idx]) {
      TRACE(`Appended ${idx} batch... already appended. Skipping`);
      return;
    }
    TRACE(`Appended ${idx} batch`);
    thumbnails.forEach((thumbnail) => {
      thumbnail.onclick = clickHandler;
      domTarget.appendChild(thumbnail);
      imagesForBatchAppended[idx] = true;
    });
  }

  function loadThumbnailBatches(imageUrlBatches) {
    let currentBatch = 0;

    function loadThumbnailsAndAppend(main) {
      let batch = loadImagesForBatch(
        imageUrlBatches[currentBatch],
        clickHandler
      );
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
