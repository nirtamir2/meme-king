import React, { Component } from 'react';
import { connect } from 'react-redux';

// containers
import Header from 'containers/Header/Header';
import SideMenu from 'containers/SideMenu/SideMenu';

// components
import MainView from 'components/MainView/MainView';
import Notification from 'containers/Notification/Notification';

// services
import LocalStorageService from 'services/LocalStorage';
import AnalyticsService from 'services/Analytics';
import SentryService from 'services/SentryService';
import WebViewService from 'services/webViewService';

// helpers
import helpers from 'helpers/helpers';

export default class App extends Component {

    componentWillMount() {


        // Initialize Firebase
        window.config = {
            apiKey: "AIzaSyA-f4RHZw205unjWdY4jvh_tJ7E1ZVPYKQ",
            authDomain: "memeking-80290.firebaseapp.com",
            databaseURL: "https://memeking-80290.firebaseio.com",
            storageBucket: "gs://memeking-80290.appspot.com", //"memeking-80290.appspot.com",
            messagingSenderId: "243226751545"
        };

        firebase.initializeApp(config);

        // google analytics
        AnalyticsService.init();
        AnalyticsService.sendEvent(helpers.isMobile() ? 'Mobile Entrance' : 'Desktop entrance');

        SentryService.init();

        WebViewService.setIsWebView(helpers.getQueryVariable('origin') === 'mobile');

        if(WebViewService.isWebView) {
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





