import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

// components
import GeneratorDashboard from 'components/GeneratorDashboard/GeneratorDashboard'
import GeneratorSignature from 'components/GeneratorSignature/GeneratorSignature'
import GeneratorModal from 'components/GeneratorModal/GeneratorModal'
import Canvas from 'components/Canvas/Canvas'
import Col from 'react-bootstrap/lib/Col';
import Title from 'components/Title/Title';

// helpers
import helpers from 'helpers/helpers'
import { addImageAsync, createCollage, getCanvasContainerWidth } from './generator-helpers';

// constants
import colors from 'constants/colors';
import globalConstants from 'constants/global';
import generatorConstants from './generator-constants';

// services
import WebViewService from 'services/webViewService'

// actions
import { updateMemeRating, saveUserMemeToStorage } from 'actions/meme-actions/meme-actions'
import { fetchSingleMeme } from 'actions/category-actions/category-actions'
import { fetchMemeSuggestions } from 'actions/suggestions-actions/suggestions-actions';
import { setUploadImage } from 'actions/upload-actions/upload-actions';
import { resetCollageMemes } from 'actions/collage-actions/collage-actions';

class Generator extends Component {

    state = {
        isLoading: true,
        canvas: null,
        canvasHeight: '240px'
    }

    componentDidMount() {

        const { isStandAlone, fetchSingleMeme, category, memeId } = this.props

        if (isStandAlone) {
            fetchSingleMeme(category, memeId)
        }

    }

    componentWillReceiveProps(nextProps) {

        const { format, isCleanSlateState, meme } = this.props;
        if(nextProps.isCleanSlateState || isCleanSlateState) {
            return;
        }

        if ((format !== nextProps.format) || (meme !== nextProps.meme)) {
            this.setState({ isLoading: true }, () => {
                this.addImage(nextProps.format)
            })
        }

    }



    createCleanSlate = () => {
        const { canvas } = this.state;

        const DISTANCE = helpers.isMobile() ? 30 : 140;
        const mobileHeight = generatorConstants.cleanSlate.MOBILE_HEIGHT;
        const width = helpers.isMobile() ? 300 : document.querySelector('.generator__canvas-wrapper').offsetWidth - DISTANCE;
        const height = helpers.isMobile() ? mobileHeight  : 460;
        canvas.backgroundColor = colors.WHITE
        canvas.setWidth(width);
        canvas.setHeight(height);
        this.addWaterMark();
        this.setState({ isLoading: false, canvasHeight: `${mobileHeight}px` })

    }

    addWaterMark = () => {
        const { isWebView } = this.props;
        const { canvas } = this.state;

        const isMobile = helpers.isMobile();

        helpers.addWaterMark({ isMobile, canvas, isWebView })

    }

    addImage = (format) => {

        const { isUpload, meme } = this.props;
        const { urlPath } = meme || {};
        const { canvas } = this.state;

        if(!canvas) {
            return;
        }

        canvas.backgroundColor = colors.WHITE;
        const isNormalFormat = (format === globalConstants.format.normal);
        const formatData = _.get(generatorConstants, ['formats', format]);

        const canvasContainerWidth = getCanvasContainerWidth();

        canvas.setWidth(canvasContainerWidth);
        canvas.clear();


        addImageAsync({ image: urlPath, dontPerformConversion: isUpload }).then(image => {

            if (!image) {
                return;
            }

            const wantedMaxHeight = formatData.image.getWantedMaxHeight();
            const wantedMaxWidth = formatData.image.getWantedMaxWidth();

            image = helpers.modifyImageDimensions({ image, wantedMaxHeight, wantedMaxWidth , isNormalFormat });

            canvas.setHeight(formatData.board.getHeight(image));
            canvas.setWidth(formatData.board.getWidth(image));

            canvas.add(image);

            image.set(formatData.image.style);

            this.setState({ isLoading: false , canvasHeight: `${image.height}px` })

            if(format !== 'dankFormat') {
                this.addWaterMark();

            }

        })

    }


