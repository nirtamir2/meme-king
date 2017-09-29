

export default (position, canvas, initialFontSize) => {

    switch(position) {
        case 'top': {
            return 0.05 * canvas.height;
            break;
        }

        case 'middle': {
            return canvas.height / 2;
            break;
        }

        case 'bottom': {
            return (canvas.height - parseInt(initialFontSize) * 2.2);
            break;
        }
    }
}