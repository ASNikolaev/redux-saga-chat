import React, {PureComponent} from 'react';
import {browserHistory} from 'react-router'
import './ChatList.css'

const ChatList = ({chats, search}) => {
  return (
    <div className="chats_contents">
      {chats.filter(item => {
        return item.name.indexOf(search) !== -1
      }).map((chat, index) => {
        return <Item chat={chat} key={index}/>;
      })}
    </div>
  )
}

class Item extends PureComponent {
  openChat = () => {
    let id = this.props.chat._id;
    browserHistory.push(`/chats/${id}`)
  }

  render() {
    return (
      <div className="chat_item" onClick={this.openChat}>
        <div>{this.props.chat.name}</div>
      </div>
    )
  }
}

export default ChatList;
