import _ from 'lodash'
import React, {Component} from 'react'
import { connect } from 'react-redux'

import { fetchCategory } from 'actions/data-actions/data-actions';

// components
import Button from 'components/Button/Button'

// helpers
import helpers from 'helpers/helpers'

import menu from 'constants/menu'

import EditMemeArea from 'components/MemeAdminEditor/MemeAdminEditor';

const LoginArea = ({ onChange, value, onSubmit }) => {
    return(
        <form onSubmit={onSubmit} className="login-area">
            <input type="password" value={value}  onChange={onChange}/>
            <Button className="login-btn" onClick={onSubmit} label="Login" />
        </form>
    )
}

 class Admin extends Component {

    state = {
        memes: {},
        editMode: false,
        category: {},
        anigma : ''
    }

    componentDidMount = () => {

    }

    bindUploadEvents() {
        document.getElementById('images').addEventListener('change', this.handleFileSelect, false)
        File.prototype.convertToBase64 = (callback) => {
            this.reader = new FileReader()
            this.reader.onloadend = function (e) {
                callback(e.target.result, e.target.error)
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.category !== nextProps.category) {
            this.setState({ category: nextProps.category })
        }


    }


    getThumbnail(urlPath) {
        return new Promise(resolve => {
            const canvas = document.createElement('CANVAS');
            const context = canvas.getContext("2d");
            const img = new Image();
            img.onload = function() {
                const scale = 0.5;
                img.width = parseInt(img.width) * scale;
                img.height = parseInt(img.height) * scale

                canvas.height = parseInt(img.height) * scale;
                canvas.width = parseInt(img.width) * scale;
                context.drawImage(img, 0, 0, parseInt(img.width) * scale, parseInt(img.height) * scale);

                resolve(canvas.toDataURL("image/jpeg"))
            }
            img.src = urlPath;
        })



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
                return async function (e) {
                    const meme = await self.createMemeObj(e.target.result)
                    self.setState({ memes: { ...self.state.memes, [meme.id]: meme } , editMode: false })
                }
            })(f)
            reader.readAsDataURL(f)
        }
        this.input.value = ''

    }

    async createMemeObj(base64) {
        const thumb = await this.getThumbnail(base64);
        return {
            urlPath: base64,
            id: helpers.uniqueId(),
            date: new Date(),
            thumbPath : thumb
        }
    }

     onDelete = (id) => {
        const memes = {...this.state.category};
        delete memes[id];
        this.setState({ memes : memes  })
     }


    onCategoryChange = event => {
        this.setState({ editMode: true, category: event.target.value })
        this.props.fetchCategory(event.target.value)
    }

     onSubmit = () => {
        if(this.state.anigma === '~memeking07') {
            this.setState({ isAuthenticated: true }, () => {
                this.bindUploadEvents();
            })
        }
     }


    render() {


        if(!this.state.isAuthenticated) {
            return <LoginArea value={this.state.anigma} onSubmit={this.onSubmit} onChange={event => this.setState({ anigma: event.target.value })} />
        }

        return (
            <div className="box-admin container">
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
                <h4> or edit an existing meme:</h4>
                <select value={this.state.category} onChange={this.onCategoryChange}>
                    {_.map(menu, (value, prop) => {
                        return <option key={_.uniqueId()}>{prop}</option>
                    })}
                </select>

                {!this.state.editMode && _.map(this.state.memes, meme => <EditMemeArea
                                                    editMode={this.state.editMode}
                                                    key={_.uniqueId()}
                                                    onDelete={this.onDelete}
                                                    meme={meme} />)}

                {this.state.editMode && _.map(this.state.category, meme => <EditMemeArea
                                                        editMode={this.state.editMode}
                                                        key={_.uniqueId()}
                                                        onDelete={this.onDelete}
                                                        meme={meme} />)}

            </div>
        )
    }
}


function mapStateToProps(state, ownProps) {

    const { match: { params }, location, history } = ownProps;


    return {
      category: state.category.memes
    }
}

function mapDispatchToProps(dispatch) {

    return {
        fetchCategory: (category) => dispatch(fetchCategory(category)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)