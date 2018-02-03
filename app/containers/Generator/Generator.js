import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

// components
import GeneratorDashboard from 'components/GeneratorDashboard/GeneratorDashboard'
import GeneratorSignature from 'components/GeneratorSignature/GeneratorSignature'
import GeneratorDashboardSkeleton from 'components/GeneratorDashboardSkeleton/GeneratorDashboardSkeleton'
import GeneratorModal from 'components/GeneratorModal/GeneratorModal'
import Title from 'components/Title/Title'
import Canvas from 'components/Canvas/Canvas'
import MemeSuggestionsContainer from 'containers/MemeSuggestionsContainer/MemeSuggestionsContainer'

// helpers
import helpers from 'helpers/helpers'
import { addImageAsync, createCollage } from './generator-helpers';

// constants
import colors from 'constants/colors'
import globalConstants from 'constants/global'
const CLEAN_SLATE_MOBILE_HEIGHT = 280

// services
import WebViewService from 'services/webViewService'

// actions
import { updateMemeRating, saveUserMemeToStorage } from 'actions/meme-actions/meme-actions'
import { fetchSingleMeme } from 'actions/category-actions/category-actions'
import { fetchMemeSuggestions } from 'actions/suggestions-actions/suggestions-actions';

const getCanvasContainerWidth = () => (document.querySelector('.generator__canvas-wrapper').offsetWidth);

class Generator extends Component {

    state = {
        isLoading: true,
        canvas: null,
        isCanvasReady: false,
    }

    componentDidMount() {

        const { isStandAlone, fetchSingleMeme, category, memeId } = this.props

        this.props.fetchMemeSuggestions();

        if (isStandAlone) {
            fetchSingleMeme(category, memeId)
        }


    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isCleanSlateState || this.props.isCleanSlateState) {
            return;
        }

        if ((this.props.format !== nextProps.format) || (this.props.meme !== nextProps.meme)) {
            this.setState({ isCanvasReady: false, isLoading: true }, () => {
                this.createBoard(nextProps.format)
            })
        }

