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
  let showing = button.innerText.startsWith('Show');
  if (showing) {
    poem.classList.add('fadeIn');
    button.innerText = 'Hide Poem';
  } else {
    poem.classList.remove('fadeIn');
    button.innerText = 'Show Poem';
  }
}

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

  function popupModal(event) {
    let image = event.target;
    let largeImage = new Image();
    largeImage.src = image.src.replace('/th', '');

    let isWide = image.width > image.height;
    if (isWide) {
      image.classList.add('wide');
    }
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
