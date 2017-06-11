import {call, select, put} from 'redux-saga/effects';
import {takeLatest} from 'redux-saga';
import {browserHistory} from 'react-router';
import {actions as toastrActions} from 'react-redux-toastr';

import {CREATE_CHAT_REQUESTING, GET_CHATS_REQUESTING, GET_CHAT_REQUESTING} from '../constants';
import {getChatsSuccess, getChatsFailure, getChatsRequest, getChatSuccess, getChatFailure} from '../actions/chat'

import {unsetClient} from '../actions/client'

import {createChatApi, getChatsApi, getChatApi} from '../fetch'

const getForm = (state, form) => {
  return state.getIn(['form', form]).toJS();
}

function * createChatFlow() {
  try {
    const credentials = yield select(getForm, 'createChat');
    const {name} = credentials.values;
    const token = localStorage.getItem('token');
    yield call(createChatApi, name, token)
    yield put(toastrActions.add({type: 'success', title: 'Chats', message: "Chat was created"}));
    yield put(getChatsRequest())
    browserHistory.push('/Chats')

  } catch (e) {
    let message = ""
    switch (e.status) {
      case 500:
        message = 'Sorry, an server error'
        break;
      case 401 || 403:
        yield put(unsetClient());
        message = 'you are not authorized';
        break;
      default:
        message = 'Sorry, an error occured!';
    }

    yield put(toastrActions.add({type: 'error', title: 'Chats', message: message}));
  }
}

function * createChatWatch() {
  yield takeLatest(CREATE_CHAT_REQUESTING, createChatFlow);
}

function * getChatsFlow() {
  try {
    const token = localStorage.getItem('token');
    let result = yield call(getChatsApi, token)
    yield put(getChatsSuccess(result));
  } catch (e) {
    let message = ""
    switch (e.status) {
      case 500:
        browserHistory.push(`/chats`);
        message = 'Sorry, an server error'
        break;
      case 401 || 403:
        yield put(unsetClient());
        message = 'you are not authorized';
        break;
      default:
        browserHistory.push(`/chats`);
        message = 'Sorry, an error occured!';
    }

    yield put(toastrActions.add({type: 'error', title: 'Chats', message: message}));
    yield put(getChatsFailure());
  }
}

function * getChatsWatch() {
  yield takeLatest(GET_CHATS_REQUESTING, getChatsFlow);
}

function * getChatFlow(action) {
  try {
    const token = localStorage.getItem('token');
    const id = action.id;
    let result = yield call(getChatApi, id, token)
    yield put(getChatSuccess(result))
  } catch (e) {
    let message = ""
    switch (e.status) {
      case 500:
        browserHistory.push(`/chats`);
        message = 'Sorry, an server error'
        break;
      case 401 || 403:
        yield put(unsetClient());
        message = 'you are not authorized';
        break;
      default:
        browserHistory.push(`/chats`);
        message = 'Sorry, an error occured!';
    }

    yield put(getChatFailure());
    yield put(toastrActions.add({type: 'error', title: 'Chat', message: message}));
  }
}

function * getChatWatch() {
  yield takeLatest(GET_CHAT_REQUESTING, getChatFlow)
}

export {createChatWatch, getChatsWatch, getChatWatch}
