// @ts-check
/* global images */

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

// ---------------- Poem

let bananaVisible = false;

export function togglePoem(button) {
  let poem = $('.poem.anim');
  poem.classList.toggle('fadeIn');

  function updateButtonMessage() {
    let showing = button.innerText.startsWith('Show');
    if (showing) {
      if (bananaVisible) toggleBananas();
      button.innerText = 'Hide Poem';
    } else {
      button.innerText = 'Show Poem';
    }
  }
  setTimeout(updateButtonMessage, 150);
}

// ---------------- Dashboard Button

function toggleBananas() {
  let dashboard = $('.dashboard');
  dashboard.classList.toggle('visible');

  let visible = dashboard.classList.contains('visible');

  let bananas = $('#bananas');
  bananas.innerText = visible ? 'Go Less Bananas!' : 'Go Bananas!';

  bananaVisible = !bananaVisible;
}

// ---------------- Setup Images (and meassure timing)

function measureImageLoadingTime(imgs, startTime) {
  return new Promise((resolve) => {
    createCounterWait()
      .waitFor(() => {
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

const SECOND = 1000;

function setupImages(popupModal, startTime) {
  let bounceOptions = {
    duration: 1000,
    scale: 1.4,
  };
  let clickHandler = (event) => {
    let { target } = event;
    bounce(target, bounceOptions);
    popupModal(target);
  };
  let imgs = document.querySelectorAll('.main img');

  measureImageLoadingTime(imgs, startTime).then((timeDiff) => {
    console.log(`timeDiff: ${timeDiff}`);
    let superFast = timeDiff < 3 * SECOND;
    if (superFast) {
      bounceOptions.duration = 200;
    }
    ImageLoader.setup({ batchSize: 50, interval: 3000 });
    ImageLoader.loadImages(images, clickHandler, timeDiff);
  });

  imgs.forEach((img) => {
    img.addEventListener('click', clickHandler, false);
  });
}

export function setupDashboard(startTime) {
  let popupModal = setupLightBoxModal();
  setupImages(popupModal, startTime);

  let bananas = $('#bananas');
  bananas.addEventListener('click', toggleBananas, false);
}
