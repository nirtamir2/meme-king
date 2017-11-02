import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// actions
import { clearNotifications } from 'actions/notification-actions/notification-actions';

export class Notification extends Component {

    componentWillReceiveProps(nextProps) {
        if(nextProps.message !== this.props.message) {
            _.delay(this.props.clearNotifications, 3000)
        }
    }

    render(){

        const { message } = this.props;

        if(!message) {
            return null;
        }

        return (
           <div className="box-notification">
               {message}
           </div>
        )
    }
}


function mapStateToProps(state, ownProps) {
    return {
     message: state.notifications.message
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ clearNotifications }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)