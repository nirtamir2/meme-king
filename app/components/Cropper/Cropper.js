import _ from 'lodash'
import React, { Component } from 'react'
import ReactCropper from 'react-cropper'
import { connect } from 'react-redux';

// components
import Button from 'components/Button/Button'
import GeneratorModal from 'components/GeneratorModal/GeneratorModal'
import Title from 'components/Title/Title';
import Col from 'react-bootstrap/lib/Col';

// constants
import globalConstants from 'constants/global'

// helpers
import helpers from 'helpers/helpers'

// services
import WebViewService from 'services/webViewService';

// actions
import { setUploadImage } from 'actions/upload-actions/upload-actions';

class Cropper extends Component {

    state = {
        uploadedImageFromWebView: ''
    }

    componentWillMount() {
        document.addEventListener('message', (e) => {
            this.setState({ uploadedImageFromWebView: 'data:image/png;base64,' + e.data })
        })
    }


    crop = () => {

        const image = this.cropper.getCroppedCanvas().toDataURL();
        this.props.setUploadImage(image).then(() => {
            this.props.history.push(`/generator/upload/${globalConstants.format.normal}`);
        })
    }

    closeCropper = () => {
        this.props.history.push('/')
    }

    render() {

        const image = ((_.get(this.props, 'image')) || this.state.uploadedImageFromWebView);
        const cropperStyle = {
            height: helpers.isMobile() ? 300 : 400,
            width: '70%',
            marginLeft: 'auto',
            marginRight: 'auto'
        };

        return (
            <GeneratorModal>

                {!WebViewService.isWebView && <GeneratorModal.CloseButton onClick={this.closeCropper}/>}

                <Title>
                    חיתוך התמונה
                </Title>

                <ReactCropper
                    ref={node => this.cropper = node}
                    src={image}
                    style={cropperStyle}
                    background={false}
                    autoCropArea={1}
                />

                <Col xs={12} sm={4} smOffset={4}>
                    <Button block onClick={this.crop} center className="center-block margin-top-md">
                        אישור
                    </Button>
                </Col>


            </GeneratorModal>
        )
    }

}

function mapStateToProps(state) {
    return {
        image: _.head(_.get(state, 'upload.images'))
    }
}

export default connect(mapStateToProps, { setUploadImage })(Cropper)