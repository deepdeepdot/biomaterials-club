// @ts-check
import createCounterWait from './counterwait.mjs';

const TEST_FOR_BATCHES = false; // default: false

// ----------------------------- Device detection

function isDesktop() {
  let isTouch = 'ontouchstart' in window; // exception: surface, some Android/chrome laptops?
  return !isTouch;
}

// ----------------------------- Image Loader

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

function loadImagesForBatchAndInsertToDom(images, clickHandler, main) {
  return loadImagesForBatch(images, clickHandler).then((thumbnails) => {
    thumbnails.forEach((thumbnail) => {
      main.appendChild(thumbnail);
    });
    return thumbnails;
  });
}

function setupIntersectionObserverForThumbnails(thumbnailBatches, totalBatches, clickHandler, main) {
  let currentBatch = 0;
  let io;

  let bottom = document.querySelector('.bottom');

  let callback = (entries) => {
    let checkIntersection = (entry) => {
      if (entry.isIntersecting) {
        let thumbnails = thumbnailBatches.getThumbnailBatch(currentBatch);
        if (thumbnails) {
          thumbnails.forEach((thumbnail) => {
            thumbnail.onclick = clickHandler;
            main.appendChild(thumbnail);
          });
          currentBatch += 1;
        }
        let isLast = currentBatch === totalBatches;
        if (isLast) {
          io.unobserve(bottom);
        }
      }
    };
    entries.forEach(checkIntersection);
  };

  let ioOptions = {
    threshold: 0,
    rootMargin: '400px',
  };
  io = new IntersectionObserver(callback, ioOptions);
  io.observe(bottom);
}

function createImageLoader() {
  let main = document.querySelector('.main');
  let batchSize;
  let interval;

  function setup(options) {
    ({ batchSize = 50, interval = 3000 } = options);
  }

  function loadAllImages(images, clickHandler) {
    images.forEach((image) => {
      let thumbnail = createThumbnail(image);
      thumbnail.onclick = clickHandler;
      thumbnail.onload = () => main.appendChild(thumbnail);
    });
  }

  function loadAllBatchess(batches, clickHandler) {
    let spacedByTime = false;
    let sequential = !spacedByTime;
    let thumbnailBatches = [];

    if (spacedByTime) {
      batches.forEach(async (batch, i) => {
        let load = async() => {
          let thumbnails = await loadImagesForBatch(batch, clickHandler);
          thumbnailBatches.push(thumbnails);
        };
        setTimeout(load, interval * i); // batch every interval
      });
    }
    if (sequential) {
      batches.forEach(async (batch) => {
        let thumbnails = await loadImagesForBatch(batch, clickHandler);
        thumbnailBatches.push(thumbnails);
      });
    }
    return {
      getThumbnailBatch: (i) => thumbnailBatches[i]
    };
  }

  const SECOND = 1000;

  function loadImages(images, clickHandler, timeDiff) {
    let isSuperSlow = timeDiff > 5 * SECOND;
    if (isSuperSlow) return;

    let isFastSpeed = timeDiff < 3 * SECOND;

    console.log(`isSuperSlow: ${isSuperSlow}`);
    console.log(`isFastSpeed: ${isFastSpeed}`);

    if (!TEST_FOR_BATCHES && isDesktop() && isFastSpeed) {
      loadAllImages(images, clickHandler);
    } else {
      // Intersection observer
      let batches = splitIntoBatches(images, batchSize);
      let totalBatches = Math.ceil(images.length / batchSize);
      let thumbnailBatches = loadAllBatchess(batches, clickHandler);
      setupIntersectionObserverForThumbnails(thumbnailBatches, totalBatches, clickHandler, main);
    }
  }

  return {
    setup,
    loadImages,
  };
}

let ImageLoader = createImageLoader();

export default ImageLoader;
