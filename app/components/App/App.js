import React, { Component } from 'react';
import { connect } from 'react-redux';

// containers
import Header from 'containers/Header/Header';
import SideMenu from 'containers/SideMenu/SideMenu';

// components
import MainView from 'components/MainView/MainView';
import Notification from 'containers/Notification/Notification';

// services
import AnalyticsService from 'services/Analytics';
import SentryService from 'services/SentryService';
import WebViewService from 'services/webViewService';

// helpers
import helpers from 'helpers/helpers';

export default class App extends Component {

    componentDidMount() {

        AnalyticsService.init();
        AnalyticsService.sendEvent(helpers.isMobile() ? 'Mobile Entrance' : 'Desktop entrance');

        SentryService.init();

        WebViewService.setIsWebView(helpers.getQueryVariable('origin') === 'mobile');

        if (WebViewService.isWebView) {
            AnalyticsService.sendEvent('Mobile App entrance');
        }

    };

    render(){
        return (
            <div>
                <Header/>
                <div className="flex">
                    <SideMenu />
                    <MainView />
                    <Notification />
                </div>
            </div>
        );
    }
}





