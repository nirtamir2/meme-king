import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Route } from 'react-router-dom';
// actions
import { toggleSideBar } from '../../actions/index';

// components
import Uploader from '../../components/Uploader/Uploader';
import Searcher from '../Searcher/Searcher';
import Cropper from 'components/Cropper/Cropper';
import Button from 'components/Button/Button';

// containers
import analytics from '../../services/Analytics';

// assets
import logo from 'assets/images/logo-green.png';

 class Home extends Component {

    createCleanSlate = () => {
        document.querySelector(".cover").style.display = 'block';
        analytics.sendEvent('CleanSlate', 'Clean slate');
        this.props.history.push('/generator/clean-slate/normalFormat');
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

