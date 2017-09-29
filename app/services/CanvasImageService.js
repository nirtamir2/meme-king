export const setHeightAndWidth = (picture, wantedMaxHeight, wantedMaxWidth)=> {
    const SPACE_TO_RECUDE_FROM_CANVAS = window.innerWidth < 767 ? 30 : 50;
    const container = document.querySelector('.generator__canvas-wrapper');
    let maxWidth = wantedMaxWidth || container.offsetWidth - SPACE_TO_RECUDE_FROM_CANVAS; // Max width for the image
    let maxHeight = wantedMaxHeight || 500;    // Max height for the image
    let ratio = 0;  // Used for aspect ratio


    //handles the case of really small images - this will make the image in the size of the canvas.
    if(picture.width < maxWidth){
        let ratio = maxWidth / picture.width;
        picture.width  = maxWidth;
        picture.height = picture.height  * ratio;
    }
    // Check if the current width is larger than the max

    if (picture.width > maxWidth) {
        ratio = maxWidth / picture.width;   // get ratio for scaling image
        picture.width = maxWidth; // Set new width
        picture.height = picture.height * ratio; // Scale height based on ratio
    }

    // Check if current height is larger than max
    if (picture.height > maxHeight) {
        ratio = maxHeight / picture.height; // get ratio for scaling image
        picture.height = maxHeight  // Set new height
        picture.width = picture.width * ratio    // Scale width based on ratio

    }
    return picture;
};

export const setImageSizeDankFormat = (picture)=> {
    let canvas_wrapper = document.querySelector(".generator__canvas-wrapper");
    let maxWidth;
    let maxHeight;
    if (window.innerWidth < 700) {
        maxWidth = canvas_wrapper.offsetWidth * 0.94 - 30; // Max width for the image
        maxHeight = 400;    // Max height for the image
        picture.top = 90;
        picture.left = 15;
    } else {
        maxWidth = canvas_wrapper.offsetWidth * 0.94 - 170; // Max width for the image
        maxHeight = 300;    // Max height for the image
        picture.top = 140;
        picture.left = 10;

    }
    let ratio = 0;  // Used for aspect ratio
    // Check if the current width is larger than the max
    if (picture.width > maxWidth) {
        ratio = maxWidth / picture.width;   // get ratio for scaling image
        picture.width = maxWidth; // Set new width
        picture.height = picture.height * ratio; // Scale height based on ratio
    }

    // Check if current height is larger than max
    if (picture.height > maxHeight) {
        ratio = maxHeight / picture.height; // get ratio for scaling image
        picture.height = maxHeight  // Set new height
        picture.width = picture.width * ratio    // Scale width based on ratio

    }
    return picture;
};
