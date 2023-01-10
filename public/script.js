// @ts-check
let $ = (selector) => document.querySelector(selector);

function setColumnSize(size) {
  let style = document.documentElement.style;
  style.setProperty('--grid-columns', size);
}

function setBackground(name) {
  document.body.classList.value = `${name}-bg`;
}

function togglePoem(button) {
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

alert('ok')

function setupLightBoxModal() {
  let modal = $('.modal');

  function displayModal(image) {
    let showContent = () => {
      modal.innerHTML = ''; // Remove all children
      modal.appendChild(image);
      modal.classList.remove('transparent');
      modal.classList.remove('invisible');
    };
    image.onload = showContent;
  }

  function hideModal() {
    modal.classList.add('transparent'); // start fade animation
    let setInvisible = () => modal.classList.add('invisible');
    setTimeout(setInvisible, 650);
  }

  function createLargeImage(src, isWide) {
    let largeImage = new Image();
    largeImage.src = src;
    if (isWide) {
      largeImage.classList.add('wide');
    }
    return largeImage;
  }

  function popupModal(event) {
    let image = event.target;
    let isWide = image.width > image.height;
    let largeImageSrc = image.src.replace('/th', '');
    let largeImage = createLargeImage(largeImageSrc, isWide);
    displayModal(largeImage);
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
