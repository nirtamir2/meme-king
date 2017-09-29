import React, { Component } from 'react';

// components
import Button from '../GeneratorDashboardButton/GeneratorDashboardButton';
import ItemsArea from '../ItemsArea/ItemsArea';
import GeneratorUploader from '../GeneratorUploader/GeneratorUploader';
import TextFieldsContainer from 'components/TextFieldsContainer/TextFieldsContainer';

// services
import LocalStorageService from 'services/LocalStorage';

// helpers
import helpers from 'helpers/helpers';

// constants
import globalConstants from 'constants/global';

export default class TextInputsContainer extends Component {

    state = {
        isItemsAreaOpen: false,
    }

    toggleItemsArea = ()=> {
        this.setState({ isItemsAreaOpen: !this.state.isItemsAreaOpen })
    };

    download = (event)=> {
        // const { canvas } = this.props;
        //
        // canvas.deactivateAll().renderAll();
        // const clickedElement = event.target.tagName === 'SPAN' ? event.target.parentNode : event.target;
        //
        // //saveing the canvas and resizing it before downloading depends on screen resolution.
        // const zoom = helpers.isMobile() ? 2.5 : 1.3;
        //
        // canvas.setZoom(zoom);
        // // need to enlarge canvas otherwise the svg will be clipped
        // canvas.setWidth(canvas.getWidth() * zoom).setHeight(canvas.getHeight() * zoom);
        //
        // clickedElement.href = canvas.toDataURL();
        // clickedElement.download = 'MemeKing';
        //
        // //!* need to set back canvas dimensions *
        // canvas.setWidth(canvas.getWidth() / zoom).setHeight(canvas.getHeight() / zoom);
        // canvas.setZoom(1);
        //
       // this.handleGoogleAnalytics();
        this.updateMemeRating();
        this.saveMemeNameToLocalStorage();
    };


    saveMemeNameToLocalStorage = () => {
        LocalStorageService.addDownloadedMemeToMyMemesList(this.props.meme || null)
    };


    updateMemeRating = () => {
       if (!(this.props.type === 'upload')) {
           this.props.updateMemeRating(this.props.meme)
       }
    };

    clearCanvas = ()=> {
        this.props.canvas.clear();
    };

    addTextLine = () => {
        this.TextFieldsContainer.addTextInput();
    }

    crop = () => {
        const location = {
            pathname: '/cropper',
            state : {
                image : this.props.meme.urlPath
            }
        }
        this.props.history.push(location)
    }

    changeFormat = () => {
        const { history, format, location, type, meme } = this.props;
        const wantedFormat = (format === globalConstants.format.normal) ? globalConstants.format.dank : globalConstants.format.normal;
        const wantedPath = location.pathname.replace(format, wantedFormat);

        if( type === 'upload') {
            const location = {
                pathname : wantedPath,
                state: {
                    urlPath: meme.urlPath
                }
            }
            history.push(location)
        } else {
            history.push(wantedPath);

        }
    }

    render(){

        const { format, canvas, isCanvasReady } = this.props;
        const FORMAT_BUTTON_TEXT = format === globalConstants.format.normal ? 'פורמט דאנק מימ' : "פורמט רגיל";
        const ADD_TEXT_LINE =   "הוספת שורת טקסט" ;
        const ADD_AN_ITEM =  "הוספת פריט" ;
        const CLEAR_ALL =  "נקה הכל" ;
        const DOWNLOAD = "הורדה" ;

        return (
            <div>

                {isCanvasReady && (
                <TextFieldsContainer ref={ elem => this.TextFieldsContainer = elem}
                                     canvas={canvas}
                                     format={format}
                />
                )}

                <Button
                    label={ADD_TEXT_LINE}
                    icon="glyphicon glyphicon-plus"
                    onClick={this.addTextLine}
                />

                <div className="flex space-between">
                    <GeneratorUploader canvas={canvas} />
                </div>

                <Button label={ADD_AN_ITEM} icon="glyphicon glyphicon-sunglasses"
                        onClick={this.toggleItemsArea}
                />

                {this.state.isItemsAreaOpen && canvas && <ItemsArea canvas={canvas} />}

                <Button label={FORMAT_BUTTON_TEXT}
                        onClick={this.changeFormat}
                        icon="glyphicon glyphicon-retweet"
                />

                <Button label={CLEAR_ALL}
                        icon="glyphicon glyphicon-stop"
                        onClick={this.clearCanvas}
                />


                <Button label={DOWNLOAD}
                        icon="glyphicon glyphicon-download-alt"
                        className={DOWNLOAD}
                        onClick={this.download}
                />
            </div>
        );
    }
}

