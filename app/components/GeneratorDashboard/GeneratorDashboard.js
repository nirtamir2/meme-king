import _ from 'lodash'
import React, { Component } from 'react'
import classNames from 'classnames'
import config from 'config/config';

// components
import Button from '../GeneratorDashboardButton/GeneratorDashboardButton'
import ItemsArea from '../ItemsArea/ItemsArea'
import GeneratorUploader from '../GeneratorUploader/GeneratorUploader'
import TextFieldsContainer from 'components/TextFieldsContainer/TextFieldsContainer'
import GeneratorSignature from 'components/GeneratorSignature/GeneratorSignature'
import Modal from 'components/Modal/Modal'
import MemeSuggestions from 'containers/MemeSuggestionsContainer/MemeSuggestionsContainer';

// services
import LocalStorageService from 'services/LocalStorage'
import AnalyticsService from 'services/Analytics'
import WebViewService from 'services/webViewService';

// helpers
import helpers from 'helpers/helpers'

// constants
import globalConstants from 'constants/global'

export default class GeneratorDashboard extends Component {

    state = {
        isItemsAreaOpen: false,
    }

    toggleItemsArea = () => {
        this.setState({ isItemsAreaOpen: !this.state.isItemsAreaOpen })
    }

    download = (clickedElement) => {
        const { canvas, saveUserMemeToStorage, format, meme, isCollageMode } = this.props

        helpers.sendDownloadedMemeAnalyticsEvent({ format, meme });

        this.updateMemeRating();

        canvas.deactivateAll().renderAll()

        //saveing the canvas and resizing it before downloading depends on screen resolution.
        const zoom = helpers.isMobile() ? 2.5 : 1.3

        canvas.setZoom(zoom);
        // need to enlarge canvas otherwise the svg will be clipped
        canvas.setWidth(canvas.getWidth() * zoom).setHeight(canvas.getHeight() * zoom)

        const memeData = {
            urlPath: canvas.toDataURL(),
            date: new Date(),
            isMobile: helpers.isMobile(),
            isMobileApp : WebViewService.isWebView,
            isDesktop: !helpers.isMobile()
        }

        if (WebViewService.isWebView) {
            this.sendBase64ToNative(canvas.toDataURL())
            //!* need to set back canvas dimensions *
            canvas.setWidth(canvas.getWidth() / zoom).setHeight(canvas.getHeight() / zoom)
            canvas.setZoom(1);
            helpers.sendDownloadedMemeAnalyticsEvent({ isMobileApp: true, format, meme, isCollageMode });
            saveUserMemeToStorage(memeData)
            return;
        }

        clickedElement.href = canvas.toDataURL()
        clickedElement.download = 'MemeKing'


        this.props.saveUserMemeToStorage(memeData)

        //!* need to set back canvas dimensions *
        canvas.setWidth(canvas.getWidth() / zoom).setHeight(canvas.getHeight() / zoom)
        canvas.setZoom(1);

    }

    sendBase64ToNative = (base64) => {
        window.postMessage(base64)
    }


    updateMemeRating = () => {
        if (!(this.props.type === 'upload')) {
            this.props.updateMemeRating(this.props.meme)
        }
    }

    addTextLine = () => {
        this.TextFieldsContainer.addTextInput()
    }

    sendImageToCropper = () => {
        AnalyticsService.sendEvent('Cropping from inside Generator')
        this.props.history.push({ pathname: '/cropper', state:  {image: _.get(this.props, 'meme.urlPath') }})
    }

    changeFormat = () => {

        const { history, format, location, type, meme, query } = this.props
        const wantedFormat = (format === globalConstants.format.normal) ? globalConstants.format.dank : globalConstants.format.normal
        const wantedPath = location.pathname.replace(format, wantedFormat)
        const from = _.get(location, 'state.from')

        if (from === 'search') {

            const location = {
                pathname: wantedPath,
                state: {
                    urlPath: meme.urlPath,
                    from: 'search'
                },
                query
            }

            history.push(location);


        } else if (type === 'upload' || from === 'upload') {

            const location = {
                pathname: wantedPath,
                state: {
                    urlPath: meme.urlPath,
                    from: 'upload'
                },
                query
            }

            history.push(location);

        } else {

            history.push(wantedPath)

        }
    }

    render() {

        const { format, canvas, isCanvasReady, style, isCleanSlateState, isFromUpload, isStandAlone, isFromSearch, currentMemeCategory, suggestions } = this.props
        const FORMAT_BUTTON_TEXT = format === globalConstants.format.normal ? ' דאנק מימ' : " רגיל"
        const ADD_TEXT_LINE = "טקסט"
        const ADD_AN_ITEM = "פריטים"
        const DOWNLOAD = "הורדה"

        const buttonsStyle = style ? { top: (parseInt(_.head(_.split(style.top, 'px'))) + 15) + 'px' } : {}

        const Buttons = ({ className }) => (
            <div className={classNames("buttons-container", className)} style={buttonsStyle}>
                <Button
                    label={ADD_TEXT_LINE}
                    icon="PLUS"
                    onClick={this.addTextLine}
                />

                {!isCleanSlateState && (
                <Button label="חיתוך התמונה"
                        icon="SCISSORS"
                        onClick={this.sendImageToCropper}/>
                )}

                <GeneratorUploader canvas={canvas}/>

                <Button label={ADD_AN_ITEM} icon="SUNGLASSES"
                        onClick={this.toggleItemsArea}
                />

                {!isCleanSlateState && (
                    <Button label={FORMAT_BUTTON_TEXT}
                        onClick={this.changeFormat}
                        icon="RETWEET"
                />)}

                <Button label={DOWNLOAD}
                        icon="DOWNLOAD"
                        onClick={this.download}
                />

            </div>
        )

        return (
            <div style={style} className="box-generator-dashboard col-sm-12 col-lg-5">

                {helpers.isMobile() && <Buttons />}

                {isCanvasReady && (
                    <TextFieldsContainer ref={ elem => this.TextFieldsContainer = elem}
                                         canvas={canvas}
                                         format={format}
                    />
                )}

                {!helpers.isMobile() && <Buttons />}
                {(isCanvasReady && helpers.isMobile() && !isFromSearch && !isStandAlone && !isFromUpload && !isCleanSlateState) && config.features.memeSuggestions &&
                <MemeSuggestions  category={currentMemeCategory} suggestions={suggestions}  />}

                <GeneratorSignature className="visible-mobile"/>

                <Modal onHide={() => this.setState({ isItemsAreaOpen: false })}
                       show={this.state.isItemsAreaOpen && canvas}>
                    <ItemsArea canvas={canvas} closeModal={() => this.setState({ isItemsAreaOpen: false })}/>
                </Modal>

            </div>
        )
    }
}

