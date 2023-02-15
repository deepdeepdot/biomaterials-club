// @ts-check
/* global images */

import ImageLoader from './imageloader.mjs';
import setupLightBoxModal from './lightbox.mjs';

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

function setupDashboard() {
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

setupDashboard();
doLogoAnimation();

let popupModal = setupLightBoxModal();

let imgs = document.querySelectorAll('.main img');
imgs.forEach((img) => {
  img.addEventListener('click', popupModal, false);
});

ImageLoader.setup({ batchSize: 50, interval: 3000 });
ImageLoader.loadImages(images, popupModal);
