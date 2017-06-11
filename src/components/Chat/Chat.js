import React, {PureComponent} from 'react';
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import Immutable from 'immutable';
import './Chat.css'

import {getChatRequest} from '../../actions/chat';
import {joinChatRequesting, sendMessage} from '../../actions/socket';

class Chat extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      join: false
    }
  }

  componentDidMount() {
    let id = this.props.location.pathname.split('/')[2]
    this.getChat(id)
  }

  componentDidUpdate() {
    this.scroll()
  }

  scroll() {
    let elem = document.getElementById('chat_message_list');
    elem.scrollTop = elem.scrollHeight;
  }

  getChat(id) {
    this.props.getChatRequest(id)
  }

  joinToChat = () => {
    this.setState({join: true})
    this.props.joinChatRequesting()
  }

  sendNewMessage = () => {
    let value = document.getElementById('input_chat').value;
    this.props.sendMessage(value)
    document.getElementById('input_chat').value = ""
  }

  back = () => {
    browserHistory.push(`/chats`)
  }

  render() {
    let login = this.props.user.login;
    let content = this.props.chat.content;
    return (
      <div className="chat_wrap">
        <div className="chat_header">
          <div className="back-button" onClick={this.back}>
            <i className="fa fa-arrow-left fa-2x"></i>
          </div>
          <div className="chat_name">{this.props.chat.name}</div>
          <div className="chat_users">{(this.props.chat.users)
              ? `Users: ${this.props.chat.users}`
              : ``}</div>
        </div>
        <div className="chat_content" id="chat_message_list">

          {(this.state.join)
            ? content.map((item, index) => {
              return <div key={index} className={`chat_message_user ${ (login === item.author)
                ? 'chat_message_user_author'
                : ``}`}>{item.author}: {item.data}</div>
            })
            : ``}

        </div>
        <div className="chat_footer">
          {(!this.state.join)
            ? <input type="button" value="Join to chat" onClick={this.joinToChat} className="joinChatButton"/>
            : <div>
              <input type="text" placeholder="send message" id="input_chat" className="inputChatButton"/>
              <input className="sendChatButton" onClick={this.sendNewMessage} type="button" value="Send"/>
            </div>
}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    chat: state.getIn([
      'chat', 'currentlyChat'
    ], Immutable.List()).toJS(),
    user: state.getIn(['client'], Immutable.List()).toJS()
  }
}

const connected = connect(mapStateToProps, {sendMessage, getChatRequest, joinChatRequesting})(Chat)

export default connected
