import React, { Component } from 'react';

// containers
import Header from 'containers/Header/Header';
import SideMenu from 'containers/SideMenu/SideMenu';

// components
import MainView from 'components/MainView/MainView';

export default class App extends Component {

    constructor(props) {
        super(props);

    }

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


