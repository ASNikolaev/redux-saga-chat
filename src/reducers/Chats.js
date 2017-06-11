import Immutable from 'immutable';

import {GET_CHATS_SUCCESS, GET_CHATS_FAILURE} from '../constants';

const initialState = Immutable.Map();

function chats(state = initialState, action) {
  switch (action.type) {
    case GET_CHATS_SUCCESS:
      return state.merge({chatsList: action.chats})
    case GET_CHATS_FAILURE:
      return state.clear()
    default:
      return state
  }
}

export default chats
