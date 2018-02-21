import _ from 'lodash';

//helpers
import helpers from'helpers/helpers';
import colors from 'constants/colors';


export const addImageAsync = (image) => {
    return new Promise(resolve => {

        helpers.getDataUri(image, false, dataUri => {

            fabric.Image.fromURL(dataUri, (image) => {

                resolve(image);

            })

        })
    })
}

export const createCollage = ({ collageMemes, canvas, callback, addWaterMark }) => {

    const commonImageProperties = {
        hoverCursor: "default",
        lockMovementX: false,
        lockMovementY: false,
        lockScalingX: false,
        lockScalingY: false,
        lockUniScaling: false,
        hasBorders: true,
        selectable: true,
    }

    canvas.backgroundColor = colors.WHITE;

    const imagesPromises = _.map(collageMemes, meme => addImageAsync(meme.urlPath));

    Promise.all(imagesPromises).then(images => {

        _.forEach(images, image => {

            if(canvas.height < 10) {
                image = helpers.modifyImageDimensions({ image, wantedMaxHeight: helpers.isMobile() ? 180 : 300 })
                canvas.setWidth(image.width)
                canvas.setHeight(image.height);
                image.set({
                    top: 0,
                    ...commonImageProperties
                })
            } else {
                const currentCanvasHeight = canvas.height;
                image = helpers.modifyImageDimensions({ image, wantedMaxHeight: helpers.isMobile() ? 180 : 500, wantedMaxWidth: canvas.width })
                canvas.setHeight(_.parseInt(canvas.height) + _.parseInt(image.height));

                image.set({
                    top: _.parseInt(currentCanvasHeight),
                    ...commonImageProperties
                });

            }

            canvas.add(image);



            callback();
        })

        addWaterMark();

    });


}