// @ts-check

// ---------------- LightBox Modal

let $ = (selector) => document.querySelector(selector);

let ModalContent = {
  lastFocusElement: null,
  fadeOut: () => {
    let { lastFocusElement } = ModalContent;
    if (lastFocusElement) {
      lastFocusElement.classList.add('fadeOut');
      let clearFadeOut = () => lastFocusElement.classList.remove('fadeOut');
      setTimeout(clearFadeOut, 300);
    }
  },
};

export default function setupLightBoxModal() {
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

  modal.addEventListener('click', hideModal, false);

  return popupModal;
}
