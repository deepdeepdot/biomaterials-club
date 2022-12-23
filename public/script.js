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
    let poem = document.querySelector('.poem');
    let show = button.innerText.startsWith('Show');
    if (show) {
        poem.classList.add('fadeIn')
        button.innerText = 'Hide Poem';
    } else {
        poem.classList.remove('fadeIn');
        button.innerText = 'Show Poem'; 
    }
}

// For better SEO, use <a href=""> when generating images

let imgs = document.querySelectorAll('.container img');
imgs.forEach(img => {
    img.addEventListener('click', (event) => {
        let image = event.target;
        let newSource = image.src.replace('/th', '');
        // location = newSource;
        window.open(newSource);
    }, false)
});

let dashboard = document.querySelector('#dashboard');
dashboard.addEventListener('click', function() {
    let controls = document.querySelector('.controls');
    controls.classList.toggle('visible');
}, false);