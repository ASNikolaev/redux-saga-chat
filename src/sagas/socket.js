import {eventChannel} from 'redux-saga';
import {LOCATION_CHANGE} from 'react-router-redux';
import {
  call,
  select,
  fork,
  take,
  put,
  cancel
} from 'redux-saga/effects';
import io from 'socket.io-client';
import {actions as toastrActions} from 'react-redux-toastr';
import {unsetClient} from '../actions/client'
import {addMessage} from '../actions/messages'
import {clearOutChat} from '../actions/chat'
import {userConnected, userDisconnected} from '../actions/socket'
import {JOIN_CHAT_REQUESTING, SEND_MESSAGE} from '../constants';

const getUser = (state) => {
  return state.getIn(['client']).toJS();
}
const getChat = (state) => {
  return state.getIn(['chat', 'currentlyChat']).toJS();
}

function connect(user, chat) {
  const socket = io('http://localhost:8250', {'query': `token=${user.token}`});
  return new Promise((resolve, rejected) => {

    socket.on('connect', () => {
      socket.emit('room', Object.assign({}, chat, {
        user: user.login,
        admin: user.admin
      }))
      resolve(socket);
    })
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on('client message', res => {
      ///доделать обновление чата  не загружать историю при открытие чата, загружать при присойденение
      emit(addMessage(res))
    });
    socket.on('typing', res => {
      ///при наборе сообщение юзером
      console.log(res)
    });
    socket.on('unauthorized', err => {
      emit(unsetClient())
    });
    socket.on('connected', res => {
      /// имья подключившегося и новый список
      emit(userConnected(res))
      emit(toastrActions.add({type: 'info', title: 'connected', message: `${res.newUser} connected`}))
    });
    socket.on('disconnect', res => {
      emit(toastrActions.add({type: 'info', title: 'connected', message: `server error`}));
    })
    socket.on('disconnected', res => {
      emit(toastrActions.add({type: 'info', title: 'disconnected', message: `${res.lostUser} disconnected`}))
      emit(userDisconnected(res))
    });
    socket.on('error message', res => {
      ///сообщение не сохранилось в базу данных или произошла ощибка
      emit(toastrActions.add({type: 'error', title: 'disconnected', message: `Message was not sent`}))
    });
    return () => {}
  })
}

function * write(socket, user, chat) {
  while (true) {
    const payload = yield take(SEND_MESSAGE);
    const login = user.login
    socket.emit('message', Object.assign({}, payload, {login}));
  }
}

function * read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action)
  }
}

function * handleIO(socket, user, chat) {
  yield fork(read, socket);
  yield fork(write, socket, user, chat);
}

function * joinChatWatcher() {
  while (true) {
    let payload = yield take(JOIN_CHAT_REQUESTING);
    const user = yield select(getUser);
    const chat = yield select(getChat);
    const socket = yield call(connect, user, chat)
    const task = yield fork(handleIO, socket, user, chat);
    let action = yield take(LOCATION_CHANGE);
    yield cancel(task);
    yield put(clearOutChat())
    socket.disconnect()
  }
}

export {joinChatWatcher};
