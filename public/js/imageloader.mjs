// @ts-check
import createCounterWait from './counterwait.mjs';

let {
    Observable,
    concatMap,
    map,
    mergeMap,
    of,
    tap,
    toArray,
} = window.rxjs;

function TRACE(message, type) {
    let css = 'background-color: #ddd; color: black; padding: 10px; border-radius: 10px;';
    if (type == 'strong') {
        css = 'background-color: red; color: yellow; padding: 10px; border-radius: 10px;';
    } else if (type == 'medium') {
        css = 'background-color: yellow; color: black; padding: 10px; border-radius: 10px;';
    } else if (type == 's') {
        css = 'background-color: purple; color: white; padding: 10px; border-radius: 10px;';
    }
    console.log('%c %s', css, message);
}

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

function appendToMain(main, images, batchCounter) {
    TRACE(`Appending to DOM main ${batchCounter}`, 'strong');
    let fragment = createFragment(images);
    main.appendChild(fragment);
}

function createIntersectionObserver(checkIntersection, target, ioOptions) {
    let ioCallback = (entries) => {
        entries.forEach(checkIntersection);
    };
    let io = new IntersectionObserver(ioCallback, ioOptions);
    io.observe(target);
    return io;
}

function getCheckIntersectionCallback(observable) {
    let checkIntersection = (entry) => {
        let state = {
            intersecting: entry.isIntersecting,
            y: window.scrollY
        }
        TRACE('IO: ' + JSON.stringify(state), 'medium')
        if (observable.subscriber) {
            if (state.intersecting) { // Should we emit only when intersecting?
                observable.subscriber.next(state);
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
                TRACE('unsubscribe', 's')
                io.unobserve(target);
            };
        }
    );
}

function loadImageBatch(imageUrls, clickHandler, batchCounter) {
    TRACE(`loadImageBatch: ${batchCounter}`);

    let thumbnailFolder = '../images/th/';
    let loadImageBatchWorkflow = of(...imageUrls)
        .pipe(
            tap(() => TRACE(`loadImageBatch: ${batchCounter}......about to load`)),
            map(url => thumbnailFolder + url),
            concatMap(url => loadPhoto(url, clickHandler)), // Load and wait for all to be loaded
            tap(() => TRACE(`loadImageBatch: ${batchCounter}......loaded image`)),
            toArray()
        );

    return loadImageBatchWorkflow;
}

function createImageLoader() {
    let clickHandler;
    let batchSize;

    let loadNextPhotos = (photos, batchCounter, batchNum) => {
        TRACE(`Current batch: ${batchCounter}`)

        if (batchCounter < batchNum) {
            let start = batchCounter * batchSize;
            let batch = photos.slice(start, start + batchSize);
            return loadImageBatch(batch, clickHandler, batchCounter);
        }
        return null; // cleanup
    };

    function createIntersection() {
        let bottom = $('.bottom');
        let ioOptions = {
            threshold: 0,
            ootMargin: '200px',
            root: null, // documemt.querySelector('body'),
        };
        let io = createIntersectionObservable(bottom, ioOptions);
        return io;
    }

    function loadNextPhotosWait(photos, batchCounter, batchNum) {
        let theImages = [];
        let done = false;
        let imageBatchObservable = loadNextPhotos(photos, batchCounter, batchNum);

        if (imageBatchObservable) {
            imageBatchObservable.subscribe({
                next: (images) => {
                    TRACE('We got the images!!!', 'strong');
                    theImages = images;
                    done = true;
                }
            });
            return new Promise(async (resolve, reject) => {
                let counterWait = createCounterWait();
                await counterWait.waitFor('loadImages', () => done);
                resolve(of(theImages));
            });
        }
        return Promise.resolve(null);
    }

    async function loadImages(photos, options) {
        ({ batchSize = 20, clickHandler } = options);

        let perfectBatchSize = photos.length % batchSize === 0;
        let lastBatch = perfectBatchSize ? 0 : 1;
        let batchNum = Math.floor(photos.length / batchSize) + lastBatch;
        let processedBatch = new Set();
        let batchCounter = 0;
        let subscription;

        let io = createIntersection();

        let imageBatchObservable = await loadNextPhotosWait(photos, batchCounter, batchNum);
        batchCounter += 1;

        let appendImagesToDom = async (images) => {
            let main = $('.main');
            appendToMain(main, images, batchCounter);
            batchCounter += 1;

            TRACE('pre-loading images for next step', 'strong');
            imageBatchObservable = await loadNextPhotosWait(photos, batchCounter, batchNum);
            if (imageBatchObservable === null) {
                subscription.unsubscribe();
            }
        };

        subscription = io.pipe(
            mergeMap(({ counter }) => {
                if (batchCounter < batchNum && imageBatchObservable) {
                    return imageBatchObservable.pipe((images) => images)
                }
                return []; // Do not break the expected stream for rxjs
            })
        )
        .subscribe({
            next: async (images) => {
                if (!images || images.length === 0) return;

                let key = images[0].src;
                if (!processedBatch.has(key)) { // It seems io is sending me the same images to append (!)
                    processedBatch.add(key);
                    appendImagesToDom(images);
                } else {
                    TRACE('Avoiding duplicate image insertion.', 's')
                    // Nice to have:
                    // We would like to add a future request (since IO failed because batch loading was in progress)
                    // Like activating some timer?
                }
            }
        });
    }
    return {
        loadImages,
    };
}

let ImageLoader = createImageLoader();

export default ImageLoader; // Only for ES6 import/export modules