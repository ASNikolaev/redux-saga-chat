import Immutable from 'immutable';

import {
  GET_CHAT_SUCCESS,
  GET_CHAT_FAILURE,
  DELETE_MESSAGE,
  CLEAR_OUT_CHAT,
  ADD_MESSAGE,
  USER_CONNECTED,
  USER_DISCONNECTED
} from '../constants';

const initialState = Immutable.Map();

function chat(state = initialState, action) {
  switch (action.type) {
    case GET_CHAT_SUCCESS:
      return state.merge({currentlyChat: action.chat})
    case ADD_MESSAGE:
      return state.mergeIn([
        'currentlyChat', 'content'
      ], state.getIn(['currentlyChat', 'content']).push(action.message))
    case DELETE_MESSAGE:
      return state.mergeIn([
        'currentlyChat', 'content'
      ], state.getIn(['currentlyChat', 'content']).filter(item => {
        return item.data !== action.message.data && item.author !== action.message.author
      }))
    case USER_CONNECTED:
      return state.mergeIn(['currentlyChat'], {users: action.chatState.countCurrentlyUsers})
    case USER_DISCONNECTED:
      return state.mergeIn(['currentlyChat'], {users: action.chatState.countCurrentlyUsers})
    case GET_CHAT_FAILURE:
    case CLEAR_OUT_CHAT:
      return state.clear()
    default:
      return state
  }
}

export default chat
