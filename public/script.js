// @ts-check
let $ = (selector) => document.querySelector(selector);

// ---------------- Logo Animation

function doLogoAnimation() {
  let rotation = 0;

  function rotate() {
    let logo = $('.logo');
    rotation = (rotation + 10) % 360;
    logo.style.setProperty('--rotation', `${rotation}deg`);
  }
  setInterval(rotate, 100);
}

let animationStarted = false;
function startLogoAnimation() {
  if (!animationStarted) {
    doLogoAnimation();
    animationStarted = true;
  }
}

// ---------------- Column Size + Background

function setColumnSize(size) {
  let style = document.documentElement.style;
  style.setProperty('--grid-columns', size);
  startLogoAnimation();
}

function setBackground(name) {
  document.body.classList.value = `${name}-bg`;
  startLogoAnimation();
}

// ---------------- Poem

function togglePoem(button) {
  startLogoAnimation();

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

// ---------------- LightBox Modal

let ModalContent = {
  lastFocusElement: null,
  fadeOut: () => {
    let { lastFocusElement } = ModalContent;
    lastFocusElement.classList.add('fadeOut');
    let clearImageFadeOut = () => lastFocusElement.classList.remove('fadeOut');
    setTimeout(clearImageFadeOut, 300);
  },
};

function setupLightBoxModal() {
  let modal = $('.modal');

  function displayModal(imageSource, image) {
    let modalContent = $('#modal-content');

    let showContent = () => {
      modalContent.style.backgroundImage = `url(${imageSource})`;

      modal.classList.remove('transparent');
      modal.classList.remove('invisible');
    };
    image.onload = showContent;
  }

  function hideModal() {
    modal.classList.add('transparent'); // start fade animation
    let setInvisible = () => modal.classList.add('invisible');
    setTimeout(setInvisible, 650);

    ModalContent.fadeOut();
  }

  function createLargeImage(src) {
    let largeImage = new Image();
    largeImage.src = src;
    return largeImage;
  }

  function popupModal(event) {
    let image = event.target;
    let largeImageSrc = image.src.replace('/th', '');
    let largeImage = createLargeImage(largeImageSrc);
    displayModal(largeImageSrc, largeImage);

    ModalContent.lastFocusElement = image;
  }

  let imgs = document.querySelectorAll('.main img');
  imgs.forEach((img) => {
    img.addEventListener('click', popupModal, false);
  });
  modal.addEventListener('click', hideModal, false);
}

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

setupLightBoxModal();
setupDashboard();
