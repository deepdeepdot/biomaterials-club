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
    let css = 'background-color: #ddd; color: black';
    if (type == 'strong') {
        css = 'background-color: red; color: yellow';
    } else if (type == 'medium') {
        css = 'background-color: yellow; color: black';
    } else if (type == 's') {
        css = 'background-color: purple; color: white';
    }
    css += '; padding: 10px; border-radius: 10px;';

    console.log('%c %s', css, message);
}

const THUMBNAIL_FOLDER = '../images/th/';
const USE_CACHE_BUSTER = false;

let cacheBuster = USE_CACHE_BUSTER ? '?ts=' + Date.now() : '';

let $ = (s) => document.querySelector(s);

let loadPhoto = (url, clickHandler, onload) => {
    let img = new Image();
    img.src = `${THUMBNAIL_FOLDER}${url}${cacheBuster}`;
    img.addEventListener('click', clickHandler, false);

    return new Promise((resolve, reject) => {
        img.onload = () => {
            onload();
            resolve(img);
        }
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
    let checkIntersection = function(entry) {
        let state = {
            intersecting: entry.isIntersecting,
            y: window.scrollY
        }
        TRACE('IO: ' + JSON.stringify(state), 'medium')
        if (state.intersecting && observable.subscriber) {
            observable.subscriber.next(state);
        }
    };
    return checkIntersection;
}

function createIntersectionObservable(target, ioOptions, triggerer) {
    let observable = {};
    let checkIntersection = getCheckIntersectionCallback(observable);
    let io = createIntersectionObserver(checkIntersection, target, ioOptions);

    // Just to pass the subscriber to emit next() from IO
    return new Observable(
        function subscribe(theSubscriber) {
            observable.subscriber = theSubscriber;

            triggerer.retriggerAppendImagesToDom = function(...args) {
                theSubscriber.next(...args);
            }

            return function unsubscribe() {
                TRACE('unsubscribe', 's')
                io.unobserve(target);
            };
        }
    );
}

function loadImageBatch(imageUrls, clickHandler, batchCounter, showProgressBar) {
    TRACE(`loadImageBatch: ${batchCounter}`);

    // Progress bar loader
    let bottom = document.querySelector('.bottom');
    let counter = 0;
    let proportion = 0;

    let progressBarStarted = false;

    function increment() {
        if (!showProgressBar) return;

        if (!progressBarStarted) {
            counter = 0; // reset counter
            progressBarStarted = true;
        }
        counter += 1;
        proportion = Math.floor(100 * counter / imageUrls.length);
        bottom.style.width = proportion + '%';
    }

    let loadImageBatchWorkflow = of(...imageUrls)
        .pipe(
            tap(() => { counter += 1; }),
            tap(() => TRACE(`loadImageBatch: ${batchCounter}: ${counter}.....about to load`)),
            concatMap(url => loadPhoto(url, clickHandler, increment)), // Load and wait for all to be loaded
            tap(() => TRACE(`loadImageBatch: ${batchCounter}: ${counter}......loaded`)),
            toArray()
        );

    return loadImageBatchWorkflow;
}

function createImageLoader() {
    let triggerer = {
        count: 0,
        max: 20
    };
    let clickHandler;
    let batchSize;

    let loadNextPhotos = (photos, batchCounter, batchNum, showProgressBar) => {
        TRACE(`Current batch: ${batchCounter}`)

        if (batchCounter < batchNum) {
            let start = batchCounter * batchSize;
            let batch = photos.slice(start, start + batchSize);
            return loadImageBatch(batch, clickHandler, batchCounter, showProgressBar);
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
        let io = createIntersectionObservable(bottom, ioOptions, triggerer);
        return io;
    }

    function loadNextPhotosWait(photos, batchCounter, batchNum, showProgressBar = true) {
        let theImages = [];
        let done = false;

        // We want to "start" the image batch download eagerly,
        // as opposed to directly attach to the dom in one single stream

        let imageBatchObservable = loadNextPhotos(photos, batchCounter, batchNum, showProgressBar);
        if (!imageBatchObservable) {
            return Promise.resolve(null);
        }
        imageBatchObservable.subscribe({
            next: (images) => {
                TRACE('We got the images!!!', 'strong');
                theImages = images;
                done = true;
            }
        });
        return new Promise(async (resolve) => {
            let counterWait = createCounterWait();
            await counterWait.waitFor('loadNextPhotosWait', () => done);
            resolve(of(theImages));
        });
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

        let imageBatchObservable = await loadNextPhotosWait(photos, batchCounter, batchNum, false);
        batchCounter += 1;

        async function appendImagesToDom(images) {
            let main = $('.main');
            appendToMain(main, images, batchCounter);
            batchCounter += 1; // Increment only after appending to DOM

            TRACE('pre-loading images for next step', 'strong');
            imageBatchObservable = await loadNextPhotosWait(photos, batchCounter, batchNum);
            if (imageBatchObservable === null) {
                subscription.unsubscribe();
            }
        }

        async function appendImagesToDomWithCheck(images) {
            if (!images || images.length === 0) return;

            let key = images[0].src;
            if (!processedBatch.has(key)) { // It seems io is sending me the same images to append (!)
                processedBatch.add(key);
                appendImagesToDom(images);
                triggerer.count = 0;
            } else {
                TRACE('Avoiding duplicate image insertion.', 's');
                // Have some sort of loop to try to "pickup" once the image batch is loaded
                // Retrigger request, after some timeout wait, keep looping until satisfied
                // Avoid some infinite loop, up to triggerer.max times

                if (triggerer.count < triggerer.max) {
                    setTimeout(triggerer.retriggerAppendImagesToDom, 200);
                    triggerer.count += 1;
                }
            }
        }

        subscription = io.pipe(
            mergeMap(() => {
                if (batchCounter < batchNum && imageBatchObservable) {
                    return imageBatchObservable.pipe((images) => images)
                }
                return []; // Do not break the expected stream for rxjs
            })
        )
        .subscribe({
            next: appendImagesToDomWithCheck
        });
    }
    return {
        loadImages,
    };
}

let ImageLoader = createImageLoader();

export default ImageLoader; // Only for ES6 import/export modules