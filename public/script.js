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
    else
        alert('Background not found: ' + name);
}

function showPoem(state) {
    let poem = document.querySelector('.poem');
    if (state)
        poem.removeAttribute('style');
    else
        poem.style.display = 'none';
}

// For better SEO, use <a href=""> when generating images

let imgs = document.querySelectorAll('.container img');
imgs.forEach(img => {
    img.addEventListener('click', (event) => {
        let img = event.target;
        let newSource = img.src.replace('/th', '');
        // location = newSource;
        window.open(newSource);
    }, false)
});

