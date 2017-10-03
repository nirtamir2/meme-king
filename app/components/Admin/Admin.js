import _ from 'lodash';
import React, { Component } from 'react';

// components
import Button from 'components/Button/Button';

// helpers
import helpers from 'helpers/helpers';

export default class Admin extends Component  {

    state = {
        memes: []
    }

    componentDidMount = () => {
        document.getElementById('images').addEventListener('change', this.handleFileSelect, false);
        File.prototype.convertToBase64 = function(callback){
            this.reader = new FileReader();
            this.reader.onloadend = function (e) {
                callback(e.target.result, e.target.error);
            };
        };
    };

    handleFileSelect = (event) => {
        const files = event.target.files;
        for (let i = 0, f; f = files[i]; i++) {
            // Only process image files.
            if (!f.type.match('image.*')) {
                continue;
            }
            f.convertToBase64((base64) => {
                console.log(typeof base64, 'inside convert');
                const memeObj = this.createMemeObj(base64);
                this.setState({ memes: [base64, ...self.state.memes]})
            });
        }

        this.input.value = '';

    };

    createMemeObj = (base64) => {
        return {
            urlPath : base64,
            id : helpers.uniqueId(),

        }
    }


    render() {
        return(
            <div>
                <h1>
                    Admin
                </h1>
                <input ref={node => this.input = node} type="file" name="files[]" id="images" className="inputfile" multiple/>
                <Button label={'upload'}
                        onClick={_.noop}
                        icon="glyphicon glyphicon-cloud-upload"
                        htmlFor="images"
                />
                {_.map(this.state.memes, meme => <img src={meme} />)}
            </div>
        )
    }
}