function TRACE(message, type) {
  let css = 'background-color: #ddd; color: black';
  switch (type) {
    case 'strong':
      css = 'background-color: red; color: yellow';
      break;
    case 'medium':
      css = 'background-color: yellow; color: black';
      break;
    case 's':
      css = 'background-color: purple; color: white';
      break;
    default:
  }
  css += '; padding: 10px; border-radius: 10px;';

  console.log('%c %s', css, message);
}

export default TRACE;
