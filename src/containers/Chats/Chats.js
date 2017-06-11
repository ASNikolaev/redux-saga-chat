import React, {PureComponent} from 'react';
import {browserHistory} from 'react-router'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Immutable from 'immutable';

import {unsetClient} from '../../actions/client';
import {getChatsRequest} from '../../actions/chat';

import './Chats.css';

import ChatList from '../../components/ChatList';

class Chats extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      search: ""
    }
    this.search = this.search.bind(this)
  }

  componentDidMount() {
    this.getChats()
  }

  search(e) {
    this.setState({search: e.target.value})
  }

  getChats() {
    this.props.getChatsRequest()
    this.setState({chats: this.props.chats})
  }

  logout = () => {
    this.props.unsetClient()
  }

  back = () => {
    let location = this.props.location.pathname;
    if (location === `/chats`) {
      browserHistory.push(`/chats/addChat`)
    } else {
      browserHistory.push(`/chats`)
    }
  }

  render() {
    return (
      <div className="chats_room">
        <header className="chats_header">
          <div className="chats_menu">
            <ul>
              <li className="add_chats" onClick={this.back}>
                <i className="fa fa-plus fa-2x"></i>
              </li>
              <li className="search_chats"><input type="text" placeholder="search" className="input_search" onChange={this.search}/></li>
              <li className="log_out" onClick={this.logout}>
                <i className="fa fa-sign-out fa-2x"></i>
              </li>
              <li className="helper"></li>
            </ul>
          </div>
        </header>
        <ChatList chats={this.props.chats} search={this.state.search}/>
        <div className="chats_content">
          {this.props.children}
        </div>
      </div>
    )
  }
}

Chats.propTypes = {
  unsetClient: PropTypes.func,
  getChatsRequest: PropTypes.func
}

function mapStateToProps(state) {
  return {
    chats: state.getIn([
      'chats', 'chatsList'
    ], Immutable.List()).toJS()
  }
}

const connected = connect(mapStateToProps, {unsetClient, getChatsRequest})(Chats)

export default connected
