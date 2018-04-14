import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios';
import {  Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

// helpers
import { blobToString } from 'containers/Generator/generator-helpers';

// components
import Button from 'components/Button/Button';
import NewMemesContainer from './NewMemesContainer/NewMemesContainer';
import UserGeneratedMemesContainer from './UserGeneratedMemesContainer/UserGeneratedMemesContainer';
import EditMemeContainer from './EditMemesContainer/EditMemesContainer';
import Panel from 'components/Panel/Panel';
import Title from 'components/Title/Title'

// config
import config from 'config/config';

// constants
import constants from 'constants/global'

const LoginArea = ({ onChange, value, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="login-area">
            <input type="password" value={value} onChange={onChange}/>
            <Button center className="login-btn" onClick={onSubmit} >
                Login
            </Button>
        </form>
    )
}

class Admin extends Component {

    state = {
        anigma: '',

    }


    onSubmit = () => {
        if (this.state.anigma === '~memeking07') {
            this.setState({ isAuthenticated: true, isSuperAdmin: true }, () => {
            })
        } else if (this.state.anigma === 'admin1234') {
            this.setState({ isAuthenticated: true }, () => {
            })
        }
    }

    render() {

        const { isSuperAdmin = true, isAuthenticated } = this.state;
        const { match } = this.props;

        if (!isAuthenticated) {
            return (
                <LoginArea
                    value={this.state.anigma}
                    onSubmit={this.onSubmit}
                    onChange={event => this.setState({ anigma: event.target.value })}
                />
            )
        }


        return (
            <div className="box-admin container">
                <Title className="margin-top-large margin-bottom-large">
                    Admin
                </Title>

                <div className="flex space-between dashboard">
                    {isSuperAdmin && (
                        <div>
                            <Button
                                size="sm"
                                center
                                componentClass={Link}
                                to={`${match.url}/user-generated-memes`}
                            >
                                user generated memes
                            </Button>
                        </div>
                    )}
                    {isSuperAdmin && (
                        <div>
                            <Button
                                size="sm"
                                center
                                componentClass={Link}
                                to={`${match.url}/edit-memes`}
                            >
                                Edit Existing memes
                            </Button>
                        </div>
                    )}
                    {isSuperAdmin && (
                        <div>
                            <Button
                                size="sm"
                                center
                                componentClass={Link}
                                to={`${match.url}/new-memes`}
                            >
                                Upload New Memes
                            </Button>
                        </div>
                    )}
                </div>

                <Panel className="containers margin-top-large">
                    <Route path={`${match.url}/new-memes`} component={NewMemesContainer} />
                    <Route path={`${match.url}/user-generated-memes`} component={UserGeneratedMemesContainer} />
                    <Route path={`${match.url}/edit-memes`} component={EditMemeContainer} />
                </Panel>

            </div>
        )
    }
}


function mapStateToProps(state) {

    return {

    }
}


export default connect(mapStateToProps)(Admin)