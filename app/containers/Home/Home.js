import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import { toggleSideBar } from '../../actions/sidebar-actions/sidebar-actions';
import { setUploadImage } from '../../actions/upload-actions/upload-actions';
import { showNotification } from 'actions/notification-actions/notification-actions';

// components
import Searcher from '../Searcher/Searcher';
import Avatar from 'components/Avatar/Avatar';
import Button from 'components/Button/Button';
import Title from 'components/Title/Title';
import TextLink from 'components/TextLink/TextLink';
import Col from 'react-bootstrap/lib/Col';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import DropZone from 'components/DropZone/DropZone';
import Text from 'components/Text/Text';
import Icon from 'components/Icon/Icon'
import { setCollageMode, resetCollageMemes, addOrRemoveMemeFromCollage } from 'actions/collage-actions/collage-actions';

//  services
import AnalyticsService from 'services/Analytics';

// helpers
import helpers from 'helpers/helpers';
import { blobToString } from 'containers/Generator/generator-helpers';

 class Home extends Component {

    createCleanSlate = () => {
        this.props.history.push('/generator/clean-slate/normalFormat');
        AnalyticsService.sendEvent('Clean slate');
    };

     uploadImage = (selectedFiles) => {

         const { setUploadImage, history, addOrRemoveMemeFromCollage, showNotification } = this.props;

         if ( _.size(selectedFiles) > 3) {
             return showNotification({ message : 'אפשר להעלות עד 3 ממים לקולאז׳' })
         }

         if (_.size(selectedFiles) > 1) {

             const promises = _.map(selectedFiles, file => {
                 return blobToString({ blob: file }).then(image => {
                     return addOrRemoveMemeFromCollage({ meme: { id: helpers.uniqueId(), urlPath: image } })
                 })
             })

             Promise.all(promises).then(() => {
                 history.push('/generator-collage');
             })

             return;
         }

         setUploadImage(_.get(_.head(selectedFiles), 'preview')).then(() => {
             history.push('/cropper');
         });

     }

    render(){

        const { toggleSideBar } = this.props;

        return (
            <div className="home">

                <Avatar isCentered/>

                <Title className="margin-top-small margin-bottom-large">
                  מימ קינג
                </Title>

                <Grid>
                    <Row>

                        <Col xs={10} xsOffset={1} smOffset={3} sm={6}>

                            <Searcher />

                            <Button
                                block
                                bsSize="lg"
                                onClick={()=> toggleSideBar(true)}
                                className="flex space-between align-items-center hide-desktop margin-bottom-none margin-top-small"
                            >
                                <Text className="margin-bottom-none margin-top-none" weight={600}>
                                    קטגוריות ממים
                                </Text>
                                <Icon className="pull-left" name="LIST" />
                            </Button>

                            <Button
                                bsSize="lg"
                                className="flex space-between align-items-center margin-bottom-none margin-top-small"
                                onDrop={this.uploadImage}
                                componentClass={DropZone}
                                multiple
                            >
                                <Text className="margin-bottom-none margin-top-none" weight={600}>
                                    העלאת תמונה
                                </Text>
                                <Icon className="pull-left" name="UPLOAD" />

                            </Button>

                            <Button
                                onClick={this.createCleanSlate}
                                icon="STOP"
                                className="flex space-between align-items-center margin-top-small"
                                block
                                bsSize="lg"
                            >
                                <Text className="margin-bottom-none margin-top-none flex space-between align-items-center" weight={600}>
                                    לוח חלק
                                </Text>
                                <Icon className="pull-left" name="STOP" />
                            </Button>
                        </Col>

                    </Row>

                </Grid>

                <TextLink className="personal-messages-link text-center"  to="bugs-page">
                    בקשות ודיווח על באגים
                </TextLink>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
         history: ownProps.history
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({ toggleSideBar, setUploadImage, setCollageMode, showNotification, resetCollageMemes, addOrRemoveMemeFromCollage }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

