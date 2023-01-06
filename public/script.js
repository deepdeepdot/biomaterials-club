function $(sel) {
  return document.querySelector(sel);
}

function setColumnSize(size) {
    let style = document.documentElement.style;
    style.setProperty('--grid-columns', size);
}

function setBackground(name) {
    if (name == 'green')
        document.body.classList = 'plant-bg';
    else if (name == 'blue')
        document.body.classList = 'blue-line-bg';
    else if (name == 'gray')
        document.body.classList = 'stairs-bg';
    else if (name == 'black')
        document.body.classList = 'dark-bg';
    else
        alert('Background not found: ' + name);
}

function togglePoem(button) {
    let poem = $('.poem.anim');
    let show = button.innerText.startsWith('Show');
    if (show) {
        poem.classList.add('fadeIn')
        button.innerText = 'Hide Poem';
    } else {
        poem.classList.remove('fadeIn');
        button.innerText = 'Show Poem'; 
    }
}

let frame = $('.detailed-frame');

function displayFrame() {
  frame.classList.remove('bye');
  frame.removeAttribute('style');
}

function hideFrame() {
  frame.classList.add('bye');
  setTimeout(() => {
    frame.style.display = 'none';
  }, 600);
}

// For better SEO, use <a href=""> when generating images
let imgs = document.querySelectorAll('.container img');
imgs.forEach(img => {
    img.addEventListener('click', (event) => {
      let image = event.target;
      let newSource = image.src.replace('/th', '');
      frame.innerHTML = `<img src="${newSource}">`;
      displayFrame();
    }, false)
});

frame.addEventListener('click', hideFrame, false);


let dashboard = $('#dashboard');
dashboard.addEventListener('click', function() {
    let controls = $('.controls');
    controls.classList.toggle('visible');

    let visible = controls.classList.contains('visible');
    if (visible) {
        dashboard.innerText = 'Go Less Bananas!';
    } else {
        dashboard.innerText = 'Go Bananas!';
    }
}, false);
