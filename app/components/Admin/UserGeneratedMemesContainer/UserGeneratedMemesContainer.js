import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

// config
import config from 'config/config'

// components
import Button from 'components/Button/Button'
import Title from 'components/Title/Title'

class UserGeneratedMemesContainer extends React.Component {

    state = {}


    getUserMemes = () => {

        axios.get(`${config.apiBaseUrl}/user-generated-memes`)
            .then(res => {
                this.setState({ memes: res.data })
            })
    }


    clearUserMemes = () => {
        axios.post(`${config.apiBaseUrl}/remove-user-generated-memes`)
        this.setState({ memes: {} })

    }


    render() {

        const { memes } = this.state

        return (
            <div>
                <Button
                    onClick={this.getUserMemes}
                    size="sm"
                    block
                    center
                    bsStyle="success"
                    className="margin-bottom-small"

                >
                    GET THOSE MEMES
                </Button>
                <Button
                    onClick={this.clearUserMemes}
                    size="sm"
                    block
                    center
                    bsStyle="danger"
                >
                    CLEAR THEM ALL
                </Button>

                <Title>({_.size(memes)})</Title>

                <div className="margin-top-large">
                    {_.map(memes, meme => {
                        return (
                            <div key={meme.id} className="box-user-meme margin-top-medium">
                                <img src={meme.urlPath}/>
                                <div className="margin-top-medium">
                                    {meme.isMobile && <p>Mobile Device</p>}
                                    {meme.isDesktop && <p>Desktop</p>}
                                    {meme.isMobileApp && <p>iOS Mobile App</p>}
                                </div>
                                <p>Date : {new Date(meme.date) && new Date(meme.date).toDateString()}</p>
                            </div>
                        )
                    })}

                </div>
            </div>
        )
    }
}


export default connect(null, {})(UserGeneratedMemesContainer)