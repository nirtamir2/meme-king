import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchCategory } from 'actions/category-actions/category-actions'

// components
import Button from 'components/Button/Button'
import Title from 'components/Title/Title';

// helpers
import helpers from 'helpers/helpers'

import menu from 'constants/menu'

import EditMemeArea from 'components/MemeAdminEditor/MemeAdminEditor'

// constants
import constants from 'constants/global'

const LoginArea = ({ onChange, value, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="login-area">
            <input type="password" value={value} onChange={onChange}/>
            <Button center className="login-btn" onClick={onSubmit} label="Login"/>
        </form>
    )
}

class Admin extends Component {

    state = {
        memes: {},
        editMode: false,
        category: {},
        anigma: '',
        userMemes: {},
        filter: 'none'
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
        if (this.props.category !== nextProps.category) {
            this.setState({ category: nextProps.category })
        }


    }


    getThumbnail(urlPath) {
        return new Promise(resolve => {
            const canvas = document.createElement('CANVAS')
            const context = canvas.getContext("2d")
            const img = new Image()
            img.onload = function () {
                const scale = 0.5
                img.width = parseInt(img.width) * scale
                img.height = parseInt(img.height) * scale

                canvas.height = parseInt(img.height) * scale
                canvas.width = parseInt(img.width) * scale
                context.drawImage(img, 0, 0, parseInt(img.width) * scale, parseInt(img.height) * scale)

                resolve(canvas.toDataURL("image/jpeg"))
            }
            img.src = urlPath
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
                    self.setState({
                        memes: { ...self.state.memes, [meme.id]: meme },
                        editMode: false,
                        userMemes: false
                    })
                }
            })(f)
            reader.readAsDataURL(f)
        }
        this.input.value = ''

    }

    async createMemeObj(base64) {
        const thumb = await this.getThumbnail(base64)
        return {
            urlPath: base64,
            id: helpers.uniqueId(),
            date: new Date(),
            thumbPath: thumb
        }
    }

    onDelete = (id) => {
        const memes = { ...this.state.category }
        delete memes[id]
        this.setState({ category: memes })
    }


    onCategoryChange = event => {
        this.setState({ editMode: true, category: event.target.value, userMemes: {} })
        this.props.fetchCategory(event.target.value)
    }

    onSubmit = () => {
        if (this.state.anigma === '~memeking07') {
            this.setState({ isAuthenticated: true, isSuperAdmin: true }, () => {
                this.bindUploadEvents()
            })
        } else if (this.state.anigma === 'admin1234') {
            this.setState({ isAuthenticated: true }, () => {
                this.bindUploadEvents()
            })
        }
    }

    getUserMemes = () => {

        window.firebase.database().ref(`/${constants.database.userSavedMemesTable}`).once('value')
            .then(snapshot => {
                this.setState({ userMemes: snapshot.val() })
            })
    }

    clearUserMemes = () => {
        window.firebase.database().ref(`/${constants.database.userSavedMemesTable}`).remove()
        this.setState({ userMemes: {} })

    }

    getPersonalMessages = () => {

        window.firebase.database().ref(`/${constants.database.personalMessageTable}`).once('value')
            .then(snapshot => {
                this.setState({ personalMessages: snapshot.val() })
            })
    }

    clearPersonalMessages = () => {
        window.firebase.database().ref(`/${constants.database.personalMessageTable}`).remove()
        this.setState({ personalMessages: {} })
    }

    onFilterChange = (event) => {

        const value = _.get(event, 'target.value');
        this.setState({ filter: value });
    }


    render() {

        const { isSuperAdmin, isAuthenticated } = this.state;

        if (!isAuthenticated) {
            return <LoginArea value={this.state.anigma} onSubmit={this.onSubmit}
                              onChange={event => this.setState({ anigma: event.target.value })}/>
        }

        const filteredUserMemes = _.pickBy(this.state.userMemes, meme => this.state.filter === 'none' || !!_.get(meme, this.state.filter));
        const categories = { 'select category': {title : 'Select Category'}, ...menu};
        const shouldShowCategorySection = (this.state.editMode)

        return (
            <div className="box-admin container">
                <h1>
                    Admin
                </h1>

                <div className="flex space-between dashboard">
                    <div>
                        <input ref={node => this.input = node} type="file" name="files[]" id="images" className="inputfile"
                               multiple/>
                        <Button label={'upload'}
                                onClick={_.noop}
                                icon="UPLOAD"
                                htmlFor="images"
                                size="sm"
                                center
                        />
                        <h6 className="text-center" onClick={() => this.setState({ memes: {} })}>clear meme editors</h6>
                    </div>
                    {isSuperAdmin && (
                        <div>
                            <Button label={'personal messages'}
                                    onClick={this.getPersonalMessages}
                                    icon="CHAT"
                                    size="sm"
                                    center
                            />
                            <h6 className="text-center" onClick={this.clearPersonalMessages}> clear personal messages</h6>

                        </div>
                    )}

                    {isSuperAdmin && (
                        <div>
                            <Button label={'user memes'}
                                    onClick={this.getUserMemes}
                                    icon="glyphicon glyphicon-user"
                                    size="sm"
                                    center
                            />
                            <h6 className="text-center" onClick={this.clearUserMemes}> clear user memes </h6>
                        </div>
                    )}
                    {isSuperAdmin && (
                        <div>
                            <select value={this.state.category} onChange={this.onCategoryChange}>
                                {_.map(categories, (value, prop) => {
                                    return <option key={_.uniqueId()}>{prop}</option>
                                })}
                            </select>
                        </div>
                    )}

                    {isSuperAdmin && (
                        <div>
                            <select onChange={this.onFilterChange}>
                                <option value="none">see all</option>
                                <option value="isMobile">Mobile device</option>
                                <option value="isMobileApp">iOS mobile app</option>
                                <option value="isDesktop"> Desktop</option>
                            </select>
                            <h4> filter memes by device</h4>
                        </div>
                    )}


                </div>

                {!_.isEmpty(filteredUserMemes) && <Title>({_.size(filteredUserMemes)})</Title>}
                {filteredUserMemes && _.map(filteredUserMemes, meme => {
                    console.log(meme)
                    return (
                        <div key={meme.id} className="box-user-meme margin-top-medium">
                            <img src={meme.urlPath}/>
                            <div className="margin-top-medium">
                                {meme.isMobile && <p>Mobile Device</p>}
                                {meme.isDesktop && <p>Desktop</p>}
                                {meme.isMobileApp && <p>iOS Mobile App</p>}
                            </div>
                            <p>Date : {new Date(meme.date) && new Date(meme.date).toDateString()}</p>
                        </div>
                    )
                })}

                {!this.state.editMode && _.map(this.state.memes, meme => <EditMemeArea
                    editMode={this.state.editMode}
                    key={_.uniqueId()}
                    onDelete={this.onDelete}
                    meme={meme}/>)}

                {this.state.personalMessages && _.map(this.state.personalMessages, data => {
                    return (
                        <div className="box-personal-messages">
                            <h3>שם</h3>
                            <p> {data.name}</p>
                            <h3>אי מייל</h3>
                            <p>{data.email}</p>
                            <h3>הודעה</h3>
                            <p> {data.message}</p>
                        </div>
                    )
                })}

                {(shouldShowCategorySection) && _.map(this.state.category, meme => <EditMemeArea
                    editMode={this.state.editMode}
                    key={_.uniqueId()}
                    isUserMemesState={this.state.isUserMemesState}
                    onDelete={this.onDelete}
                    meme={meme}/>)}

            </div>
        )
    }
}


function mapStateToProps(state, ownProps) {

    const { match: { params }, location, history } = ownProps


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