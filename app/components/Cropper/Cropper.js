import React, { Component } from 'react';
import ReactCropper from 'react-cropper';

// components
import Button from 'components/Button/Button';

// constants
import globalConstants from 'constants/global';

export default class Cropper extends Component {

    crop = () => {
       const image = this.cropper.getCroppedCanvas().toDataURL();
       const location = {
           pathname: `/generator/upload/${globalConstants.format.normal}`,
           state: { urlPath: image }
       }
        this.props.history.push(location)
    }

    closeCropper = () => {
        document.querySelector(".cover").style.display = 'none';
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="generator">

                <div className="generator__close glyphicon glyphicon-remove" onClick={this.closeCropper} />


                <ReactCropper
                    ref={node => this.cropper = node}
                    src={this.props.location.state.image}
                    style={{height: 400, width: '70%', marginLeft: 'auto', marginRight: 'auto'}}
                />

                <Button onClick={this.crop} label="אישור" center className="center-block margin-top-md" />


            </div>
        )
    }

}