import _ from 'lodash'
import React, { Component } from 'react'
import classNames from 'classnames'
import config from 'config/config';

// components
import Button from 'components/Button/Button';
import ItemsArea from '../ItemsArea/ItemsArea'
import TextFieldsContainer from 'components/TextFieldsContainer/TextFieldsContainer'
import GeneratorSignature from 'components/GeneratorSignature/GeneratorSignature'
import Modal from 'components/Modal/Modal'
import Icon from 'components/Icon/Icon';
import Col from 'react-bootstrap/lib/Col';
import GeneratorDashboardSkeleton from 'components/GeneratorDashboard/DashboardSkeleton';

// services
import AnalyticsService from 'services/Analytics'
import WebViewService from 'services/webViewService';

// helpers
import helpers from 'helpers/helpers';
import { addImageAsync, createCollage, getCanvasContainerWidth } from 'containers/Generator/generator-helpers';

// constants
import globalConstants from 'constants/global';
import dashboardConstants from './dashboard-constants';

const Buttons = ({ className, canvas, isCleanSlateState, format, actions }) => (
    <div className={classNames("buttons-container", className)}>

        {_.map(_.values(dashboardConstants.buttons), (button) => {
            return (
                button.show({ isCleanSlateState }) && (
                    <Col
                        className={'padding-right-none padding-left-none'}
                        xs={2}
                        sm={6}
                    >
                        <Button
                            onClick={actions[button.onClick]}
                            onDrop={actions[button.onDrop]}
                            block
                            multiple
                            bsStyle="brand-gray-border"
                            className="flex space-between dashboard-button weight-600"
                            componentClass={button.componentClass}
                        >
                            <Icon className="margin-right-small" name={button.icon} />
                            <span className="dashboard-button-label">{button.getLabel({ format })}</span>
                        </Button>
                    </Col>
                )
            )
        })}

    </div>
)


export default class GeneratorDashboard extends Component {

    state = {
        isItemsAreaOpen: false,
    }

    download = () => {
        const { canvas, saveUserMemeToStorage, format, meme, isCollageMode, updateMemeRating } = this.props

        helpers.sendDownloadedMemeAnalyticsEvent({ format, meme });

        updateMemeRating(this.props.meme);

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
            return;
        }

        const link = document.createElement("a");
        link.href = canvas.toDataURL();
        link.download = 'MemeKing';
        link.click();


       if (config.features.saveUserMemeToStorage ) {
            saveUserMemeToStorage(memeData)
        }

        //!* need to set back canvas dimensions *
        canvas.setWidth(canvas.getWidth() / zoom).setHeight(canvas.getHeight() / zoom)
        canvas.setZoom(1);

    }

    sendBase64ToNative = (base64) => {
        window.postMessage(base64)
    }

    uploadFiles = acceptedFiles => {
        const { canvas } = this.props;


        _.forEach(acceptedFiles, file => {

            const randomX = (Math.floor(Math.random() * canvas.width) + 1) /2;
            const randomY = (Math.floor(Math.random() * canvas.height) + 1) / 2;

            fabric.Image.fromURL(file.preview, function (image) {
                image = helpers.modifyImageDimensions({ image, wantedMaxHeight: 100 });
                image.left = randomX
                image.top = randomY;
                canvas.add(image);
                image.set({hoverCursor: "default"});
                image.lockMovementX = false;
                image.lockMovementY = false;
                image.hasBorders = true;
                image.selectable = true;
                canvas.bringForward(image);

            });
        });
    }


    sendImageToCropper = () => {
        AnalyticsService.sendEvent('Cropping from inside Generator');
        this.props.setUploadImage(this.props.canvas.toDataURL()).then(() => {
            this.props.history.push({ pathname: '/cropper' });
        })
    }

    changeFormat = () => {

        const { history, format, location } = this.props
        const wantedFormat = (format === globalConstants.format.normal) ? globalConstants.format.dank : globalConstants.format.normal
        const wantedPath = location.pathname.replace(format, wantedFormat)
        const from = _.get(location, 'state.from')

        history.push(wantedPath)
    }

    render() {

        const { format, canvas, style, isCleanSlateState, isLoading } = this.props

        if (isLoading) {
            return (
                <GeneratorDashboardSkeleton style={style} />
            )
        }

        const buttons = (
            <Buttons
                canvas={canvas}
                isCleanSlateState={isCleanSlateState}
                format={format}
                actions={{
                    download: this.download,
                    uploadFiles: this.uploadFiles,
                    addTextLine: () => this.TextFieldsContainer.addTextInput(),
                    changeFormat: this.changeFormat,
                    toggleItemsArea: () => this.setState({ isItemsAreaOpen: !this.state.isItemsAreaOpen }),
                    sendImageToCropper: this.sendImageToCropper
                }}
            />
        )

        return (
            <div style={style} className="box-generator-dashboard">

                {helpers.isMobile() && buttons}

                <TextFieldsContainer
                    ref={ elem => this.TextFieldsContainer = elem}
                    canvas={canvas}
                    format={format}
                />

                {!helpers.isMobile() && buttons}

                <GeneratorSignature className="visible-mobile"/>

                <Modal onHide={() => this.setState({ isItemsAreaOpen: false })}
                       show={this.state.isItemsAreaOpen && canvas}>
                    <ItemsArea canvas={canvas} closeModal={() => this.setState({ isItemsAreaOpen: false })}/>
                </Modal>

            </div>
        )
    }
}

