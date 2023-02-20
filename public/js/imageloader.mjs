// @ts-check
import createCounterWait from './counterwait.mjs';

const TEST_FOR_BATCHES = true;

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

function setupIntersectionObserver(batches, clickHandler, main) {
  let ioOptions = {
    threshold: 0,
    rootMargin: '400px',
  };

  let io = new IntersectionObserver((entries) => {
    let currentBatch = 0;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log('IS intersecting');
        if (currentBatch < batches.length) {
          loadImagesForBatchAndInsertToDom(
            batches[currentBatch],
            clickHandler,
            main
          );
          currentBatch += 1;

          let isLast = currentBatch === batches.length;
          if (isLast) {
            io.unobserve(entry.target);
          }
        }
      } else {
        console.log('IS NOT intersecting');
      }
    });
  }, ioOptions);

  let bottom = document.querySelector('.bottom');
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
    let spacedByTime = true;
    let sequential = !spacedByTime;

    if (spacedByTime) {
      batches.forEach((batch, i) => {
        let load = () => loadImagesForBatchAndInsertToDom(batch, clickHandler, main);
        setTimeout(load, interval * i); // batch every interval
      });
    }
    if (sequential) {
      batches.forEach(async (batch) => {
        await loadImagesForBatchAndInsertToDom(batch, clickHandler, main);
      });
    }
  }

  const SECOND = 1000;

  function loadImagesContinously(images, clickHandler, timeDiff) {
    let isSuperSlow = timeDiff > 5 * SECOND;
    if (isSuperSlow) return;

    let isFastSpeed = timeDiff < 3 * SECOND;

    console.log(`isSuperSlow: ${isSuperSlow}`);
    console.log(`isFastSpeed: ${isFastSpeed}`);

    if (!TEST_FOR_BATCHES && isDesktop() && isFastSpeed) {
      loadAllImages(images, clickHandler);
    } else {
      let batches = splitIntoBatches(images, batchSize);
      loadAllBatchess(batches, clickHandler);
    }
  }

  function loadImages(images, clickHandler, timeDiff) {
    let myImages = [...images]; // clone this

    let useLoadImagesContinously = false;
    if (useLoadImagesContinously) {
      loadImagesContinously(myImages, clickHandler, timeDiff);
    } else {
      let batches = splitIntoBatches(myImages, batchSize);
      setupIntersectionObserver(batches, clickHandler, main);
    }
  }

  return {
    setup,
    loadImages,
  };
}

let ImageLoader = createImageLoader();

export default ImageLoader;