        if (this.props.memeId !== nextProps.memeId) {
            this.props.fetchMemeSuggestions();
        }

    }

    createBoard = (wantedFormat) => {
            if (this.state.canvas) {
                this.addImage(wantedFormat)
            }
    }


    createCleanSlate = () => {
        const { canvas } = this.state

        const DISTANCE = helpers.isMobile() ? 30 : 140
        const width = helpers.isMobile() ? 300 : document.querySelector('.generator__canvas-wrapper').offsetWidth - DISTANCE
        const height = helpers.isMobile() ? CLEAN_SLATE_MOBILE_HEIGHT : 460
        canvas.backgroundColor = colors.WHITE
        canvas.setWidth(width)
        canvas.setHeight(height)
        this.addWaterMark();
        this.setState({ isLoading: false, isCanvasReady: true })

    }

    addWaterMark = () => {
        const { isWebView } = this.props;
        const { canvas } = this.state;
        const isMobile = helpers.isMobile();
        helpers.addWaterMark({ isMobile, canvas, isWebView })
    }

    addImage = (format) => {

        const { urlPath } = this.props.meme || {};
        const { canvas } = this.state;

        canvas.backgroundColor = colors.WHITE;
        const isNormalFormat = (format === globalConstants.format.normal)
        const spaceToADDForDankFormatStyle = helpers.isMobile() ? 120 : 150;
        const canvasContainerWidth = getCanvasContainerWidth();

        const isUploadState = (this.props.isFromUpload)
        canvas.setWidth(canvasContainerWidth);
        canvas.clear();


        helpers.getDataUri(urlPath, isUploadState, dataUri => {

            fabric.Image.fromURL(dataUri, image => {

                this.setState({ isLoading: false })

                const wantedMaxHeight = ((!isNormalFormat && helpers.isMobile()) ? 280 : null);
                const wantedMaxWidth = isNormalFormat ? (getCanvasContainerWidth() - 50) : (getCanvasContainerWidth() - (helpers.isMobile() ? 100 : 200))

                image = helpers.modifyImageDimensions({ image, wantedMaxHeight, wantedMaxWidth , isNormalFormat })

                canvas.setHeight(isNormalFormat ? image.height : image.height + spaceToADDForDankFormatStyle)
                canvas.setWidth(isNormalFormat ? image.width : image.width + 25)
                canvas.add(image)

                image.set({
                    top: isNormalFormat ? 0 : (spaceToADDForDankFormatStyle - 15),
                    left: isNormalFormat ? 0 : 10,
                    hoverCursor: "default",
                    lockMovementX: isNormalFormat,
                    lockMovementY: isNormalFormat,
                    lockScalingX: isNormalFormat,
                    lockScalingY: isNormalFormat,
                    lockUniScaling: isNormalFormat,
                    hasBorders: !isNormalFormat,
                    selectable: true,
                })

                this.setState({ isCanvasReady: true })
            })
        })

    }


    closeGenerator = () => {
        const memeCategory = _.get(this.props, 'category')
        const wantedPath = memeCategory ? `/memes/${memeCategory}` : `/`
        const location = {
            pathname: wantedPath,
            query: this.props.query || {}
        }
        debugger;
        this.props.history.push(location)
    }

    setCanvas = canvas => {

        const { isCollageMode, collageMemes, isCleanSlateState } = this.props;

        this.setState({ canvas }, () => {

            if(isCollageMode) {
                createCollage({ collageMemes, canvas, callback: () =>  this.setState({ isLoading: false, isCanvasReady: true })});
            } else if(isCleanSlateState) {
                this.setState({ isCanvasReady: false, isLoading: true }, () => {
                    this.createCleanSlate();
                });

            }

            else {
                this.createBoard(this.props.format);
            }
        })
    }

    render() {

        const { isLoading, isCanvasReady, canvas } = this.state;

        const {
            meme,
            format,
            history,
            location,
            type,
            query,
            isFromSearch,
            isStandAlone,
            isFromUpload,
            saveUserMemeToStorage,
            isCleanSlateState,
            isWebView,
            suggestions,
            currentMemeCategory,
            isCollageMode
        } = this.props

        const mobileGeneratorDashboardTopPosition = ( (isCanvasReady && helpers.isMobile())
            ?
            (isCleanSlateState ? CLEAN_SLATE_MOBILE_HEIGHT : `${this.canvasWrapper.getHeight() - 20}px`)
            :
            null)

        const dashboardStyle = mobileGeneratorDashboardTopPosition ? { top: mobileGeneratorDashboardTopPosition } : {}

        return (
            <GeneratorModal onClose={this.closeGenerator} className="generator">


                <div className="generator__wrapper">

                    <Canvas setCanvas={this.setCanvas} isLoading={isLoading} ref={node => this.canvasWrapper = node}/>

                    {isCanvasReady

                        ?

                        <GeneratorDashboard
                            query={query}
                            history={history}
                            style={dashboardStyle}
                            type={type}
                            saveUserMemeToStorage={saveUserMemeToStorage}
                            location={location}
                            meme={meme}
                            isCollageMode={isCollageMode}
                            suggestions={suggestions}
                            currentMemeCategory={currentMemeCategory}
                            isStandAlone={isStandAlone}
                            isFromSearch={isFromSearch}
                            isFromUpload={isFromUpload}
                            isCleanSlateState={isCleanSlateState}
                            format={format}
                            isCanvasReady={isCanvasReady}
                            canvas={canvas}
                            updateMemeRating={this.props.updateMemeRating}
                        />

                        :

                        <GeneratorDashboardSkeleton />
                    }


                </div>

                {(!isFromSearch && !isStandAlone && !helpers.isMobile() && !isFromUpload && !isCleanSlateState) &&
                <MemeSuggestionsContainer category={currentMemeCategory} suggestions={suggestions} />}

                {!isWebView && (<GeneratorModal.CloseButton onClick={this.closeGenerator}/>)}

                <GeneratorSignature className="hidden-xs"/>

            </GeneratorModal>
        )

    }
}


function mapStateToProps(state, ownProps) {

    const { match: { params }, location, history } = ownProps;

    const memeId = params.id
    const isFromUpload = (_.get(location, 'state.from') === 'upload')
    const isFromSearch = (_.get(location, 'state.from') === 'search');
    let currentMemeObj;
    if(isFromSearch) {
        currentMemeObj = _.find(state.search.searchResults, { id: memeId});
    } else if(isFromUpload) {
        currentMemeObj = _.get(location, 'state')
    } else {
        currentMemeObj = state.category.memes[memeId];
    }

    return {
        category: params.category,
        meme: currentMemeObj,
        format: params.format || 'normalFormat',
        type: params.type,
        memeId: memeId,
        history,
        location,
        isFromUpload,
        isFromSearch,
        isWebView: WebViewService.isWebView,
        query: location.query,
        isCleanSlateState: (params.type === 'clean-slate'),
        suggestions: _.get(state, 'suggestions.memes'),
        currentMemeCategory: _.get(state, 'suggestions.category'),
        isCollageMode: ownProps.isCollageMode,
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

export default connect(mapStateToProps, { fetchSingleMeme, saveUserMemeToStorage, updateMemeRating, fetchMemeSuggestions }, mergeProps)(Generator)