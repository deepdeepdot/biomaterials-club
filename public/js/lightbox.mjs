// @ts-check

// ---------------- LightBox Modal

let $ = (selector) => document.querySelector(selector);

// Transparency starts: opacity animation until INVISIBLE state
// Set invisible (so content can be clickable)
const MODAL_HIDE_TRANSPARENCY_DURATION = 650;
const HIGHLIGHT_DURATION = 300;

let OutsideModal = {
  lastFocusElement: null,
  setupHighlight: function() {
    let { lastFocusElement } = OutsideModal;
    if (lastFocusElement) {
      lastFocusElement.classList.add('highlight');
    }
  },
  whileFadingOut: () => {
    let { lastFocusElement } = OutsideModal;
    if (lastFocusElement) {
      let clearFadeOut = () => lastFocusElement.classList.remove('highlight');
      setTimeout(clearFadeOut, HIGHLIGHT_DURATION);
    }
  },
};

export default function setupLightBoxModal() {
  let modal = $('.modal');

  function displayModal(imageSource, image) {
    let modalContent = $('#modal-content');

    let showContent = () => {
      modalContent.style.backgroundImage = `url(${imageSource})`;
      modal.classList.remove('transparent', 'invisible');
    };
    image.onload = showContent;
  }

  function hideModal() {
    OutsideModal.setupHighlight();

    modal.classList.add('transparent'); // start fade animation
    let setInvisible = () => modal.classList.add('invisible');
    setTimeout(setInvisible, MODAL_HIDE_TRANSPARENCY_DURATION);

    OutsideModal.whileFadingOut();
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

    OutsideModal.lastFocusElement = image;
  }

  modal.addEventListener('click', hideModal, false);

  return popupModal;
}
