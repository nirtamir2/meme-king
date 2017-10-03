import _ from 'lodash'
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

// components
import GeneratorDashboard from 'components/GeneratorDashboard/GeneratorDashboard';
import PopupCover from 'components/PopupCover/PopupCover';

// helpers
import {setHeightAndWidth, setImageSizeDankFormat} from 'services/CanvasImageService'
import helpers from 'helpers/helpers'

// constants
import colors from 'constants/colors'
import globalConstants from 'constants/global'

// actions
import { updateMemeRating } from 'actions/meme-actions/meme-actions';

// assets
import watemarkDesktop from 'assets/images/watermark-desktop.jpg';
import watermarkMobile from 'assets/images/watermark-mobile.jpg';

function getDataUri(url, isFromUpload, callback) {

    if (isFromUpload) {
        callback(url)
    }

    const image = new Image();

    image.onload = function () {
        const canvas = document.createElement('canvas')
        canvas.width = this.naturalWidth // or 'width' if you want a special/scaled size
        canvas.height = this.naturalHeight // or 'height' if you want a special/scaled size

        canvas.getContext('2d').drawImage(this, 0, 0)

        callback(canvas.toDataURL('image/png'))
    }

    image.crossOrigin = ''
    image.src = url + '?123'
}


class Generator extends Component {

    state = {
        isLoading: true,
        canvas: null,
        isCanvasReady: false,
    }

    componentWillMount() {
      //  document.querySelector(".cover").style.display = 'block';
    }

    componentWillUnmount() {
      //  document.querySelector(".cover").style.display = 'none'

    }

    componentDidMount() {
        const canvas = new fabric.Canvas('c', { allowTouchScrolling: true })

        this.setState({ canvas }, () => {
            this.createBoard(this.props.format)
        })
    }

    componentWillReceiveProps(nextProps) {

        if ((this.props.format !== nextProps.format) || (this.props.meme !== nextProps.meme)) {
            this.setState({ isCanvasReady: false }, () => {
                this.createBoard(nextProps.format)
            })
        }
    }

    createBoard = (wantedFormat) => {
        if (this.props.type === 'clean-slate') {
            this.createCleanSlate()
        } else {
            if (this.state.canvas) {
                this.addImage(wantedFormat)
            }
        }
    }

    createCleanSlate = () => {
        this.setState({ isLoading: false, isCanvasReady: true })
        const { canvas } = this.state
        const DISTANCE = helpers.isMobile() ? 30 : 140
        const width = document.querySelector('.generator__canvas-wrapper').offsetWidth - DISTANCE
        const height = helpers.isMobile() ? 260 : 430
        canvas.backgroundColor = colors.WHITE
        canvas.setWidth(width)
        canvas.setHeight(height)
    }

    addImage = (format) => {
        const { urlPath } = this.props.meme || {}
        const { canvas } = this.state
        const isNormalFormat = (format === globalConstants.format.normal)
        const isFromUpload = (this.props.type === 'upload')
        const spaceToADDForDankFormatStyle = helpers.isMobile() ? 100 : 150
        const canvasContainerWidth = document.querySelector('.generator__canvas-wrapper').offsetWidth - 30

        const MOBILE_DANK_CANVAS_SIZE = helpers.isMobile() ? canvasContainerWidth : 400

        canvas.backgroundColor = colors.GRAY_LIGHT
        canvas.setWidth(canvasContainerWidth);
        canvas.clear()


        getDataUri(urlPath, isFromUpload, (dataUri) => {
            fabric.Image.fromURL(dataUri, image => {

                this.setState({ isLoading: false });

                image = isNormalFormat ? setHeightAndWidth(image) : setImageSizeDankFormat(image);

                canvas.setHeight(isNormalFormat ? image.height : image.height + spaceToADDForDankFormatStyle);
                canvas.setWidth(isNormalFormat ? image.width : MOBILE_DANK_CANVAS_SIZE);
                canvas.backgroundColor = colors.WHITE;
                canvas.add(image)

                image.set({
                    hoverCursor: "default",
                    lockMovementX: isNormalFormat,
                    lockMovementY: isNormalFormat,
                    lockScalingX: isNormalFormat,
                    lockScalingY: isNormalFormat,
                    lockUniScaling: isNormalFormat,
                    hasBorders: !isNormalFormat,
                    selectable: true,

                })

                this.setState({ isCanvasReady: true });
                this.addWaterMark();
            })
        })

    }

