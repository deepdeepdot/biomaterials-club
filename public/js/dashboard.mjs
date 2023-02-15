// @ts-check
/* global images */

import ImageLoader from './imageloader.mjs';
import setupLightBoxModal from './lightbox.mjs';
import CounterWait from './counterwait.mjs';

let $ = (selector) => document.querySelector(selector);

// ---------------- Logo Animation

function doLogoAnimation() {
  let logo = $('.logo');
  let rotation = 0;

  function rotate() {
    rotation = (rotation + 10) % 360;
    logo.style.setProperty('--rotation', `${rotation}deg`);
  }
  setInterval(rotate, 500);
}

// ---------------- Column Size + Background

export function setColumnSize(size) {
  let style = document.documentElement.style;
  style.setProperty('--grid-columns', size);
}

export function setBackground(name) {
  document.body.classList.value = `${name}-bg`;
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
  }
  setTimeout(updateButtonMessage, 150);
}

// ---------------- Dashboard

function setupDashboardButtons() {
  let bananas = $('#bananas');

  function toggleBananas() {
    let dashboard = $('.dashboard');
    dashboard.classList.toggle('visible');

    let visible = dashboard.classList.contains('visible');
    bananas.innerText = visible ? 'Go Less Bananas!' : 'Go Bananas!';
  }

  bananas.addEventListener('click', toggleBananas, false);
}

// ----------------------------------

function setupImages(popupModal, startTime) {
  let imgs = document.querySelectorAll('.main img');

  CounterWait.resetCounter();
  CounterWait.waitFor(() => {
    let completed = 0;
    imgs.forEach((img) => {
      if (img.complete) {
        completed++;
      }
    });
    return completed == imgs.length;
  }, () => {
    let endTime = window.performance.now();
    let timeDiff = endTime - startTime;
    console.log('setup: ' + timeDiff);
    ImageLoader.setup({ batchSize: 50, interval: 3000 });
    ImageLoader.loadImages(images, popupModal, timeDiff);
  });

  imgs.forEach((img) => {
    img.addEventListener('click', popupModal, false);
  });
}

export function setupDashboard(startTime) {
  let popupModal = setupLightBoxModal();
  setupImages(popupModal, startTime);

  setupDashboardButtons();
  doLogoAnimation();
}
