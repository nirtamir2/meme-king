import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';

// actions
import { toggleSideBar } from '../../actions/sidebar-actions/sidebar-actions';

// components
import Uploader from '../../components/Uploader/Uploader';
import Searcher from '../Searcher/Searcher';
import Avatar from 'components/Avatar/Avatar';
import Button from 'components/Button/Button';
import Title from 'components/Title/Title';
import TextLink from 'components/TextLink/TextLink';

//  services
import AnalyticsService from 'services/Analytics';

 class Home extends Component {

    createCleanSlate = () => {
        this.props.history.push('/generator/clean-slate/normalFormat');
        AnalyticsService.sendEvent('Clean slate');
    };

    render(){

        const { toggleSideBar, history } = this.props;

        return (
            <div className="home">

                <Avatar isCentered/>

                <Title className="margin-top-small margin-bottom-small-title">
                  מימ קינג
                </Title>

                <Button label="קטגוריות ממים"
                        onClick={()=> toggleSideBar(true)}
                        icon="LIST"
                        className="flex hide-desktop margin-bottom-none"
                />

                <Uploader history={history} />

                <Button label=" לוח חלק"
                        onClick={this.createCleanSlate}
                        icon="STOP"
                />

                <Searcher history={history} />

                <TextLink className="personal-messages-link text-center"  to="contact-page">
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
    return bindActionCreators({ toggleSideBar }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)

