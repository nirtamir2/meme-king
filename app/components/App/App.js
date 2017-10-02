import React, { Component } from 'react';
import { connect } from 'react-redux';

// containers
import Header from 'containers/Header/Header';
import SideMenu from 'containers/SideMenu/SideMenu';

// components
import MainView from 'components/MainView/MainView';

// services
import LocalStorageService from 'services/LocalStorage';

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

        console.log(ENV ? ENV : 'no env');

        firebase.initializeApp(config);

        LocalStorageService.init();
    };

    render(){
        return (
            <div>
                <Header/>
                <div className="flex">
                    <SideMenu />
                    <MainView />
                </div>
            </div>
        );
    }
}





