import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchCategory } from 'actions/category-actions/category-actions'

// components
import Button from 'components/Button/Button'
import Title from 'components/Title/Title';
import EditMemeArea from 'components/Admin/MemeAdminEditor/MemeAdminEditor'
import Dropzone from 'components/DropZone/DropZone';

// helpers
import helpers from 'helpers/helpers'
import { blobToString } from 'containers/Generator/generator-helpers';

import menu from 'constants/menu'


// constants
import constants from 'constants/global'

const LoginArea = ({ onChange, value, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="login-area">
            <input type="password" value={value} onChange={onChange}/>
            <Button center className="login-btn" onClick={onSubmit} >
                Login
            </Button>
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

    handleFileSelect = async (selectedFiles) => {
        const promisesToBase64 = _.map(selectedFiles,file => blobToString({ blob: file }) );

        Promise.all(promisesToBase64).then(images => {
            const promises = _.map(images, image => this.createMemeObj(image));

            Promise.all(promises).then(memes => {
                _.forEach(memes, meme => {
                    this.setState({
                        memes: { ...this.state.memes, [meme.id]: meme },
                        editMode: false,
                        userMemes: false
                    })
                })
            })

        })

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
            })
        } else if (this.state.anigma === 'admin1234') {
            this.setState({ isAuthenticated: true }, () => {
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
                        <Button
                            onDrop={this.handleFileSelect}
                            size="sm"
                            componentClass={Dropzone}
                            center
                            multiple
                        >
                            upload
                        </Button>
                        <h6 className="text-center" onClick={() => this.setState({ memes: {} })}>clear meme editors</h6>
                    </div>
                    {isSuperAdmin && (
                        <div>
                            <Button
                                onClick={this.getPersonalMessages}
                                size="sm"
                                center
                            >
                                personal messages
                            </Button>
                            <h6 className="text-center" onClick={this.clearPersonalMessages}> clear personal messages</h6>

                        </div>
                    )}

                    {isSuperAdmin && (
                        <div>
                            <Button
                                onClick={this.getUserMemes}
                                size="sm"
                                center
                            >
                                user memes
                            </Button>
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


function mapStateToProps(state) {

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