import {combineReducers} from 'redux-immutable';
import {reducer as form} from 'redux-form/immutable';
import {reducer as toastr} from 'react-redux-toastr'

import routing from './routing';
import client from './client'
import chats from './Chats'
import chat from './chat'

const IndexReducer = combineReducers({
  routing,
  chat,
  chats,
  client,
  form,
  toastr
})

export default IndexReducer
