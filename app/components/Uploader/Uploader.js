
import _ from 'lodash';
import React, { Component } from 'react';

//  services
import AnalyticsService from 'services/Analytics';

// components
import Button from 'components/Button/Button';

export default class Uploader extends Component {

    componentDidMount = ()=>{
        document.getElementById('files').addEventListener('change', this.handleFileSelect, false);
    };

    handleFileSelect = (event) => {
        const files = event.target.files;
        const self = this;// FileList object
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
                       self.handleImage(e.target.result)
                    };
                })(f);
            reader.readAsDataURL(f);
        }

        this.input.value = '';

        document.querySelector(".cover").style.display = 'block';
        AnalyticsService.sendEvent('upload');

    };

    handleImage = (image) => {
        const location = {
            pathname: '/cropper',
            state : {
                image,
            }
        }
        this.props.history.push(location)
    }

    render(){

        const UPLOADER_TEXT =  "העלאת תמונה" ;

        return (
            <div>

                <div>

                    <input ref={node => this.input = node} type="file" name="files[]" id="files" className="inputfile" multiple/>
                    <Button label={UPLOADER_TEXT}
                            onClick={_.noop}
                            icon="glyphicon glyphicon-cloud-upload"
                            htmlFor="files"
                    />
                </div>
            </div>
        );
    }
}





