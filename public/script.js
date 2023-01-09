let $ = (selector) => document.querySelector(selector);

function setColumnSize(size) {
  let style = document.documentElement.style;
  style.setProperty('--grid-columns', size);
}

function setBackground(name) {
  if (name === 'green') document.body.classList = 'plant-bg';
  else if (name === 'blue') document.body.classList = 'blue-line-bg';
  else if (name === 'gray') document.body.classList = 'stairs-bg';
  else if (name === 'black') document.body.classList = 'dark-bg';
  else alert(`Background not found: ${name}`);
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
