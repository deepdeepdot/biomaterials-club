let {
    Observable,
    toArray,
    concatMap,
    of,
    map,
    mergeMap,
} = window.rxjs;

const USE_CACHE_BUSTER = false;

let cacheBuster = USE_CACHE_BUSTER ? '?ts=' + Date.now() : '';

let $ = (s) => document.querySelector(s);

let loadPhoto = (url, clickHandler) => {
    let img = new Image();
    img.src = `${url}${cacheBuster}`;
    img.addEventListener('click', clickHandler, false);

    return new Promise((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}

function createFragment(images) {
    let fragment = document.createDocumentFragment();
    images.forEach(image => {
        fragment.appendChild(image);
    });
    return fragment;
}

function appendToMain(main, images) {
    let fragment = createFragment(images);
    main.appendChild(fragment);
}

function createIntersectionObserver(checkIntersection, target, ioOptions = { threshold: 0, root: null }) {
    let ioCallback = (entries) => {
        entries.forEach(checkIntersection);
    };
    let io = new IntersectionObserver(ioCallback, ioOptions);
    io.observe(target);
    return io;
}

function getCheckIntersectionCallback(observable) {
    let counter = 0;
    let checkIntersection = (entry) => {
        let state = {
            counter,
            intersecting: entry.isIntersecting,
            y: window.scrollY
        }
        if (observable.subscriber) {
            if (state.intersecting) { // Should we emit only when intersecting?
                observable.subscriber.next(state);
                counter += 1;
            }
        }
    };
    return checkIntersection;
}

function createIntersectionObservable(target, ioOptions) {
    let observable = {};
    let checkIntersection = getCheckIntersectionCallback(observable);
    let io = createIntersectionObserver(checkIntersection, target, ioOptions);

    return new Observable(
        function subscribe(theSubscriber) {
            observable.subscriber = theSubscriber;

            return function unsubscribe() {
                io.unobserve(target);
            };
        }
    );
}

function loadImageBatch(imageUrls, clickHandler) {
    let thumbnailFolder = "../images/th/";
    let loadImageBatchWorkflow = of(...imageUrls)
        .pipe(
            map(url => thumbnailFolder + url),
            concatMap(url => loadPhoto(url, clickHandler)), // Load and wait for all to be loaded
            toArray()
        )
    return loadImageBatchWorkflow;
}

function createImageLoader() {

    let bottom = $('.bottom');
    let ioOptions = {
        threshold: 0,
        ootMargin: '200px',
        root: null, // documemt.querySelector('body'),
    };
    let io = createIntersectionObservable(bottom, ioOptions);
    let main = $('.main');

    let clickHandler;
    let batchSize;
    let batchNum;
    let imageBatchObservable;

    let currentBatch = 0;
    let loadNextPhotos = (photos) => {
        if (currentBatch < batchNum) {
            let start = currentBatch * batchSize;
            let batch = photos.slice(start, start + batchSize);
            imageBatchObservable = loadImageBatch(batch, clickHandler);
            currentBatch += 1;
        } else {
            imageBatchObservable = null; // cleanup
        }
        return imageBatchObservable;
    };

    function setup(options) {
        ({ batchSize = 20, clickHandler } = options);
    }

    function loadImages(photos) {
        let perfectBatchSize = photos.length % batchSize === 0;
        let lastBatch = perfectBatchSize ? 0 : 1;
        batchNum = Math.floor(photos.length / batchSize) + lastBatch;

        loadNextPhotos(photos);

        let subscription = io.pipe(
            mergeMap(({ counter }) => {
                if (counter < batchNum) {
                    return imageBatchObservable.pipe(
                        (images) => images
                    )
                }
            })
        )
        .subscribe({
            next: (images) => {
                appendToMain(main, images);
                loadNextPhotos(photos);
                if (imageBatchObservable === null) {
                    subscription.unsubscribe();
                }
            }
        });
    }

    return {
        setup,
        loadImages,
    };
}

// Only for ES6 import/export modules
let ImageLoader = createImageLoader();

export default ImageLoader;