    closeGenerator = () => {
        const { isCollageMode, resetCollageMemes } = this.props;
        const memeCategory = _.get(this.props, 'category')
        const wantedPath = memeCategory ? `/memes/${memeCategory}` : `/`
        const location = {
            pathname: wantedPath,
            query: this.props.query || {}
        }

        if (isCollageMode) {
            resetCollageMemes();
        }

        this.props.history.push(location);
    }

    setCanvas = canvas => {

        const { isCollageMode, collageMemes, isCleanSlateState, format } = this.props;

        this.setState({ canvas }, () => {

            if (isCollageMode) {

                createCollage({ collageMemes, addWaterMark: this.addWaterMark, canvas, callback: canvas =>  {
                    this.setState({ isLoading: false, canvasHeight: `${canvas.height}px`})
                }});

            } else if (isCleanSlateState) {

                this.setState({ isLoading: true }, () => {
                    this.createCleanSlate();
                });

            } else {

                this.addImage(format)

            }
        })
    }

    render() {

        const { isLoading, canvas, canvasHeight } = this.state;

        const {
            meme,
            format,
            history,
            location,
            saveUserMemeToStorage,
            isCleanSlateState,
            isWebView,
            isCollageMode,
            setUploadImage
        } = this.props


        const dashboardStyle = { top: helpers.isMobile() ? canvasHeight : null };

        return (
            <GeneratorModal onClose={this.closeGenerator} className="generator">

                {!helpers.isMobile() && (
                    <span>
                        <Title className="text-center margin-bottom-small" direction="rtl">
                            מחולל הממים
                        </Title>
                        <Title size="h4" className="text-center margin-bottom-medium" direction="rtl">
                            {_.toUpper(_.get(meme, 'description'))}
                        </Title>
                    </span>
                )}
                <div className="generator__wrapper">

                    <Col lg={7} md={12}>
                        <Canvas
                            setCanvas={this.setCanvas}
                            isLoading={isLoading}
                            ref={node => this.canvasWrapper = node}
                        />
                    </Col>

                    <Col sm={12} lg={5}>
                        <GeneratorDashboard
                            history={history}
                            style={dashboardStyle}
                            setUploadImage={setUploadImage}
                            isLoading={isLoading}
                            saveUserMemeToStorage={saveUserMemeToStorage}
                            location={location}
                            meme={meme}
                            isCollageMode={isCollageMode}
                            isCleanSlateState={isCleanSlateState}
                            format={format}
                            canvas={canvas}
                            updateMemeRating={this.props.updateMemeRating}
                        />
                    </Col>


                </div>

                {!isWebView && (<GeneratorModal.CloseButton onClick={this.closeGenerator}/>)}

                <GeneratorSignature className="hidden-xs"/>

            </GeneratorModal>
        )

    }
}


function mapStateToProps(state, ownProps) {

    const { match: { params }, location, history } = ownProps;

    const memeId = params.id
    const isUpload = (_.get(params, 'type') === 'upload')

    let currentMemeObj;

    if (isUpload) {
        currentMemeObj = {
            urlPath: _.head(_.get(state, 'upload.images'))
        }
    } else {
        currentMemeObj = state.category.memes[memeId] || _.find(state.search.searchResults, { id: memeId });
    }

    return {
        category: params.category,
        meme: currentMemeObj,
        format: params.format || 'normalFormat',
        type: params.type,
        memeId: memeId,
        history,
        location,
        isUpload,
        isWebView: WebViewService.isWebView,
        query: location.query,
        isCleanSlateState: (params.type === 'clean-slate'),
        suggestions: _.get(state, 'suggestions.memes'),
        collageMemes: _.get(state, 'collage.memes', {})
    }
}

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { category } = _.get(stateProps, 'meme', {});

    return {
        ...ownProps,
        ...stateProps,
        ...dispatchProps,
        fetchMemeSuggestions: () => dispatchProps.fetchMemeSuggestions(category, helpers.isMobile() ? 3 : 6)

    }
}

export default connect(mapStateToProps, { fetchSingleMeme, setUploadImage, saveUserMemeToStorage, resetCollageMemes, updateMemeRating, fetchMemeSuggestions }, mergeProps)(Generator)