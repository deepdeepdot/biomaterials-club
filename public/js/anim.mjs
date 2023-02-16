// Duration: 1000 to give us enough time to load a large image

// Thanks!
// https://stackoverflow.com/questions/23747172/css-transform-scale-overlaps-on-left-but-not-right

export let bounce = (
  img,
  options = {
    scale: 1.4,
    duration: 1000,
  }
) => {
  let initialBorder = img.style.borderColor;
  img.addEventListener('transitionend', () => {
    img.style['z-index'] = 0;
    img.style.transform = 'scale(1)';
    img.style.borderColor = initialBorder;
    img.style.filter = 'none';
  });
  img.style.position = 'relative';
  img.style['z-index'] = 2;
  img.style.borderColor = 'orange';
  img.style.transform = `scale(${options.scale})`;
  img.style.filter = 'contrast(200%)';
  img.style.transitionDuration = `${options.duration}ms`;
};
