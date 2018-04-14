import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

// containers
import MemeSection from 'containers/MemeSection/MemeSection';
import Home from 'containers/Home/Home';
import Generator from 'containers/Generator/Generator';

// components
import Admin from 'components/Admin/Admin';
import BugsPage from 'containers/BugsContainer/BugsContainer';

export default class MainView extends Component {

    render(){
        return(
            <div style={{width: '100%', backgroundColor:'#0097EB', height: '100vh', overflow: 'scroll'}}>
                <Switch>
                    <Route path='/memes/:category' component={MemeSection} />
                    <Route path="/bugs-page" component={BugsPage}/>
                    <Route path="/admin" component={Admin}/>
                    <Route path='/' component={Home}/>
                </Switch>
            </div>
        )
    }
}


