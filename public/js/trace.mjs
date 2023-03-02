function TRACE(message, type) {
    let css = 'background-color: #ddd; color: black';
    if (type == 'strong') {
        css = 'background-color: red; color: yellow';
    } else if (type == 'medium') {
        css = 'background-color: yellow; color: black';
    } else if (type == 's') {
        css = 'background-color: purple; color: white';
    }
    css += '; padding: 10px; border-radius: 10px;';

    console.log('%c %s', css, message);
}

export default TRACE;
