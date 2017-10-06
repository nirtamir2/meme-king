import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';
// actions
import { toggleSideBar } from '../../actions/sidebar-actions/sidebar-actions';

// components
import Uploader from '../../components/Uploader/Uploader';
import Searcher from '../Searcher/Searcher';
import Cropper from 'components/Cropper/Cropper';
import Button from 'components/Button/Button';

// assets
import logo from 'assets/images/logo.png';

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

                <img src={logo}/>

                <h1 className="home__main-title">
                   מחולל הממים הטוב ביקום
                </h1>

                <Button label="קטגוריות ממים"
                        onClick={()=> toggleSideBar(true)}
                        icon="glyphicon glyphicon-th-list"
                        className="flex hide-desktop"
                />

                <Uploader history={history} />

                <Button label=" לוח חלק"
                        onClick={this.createCleanSlate}
                        icon="glyphicon glyphicon-stop"
                />

                <Searcher history={history} />

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

