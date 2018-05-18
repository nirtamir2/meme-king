import _ from 'lodash';
import React from 'react';

// components
import PopupCover from 'components/PopupCover/PopupCover'
import Text from 'components/Text/Text'
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Grid from 'react-bootstrap/lib/Grid';
import Label from 'components/Label/Label'

// constnats
import menu from 'constants/menu';

class MemePreviewModal extends React.Component {

    state = {
        isLoading: true,
    }

    render() {
        const { urlPath, description, rating, category } = this.props;
        const { isLoading } = this.state;

        return (
            <PopupCover className="box-meme-preview-modal">
                <Grid>
                    <Row>
                        <Col xs={12}>
                            <img onLoad={() => this.setState({ isLoading: false })} className="margin-top-medium img-responsive" src={urlPath} />
                            <Text dir="rtl" className="margin-top-medium" align="center" theme="white">{description}</Text>
                            <div className="flex labels-container margin-top-medium">
                                <Label dir="rtl">{rating * 4} הורדות </Label>
                                <Label>{_.get(menu, [category, 'title'])}</Label>
                            </div>

                        </Col>
                    </Row>
                </Grid>
            </PopupCover>
        )
    }
}

export default MemePreviewModal;