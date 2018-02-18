import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';

// actions
import { clearNotifications } from 'actions/notification-actions/notification-actions';

import Modal from 'components/Modal/Modal';
import Title from 'components/Title/Title';
import Text from 'components/Text/Text';
import logo from 'assets/images/logo.png';
import Icon from 'components/Icon/Icon';

export class Notification extends Component {

    static defaultProps = {
        type: 'success'
    }

    state = {
        show: true
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.message !== this.props.message && nextProps.message) {
            this.setState({ show: true })
        }
    }

    hide = () => {
        this.setState({ show: false });
        _.delay(this.props.clearNotifications, 1000)
    }

    render(){

        const { message, type } = this.props;

        if(!message) {
            return null;
        }

        return (
           <Modal className="box-modal-notification" onHide={this.hide} show={this.state.show}>
               <Modal.CloseButton onClick={this.hide} />
               <img src={logo} className="margin-top-small margin-bottom-small center-block" />

               <Title size="h2">{type === 'danger' ? 'אופס!' : 'הודעה'}</Title>
               <Text align="center" theme="black">{message}</Text>
           </Modal>
        )
    }
}


function mapStateToProps(state, ownProps) {
    return {
        message: state.notifications.message,
        type: state.notifications.type
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ clearNotifications }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)