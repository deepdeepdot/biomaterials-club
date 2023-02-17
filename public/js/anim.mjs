// Duration: 1000 to give us enough time to load a large image

// Thanks!
// https://stackoverflow.com/questions/23747172/css-transform-scale-overlaps-on-left-but-not-right

export function reset(img, borderColor) {
  img.style['z-index'] = 0;
  img.style.transform = 'scale(1)';
  img.style.borderColor = borderColor || 'rgba(0, 0, 0, 0)';
  img.style.filter = 'none';
}

// Chrome on iphone 13 did not like any of this, most others were ok
export let bounce = (
  img,
  options = {
    scale: 1.4,
    duration: 1000, // superfast: 200, mobile: 1000
  }
) => {
  let initialBorder = img.style.borderColor;
  // img.addEventListener('transitionend', () => {
  //   reset(img, initialBorder);
  // });
  // img.style.position = 'relative';
  // img.style['z-index'] = 2;
  // img.style.borderColor = 'orange';
  // img.style.transform = `scale(${options.scale})`;
  // img.style.filter = 'contrast(200%)';
  // img.style.transitionDuration = `${options.duration}ms`;

  img.classList.add('bounce');
  img.addEventListener('animationend', () => {
    // img.classList.remove('bounce'); // to re-enable animation?
    // reset(img, initialBorder);

    // stronger reset() to default styles
    img.removeAttribute('class');
  });

};
