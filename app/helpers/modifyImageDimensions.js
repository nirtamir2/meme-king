export default (picture, wantedMaxHeight, wantedMaxWidth, isNormalFormat) => {
    const isMobile = (window.innerWidth < 767);
    const SPACE_TO_RECUDE_FROM_CANVAS = isMobile ? 30 : 50;
    const container = document.querySelector('.generator__canvas-wrapper');
    const localWantedMaxWidth = (container.offsetWidth - SPACE_TO_RECUDE_FROM_CANVAS ) * (isNormalFormat ? 1 : 0.7);
    let maxWidth = wantedMaxWidth || (window.innerWidth > 767 ? localWantedMaxWidth : container.offsetWidth * 0.9); // Max width for the image
    let maxHeight = wantedMaxHeight || ( isMobile ? 270 : 500);    // Max height for the image
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
