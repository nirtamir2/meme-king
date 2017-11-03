import React, { Component } from 'react';

// helpers
import helpers from 'helpers/helpers';

// components
import GeneratorDashboardButton from 'components/GeneratorDashboardButton/GeneratorDashboardButton';

export default class GeneratorUploader extends Component {

    componentDidMount(){
        document.getElementById('generator-uploader').addEventListener('change', this.handleFileSelect, false);
    };


    handleFileSelect = (event)=>{
        const self = this;
        const files = event.target.files; // FileList object
        // Loop through the FileList and render image files as thumbnails.
        for (let i = 0, f; f = files[i]; i++) {
            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }
            const reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = (function (theFile) {
                return function (e) {
                    // Render thumbnail.
                    self.addImageToCanvas(e.target.result)
                };
            })(f);
            reader.readAsDataURL(f);
        }

        this.input.value = '';

    };

    addImageToCanvas = (item) => {
        const { canvas } = this.props;
        const randomX = (Math.floor(Math.random() * canvas.width) + 1) /2;
        const randomY = (Math.floor(Math.random() * canvas.height) + 1) / 2;
        fabric.Image.fromURL(item, function (image) {
            image = helpers.modifyImageDimensions(image, 100);
            image.left = randomX
            image.top = randomY;
            canvas.add(image);
            image.set({hoverCursor: "default"});
            image.lockMovementX = false;
            image.lockMovementY = false;
            image.hasBorders = true;
            image.selectable = true;
            canvas.bringForward(image);

        });
    };

    render(){
        const UPLOAD_TEXT =  "תמונות";

        return (
            <div className="generator-uploader-wrapper">
                <input ref={node => this.input = node} type="file" name="files[]" id="generator-uploader" className="inputfile" multiple/>
                <GeneratorDashboardButton
                    label={UPLOAD_TEXT}
                    wrapWithLabel
                    isWaiting={this.props.isWaiting}
                    icon="PICTURE"
                    htmlFor="generator-uploader"
                />
            </div>
        );
    }
}

