// @ts-check

import ImageLoader from './imageloader.mjs';
import setupLightBoxModal from './lightbox.mjs';
import createCounterWait from './counterwait.mjs';
import { bounce } from './anim.mjs';

let $ = (selector) => document.querySelector(selector);

// ---------------- Column Size + Background

export function setColumnSize(size) {
  let style = document.documentElement.style;
  style.setProperty('--grid-columns', size);
}

export function setBackground(name) {
  document.body.classList.value = `${name}-bg`;
}

// ---------------- Dashboard Button
let bananaVisible = false;

function toggleBananas() {
  let dashboard = $('.dashboard');
  dashboard.classList.toggle('visible');

  let visible = dashboard.classList.contains('visible');

  let bananas = $('#bananas');
  bananas.innerText = visible ? 'Go Less Bananas!' : 'Go Bananas!';

  bananaVisible = !bananaVisible;
}

// ---------------- Poem

export function togglePoem(button) {
  let poem = $('.poem.anim');
  poem.classList.toggle('fadeIn');

  function updateButtonMessage() {
    let showing = button.innerText.startsWith('Show');
    if (showing) {
      button.innerText = 'Hide Poem';
    } else {
      button.innerText = 'Show Poem';
    }
    if (showing && bananaVisible) {
      toggleBananas();
    }
  }
  setTimeout(updateButtonMessage, 150);
}

// ---------------- Measure image loading performance

function measureImageLoadingTime(imgs, startTime) {
  return new Promise((resolve) => {
    createCounterWait()
      .waitFor('measureImageLoadingTime', () => {
        let completed = 0;
        imgs.forEach((img) => {
          if (img.complete) {
            completed += 1;
          }
        });
        return completed === imgs.length;
      })
      .then(() => {
        let endTime = window.performance.now();
        let timeDiff = endTime - startTime;
        resolve(timeDiff);
      });
  });
}

// ---------------- Setup Images

function setupImageListeners({ imgs, popupModal, bounceOptions, batchSize, timeDiff }) {
  let clickHandler = (event) => {
    let { target } = event;
    bounce(target, bounceOptions);
    popupModal(target);
  };
  imgs.forEach((img) => {
    img.addEventListener('click', clickHandler, false);
  });
    // Get them from `window`, since we are using ES6 modules
  ImageLoader.loadImages(window.images, { batchSize, clickHandler });
}

const SECOND = 1000;

function getBounceOptions(timeDiff) {
  console.log(`timeDiff: ${timeDiff}`);
  let isSuperFast = timeDiff < 3 * SECOND;
  let bounceOptions = {
    duration: isSuperFast ? 200 : 1000, // desktop vs mobile
    scale: 1.4,
  };
  return {
    bounceOptions,
    timeDiff,
  };
}

function setupImages(popupModal, batchSize, startTime) {
  let imgs = document.querySelectorAll('.main img'); // Measure loading time for these images on page

  return measureImageLoadingTime(imgs, startTime)
    .then(getBounceOptions)
    .then(({ bounceOptions, timeDiff }) => {
      setupImageListeners({
        imgs,
        popupModal,
        bounceOptions,
        batchSize,
        timeDiff,
      });
    });
}

export function setupDashboard(startTime) {
  let popupModal = setupLightBoxModal();
  let batchSize = 35;

  setupImages(popupModal, batchSize, startTime);

  let bananas = $('#bananas');
  bananas.addEventListener('click', toggleBananas, false);
}