    addWaterMark = () => {

        const { canvas } = this.state
        const watermark = helpers.isMobile() ? watermarkMobile : watemarkDesktop
        fabric.Image.fromURL(watermark, watermark => {

            canvas.add(watermark)

            const mobilePosition = {
                left: 0,
                top: canvas.height - 6,
                width: 50, height: 6,
                opacity: 0.5
            }

            const desktopPosition = {
                left: 0,
                top: canvas.height - 12,
                width: 99, height: 12,
                opacity: 0.5
            }

            const currentNeededPosition = (helpers.isMobile() ? mobilePosition : desktopPosition)

            watermark.set({
                lockMovementX: true,
                lockMovementY: true,
                ...currentNeededPosition
            })

            canvas.bringToFront(watermark)
            canvas.renderAll()
        })
    }


    closeGenerator = () => {
        const memeCategory = _.get(this.props, 'category')
        const wantedPath = memeCategory ? `/memes/${memeCategory}` : `/`
        this.props.history.push(wantedPath)
        document.querySelector(".cover").style.display = 'none'
    }

    render = () => {
        const { isLoading, isCanvasReady, canvas } = this.state
        const { meme, format, history, location, type } = this.props

        const style= {
            width: '100%',
            height: '100%',
            background: 'red'
        }


        return (
            <PopupCover>
                <div className="generator" key="1">

                    <h1 className="text-center generator__title">
                        מחולל הממים
                    </h1>

                    <div className="generator__wrapper">

                        <div className="generator__canvas-wrapper col-sm-7">
                            <canvas id='c' dir="rtl"/>
                            {isLoading && <div className="spinner">Loading&</div>}
                        </div>

                        <div className="generator__dashboard col-sm-5">
                            <GeneratorDashboard
                                history={history}
                                type={type}
                                location={location}
                                meme={meme}
                                format={format}
                                isCanvasReady={isCanvasReady}
                                canvas={canvas}
                                updateMemeRating={this.props.updateMemeRating}
                            />
                        </div>

                    </div>

                    <div className="generator__close glyphicon glyphicon-remove"
                         onClick={this.closeGenerator}
                    />

                    <div className="bottom_details text-center">
                        <h4>
                            The generator was built by <a href="mailto:nirbenya@gmail.com"> Nir Ben-Yair </a>
                        </h4>
                        <p className="text-center">
                            הפונט אשר בשימוש הינו הפונט ׳אימפקטה׳, שנתרם ע״י הטיפוגרף עודד עזר.
                            <a href="http://www.hebrewtypography.com/"> לאתר הפונטים הישראלי</a>
                        </p>
                    </div>

                </div>

            </PopupCover>
        )

    }
}


function mapStateToProps(state, ownProps) {

    const { match: { params }, location, history } = ownProps;

    const memeId = params.id;
    const isFromUpload = !!_.get(location, 'state.urlPath');
    const currentMemeObj = isFromUpload ?
        {
            urlPath: location.state.urlPath,
            id: helpers.uniqueId()
        }
        :
        state.category.memes[params.id];


    return {
        category: params.category,
        meme: currentMemeObj,
        format: params.format,
        type: params.type,
        memeId: memeId,
        history,
        location,
    }
}

function mapDispatchToProps(dispatch) {

    return {
        updateMemeRating: (meme) => dispatch(updateMemeRating(meme)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Generator)