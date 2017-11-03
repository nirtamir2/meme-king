import React, { Component } from 'react'
import { connect } from 'react-redux'

// components
import Form from 'react-bootstrap/lib/Form'
import Button from 'components/Button/Button'
import Title from 'components/Title/Title'

// actions
import { sendMessageToAdmin } from 'actions/admin-actions/admin-actions'

class ContactPage extends Component {

    state = {
        name: '',
        email: '',
        message: ''
    }

    updateForm = (value, type) => {
        this.setState({ [type]: value })
    }

    sendForm = () => {
        const { name, email, message, } = this.state
        this.props.sendMessageToAdmin({ name, email, message }).then(() => {
            this.setState({ name: '', email: '', message: '' })
        })
    }

    render() {

        return (
            <div className="box-contact-page container">
                <Title>
                    בקשות ודיווחים על באגים
                </Title>

                <Title size="h3" className="text-center margin-top-medium margin-bottom-medium">
                    אם גיליתם באגים, יש לכם הצעות לשיפור או שברצונכם להוסיף ממים למאגר, מוזמנים לשלוח לי הודעה.
                </Title>
                <Form >
                    <div className="flex inputs-wrapper">
                        <input value={this.state.name} onChange={(e) => this.updateForm(e.target.value, 'name')}
                               placeholder="שם" type="name"/>
                        <input value={this.state.email} onChange={(e) => this.updateForm(e.target.value, 'email')}
                               placeholder="אי-מייל" type="email"/>
                        <textarea value={this.state.message}
                                  onChange={(e) => this.updateForm(e.target.value, 'message')} placeholder="הודעה"/>
                    </div>
                    {this.props.isLoading ? <h1 className="text-center">שולח...</h1> :
                        <Button center onClick={this.sendForm} type="submit"> שליחה</Button>}
                </Form>

            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        isLoading: state.postsRequests.isLoading
    }
}

export default connect(mapStateToProps, { sendMessageToAdmin })(ContactPage)

