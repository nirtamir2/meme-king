import _ from 'lodash'
import React, {Component} from 'react'
import axios from 'axios'

// config
import config from 'config/config'


// components
import Button from 'components/Button/Button'

// helpers
import helpers from 'helpers/helpers'

import menu from 'constants/menu'

import EditMemeArea from 'components/MemeAdminEditor/MemeAdminEditor'

export default class Admin extends Component {

    state = {
        memes: {}
    }

    componentDidMount = () => {
        document.getElementById('images').addEventListener('change', this.handleFileSelect, false)
        File.prototype.convertToBase64 = (callback) => {
            this.reader = new FileReader()
            this.reader.onloadend = function (e) {
                console.log(e.target.result)
                callback(e.target.result, e.target.error)
            }
        }
    }

    handleFileSelect = (event) => {
        const files = event.target.files
        const self = this// FileList object
        // Loop through the FileList and render image files as thumbnails.
        for (let i = 0, f; f = files[i]; i++) {
            // Only process image files.
            if (!f.type.match('image.*')) {
                continue
            }
            const reader = new FileReader()
            // Closure to capture the file information.
            reader.onload = (function (theFile) {
                return function (e) {
                    const meme = self.createMemeObj(e.target.result)
                    self.setState({ memes: { ...self.state.memes, [meme.id]: meme } })
                }
            })(f)
            reader.readAsDataURL(f)
        }
        this.input.value = ''

    }

    createMemeObj = (base64) => {
        return {
            urlPath: base64,
            id: helpers.uniqueId(),
            date: new Date()

        }
    }

    onSave = (id) => {
        axios({
            method: 'post',
            url: `${config.apiBaseUrl}/save-new-meme`,
            data: this.state.memes[id]
        });

    }

    onCategoryChange = (id, value) => {
        console.log(id,value)
            this.setState({ memes: {...this.state.memes, [id] : {...this.state.memes[id], category: value }} }, () => {
            console.log(this.state)
            })

    }


    render() {
        return (
            <div>
                <h1>
                    Admin
                </h1>
                <input ref={node => this.input = node} type="file" name="files[]" id="images" className="inputfile"
                       multiple/>
                <Button label={'upload'}
                        onClick={_.noop}
                        icon="glyphicon glyphicon-cloud-upload"
                        htmlFor="images"
                />
                {_.map(this.state.memes, meme => <EditMemeArea key={_.uniqueId()} onCategoryChange={this.onCategoryChange} onSave={this.onSave} {...meme} />)}
            </div>
        )
    }
}