// @ts-check
import { bounce, reset } from './anim.mjs';

// ---------------- LightBox Modal

let $ = (selector) => document.querySelector(selector);

// Transparency starts: opacity animation until INVISIBLE state
// Set invisible (so content can be clickable)
const MODAL_HIDE_TRANSPARENCY_DURATION = 650;

let OutsideModal = {
  lastFocusElement: null,
  setupHighlight() {
    // I guess nothing here to setup 😃
  },
  whileModalIsFadingOut() {
    let { lastFocusElement } = OutsideModal;
    if (lastFocusElement) {
      bounce(lastFocusElement, {
        scale: 3.0,
        duration: 300,
      });
    }
  }
};

function pauseTransition(element) {
  element.classList.add('disable-transition');
  requestAnimationFrame(() => {
    element.classList.remove('disable-transition');
    reset(element);
  });
}

export default function setupLightBoxModal() {
  let modal = $('.modal');

  function displayModal(imageSource, largeImage, image) {
    let modalContent = $('#modal-content');

    let showContent = () => {
      modalContent.style.backgroundImage = `url(${imageSource})`;
      modal.classList.remove('transparent', 'invisible');
      modal.addEventListener('transitionend', () => pauseTransition(image));
    };
    largeImage.onload = showContent;
  }

  function hideModal() {
    OutsideModal.setupHighlight();

    modal.classList.add('transparent'); // start fade animation
    let setInvisible = () => modal.classList.add('invisible');
    setTimeout(setInvisible, MODAL_HIDE_TRANSPARENCY_DURATION);

    OutsideModal.whileModalIsFadingOut();
  }

  function createLargeImage(src) {
    let largeImage = new Image();
    largeImage.src = src;
    return largeImage;
  }

  function popupModal(image) {
    let largeImageSrc = image.src.replace('/th', '');
    let largeImage = createLargeImage(largeImageSrc);
    displayModal(largeImageSrc, largeImage, image);

    OutsideModal.lastFocusElement = image;
  }

  modal.addEventListener('click', hideModal, false);

  return popupModal;
}
