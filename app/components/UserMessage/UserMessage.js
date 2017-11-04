import _ from 'lodash'
import React, { Component } from 'react';
import classNames from'classnames';

// assets
import defaultAvatar from 'assets/images/default-avatar.png'

// components
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Title from 'components/Title/Title'
import Text from 'components/Text/Text'
import Icon from 'components/Icon/Icon'
import Avatar from 'components/Avatar/Avatar';

class UserMessage extends Component {

    state = {
        likesClicked: false
    }

    componentDidMount() {
        console.log('mount')
    }

    updateUserLikes = () => {
        const { updateUserMessageLikes, post } = this.props;
        this.setState({ likesClicked : true })
        updateUserMessageLikes(post);
    }

    render() {
        const { post } = this.props;

        const isBug = (post.type === 'bug');

        return(
            <Row key={post.id} className="box-user-message">
                <Col className="likes-container margin-top-large area" xs={12} sm={1}>
                    <Icon theme="success"
                          size="xl"
                          isRound
                          isActive={this.state.likesClicked}
                          className="margin-right-small"
                          name="THUMBS_UP"
                          onClick={!this.state.likesClicked ? this.updateUserLikes : _.noop}
                    />
                    <Text className="margin-top-small counter" theme="black">{post.likes || 0}</Text>
                </Col>
                <Col xs={12} sm={8} className="area">
                    <Title size="h3">
                        <Icon top="4" name={isBug ? 'ERROR' : 'LAMP'} className={classNames(isBug ? 'danger' : 'brand', 'margin-left-extra-small')} />
                        {isBug ? 'באג' : 'הצעה'}
                    </Title>
                    <Text theme="black" size="sm" className="margin-top-medium margin-bottom-medium">
                        {post.message}
                    </Text>
                </Col>

                <Col xs={12} sm={3} className="area" >
                    <Avatar imgSrc={defaultAvatar} size="sm" block
                            className="margin-bottom-small margin-top-large center-block"/>
                    {post.name && (
                        <Text align="center" theme="black" size="sm">
                            שם המדווח:
                        </Text>
                    )}
                    <Title size="h3" className="margin-top-extra-small">
                        {post.name}
                    </Title>
                    <Text align="center" theme="black" size="sm">
                        {post.date}
                    </Text>
                    <Text className="hidden-mobile" align="center" theme="black" size="sm">
                        id: {post.id}
                    </Text>
                </Col>
            </Row>
        )
    }

}

UserMessage.UserMessage = {
    post: {}
}

export default UserMessage;