import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {reduxForm, Field} from 'redux-form/immutable'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'

import './ChatForm.css'

import {createChatRequest} from '../../actions/chat'

class ChatForm extends PureComponent {

  back = () => {
    browserHistory.push(`/chats`)
  }

  submit = () => {
    this.props.createChatRequest()
  }

  render() {
    const {handleSubmit} = this.props
    return (
      <div className="chat_form_component">
        <div className="back-button" onClick={this.back}>
          <i className="fa fa-arrow-left fa-2x"></i>
        </div>
        <div>
          <form className="chat_form" onSubmit={handleSubmit(this.submit)}>
            <h1>Create a chat</h1>
            <label htmlFor="name">Name</label><br/>
            <Field name="name" type="text" id="name" className="name" label="name" component="input"/><br/>
            <button action="submit">Create a chat</button><br/>
          </form>
        </div>
      </div>
    )
  }
}

ChatForm.propTypes = {
  handleSubmit: PropTypes.func,
  createChatRequest: PropTypes.func
}

const connected = connect(null, {createChatRequest})(ChatForm);
const formed = reduxForm({form: 'createChat'})(connected);

export default formed;
