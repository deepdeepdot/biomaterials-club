// @ts-check
let $ = (selector) => document.querySelector(selector);

function setColumnSize(size) {
  let style = document.documentElement.style;
  style.setProperty('--grid-columns', size);
}

function setBackground(name) {
  let mapping = {
    blue: 'blue-line-bg',
    gray: 'stairs-bg',
    green: 'plant-bg',
    black: 'dark-bg',
    gradient: 'gradient-bg',
  };
  if (name in mapping) {
    document.body.classList.value = mapping[name];
  } else {
    alert(`Background not found: ${name}`);
  }
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

  function displayModal(html) {
    modal.innerHTML = html;
    modal.classList.remove('transparent');
    modal.classList.remove('invisible');
  }

  function hideModal() {
    modal.classList.add('transparent'); // start fade animation
    let setInvisible = () => modal.classList.add('invisible');
    setTimeout(setInvisible, 650);
  }

  modal.addEventListener('click', hideModal, false);

  let popupModal = (event) => {
    let image = event.target;
    let newSource = image.src.replace('/th', '');
    let wide = image.width > image.height ? 'class="wide"' : '';
    displayModal(`<img ${wide} src="${newSource}">`);
  };

  let imgs = document.querySelectorAll('.main img');
  imgs.forEach((img) => {
    img.addEventListener('click', popupModal, false);
  });
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
