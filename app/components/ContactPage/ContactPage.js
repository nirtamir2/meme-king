import _ from 'lodash';
import React, { Component } from 'react'
import { connect } from 'react-redux'

// components
import Form from 'react-bootstrap/lib/Form'
import Button from 'components/Button/Button'
import Text from 'components/Text/Text';
import Modal from 'components/Modal/Modal'
import GeneratorModal from 'components/GeneratorModal/GeneratorModal';

// actions
import { sendMessageToAdmin, fetchUserMessages } from 'actions/user-messages-actions/user-messages-actions';

// helpers
import helpers from 'helpers/helpers';

class ContactPage extends Component {

    state = {
        name: '',
        email: '',
        message: '',
        type: 'bug'
    }

    updateForm = (value, type) => {
        this.setState({ [type]: value })
    }

    sendForm = () => {
        const { name, email, message, type } = this.state
        this.props.sendMessageToAdmin({ name, email, message, type, id: helpers.uniqueId(), date: new Date().toDateString() }).then(() => {
            this.setState({ name: '', email: '', message: '' });

            _.delay(() => { this.props.history.goBack(); this.props.fetchUserMessages();}, 1000);
        })
    }

    render() {

        const { isLoading, history } = this.props;
        const { name, email, message, type } = this.state;
        return (
            <Modal onHide={() => history.goBack()} show={true} className="box-contact-page">
                <GeneratorModal.CloseButton theme="white" onClick={() => history.goBack()} />
                <Form >
                    <div className="flex inputs-wrapper">
                        <input value={name} onChange={(e) => this.updateForm(e.target.value, 'name')}
                               placeholder="שם" type="name"/>
                        <input value={email} onChange={(e) => this.updateForm(e.target.value, 'email')}
                               placeholder="אי-מייל" type="email"/>
                        <div className="radios-wrapper margin-top-medium">
                            <span className="clearfix radio-label margin-left-small pull-right">
                                <input onChange={() => this.updateForm('bug', 'type')} checked={type === 'bug'} className="pull-right margin-left-small" type="radio" name="type"/>
                                <Text className="pull-right" inline> באג</Text>
                            </span>
                            <span className="clearfix radio-label margin-left-small pull-right">
                                <input onChange={() => this.updateForm('proposal', 'type')} checked={type === 'proposal'} className="pull-right margin-left-small" type="radio" name="type"/>
                                <Text className="pull-right" inline> הצעה</Text>
                            </span>
                        </div>
                        <textarea value={message} onChange={(e) => this.updateForm(e.target.value, 'message')} placeholder="הודעה"/>
                    </div>
                    <Button center onClick={this.sendForm} isLoading={isLoading} type="submit"> שליחה</Button>
                </Form>

            </Modal>

        )
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.userMessages.isLoading
    }
}

export default connect(mapStateToProps, { sendMessageToAdmin, fetchUserMessages})(ContactPage)

