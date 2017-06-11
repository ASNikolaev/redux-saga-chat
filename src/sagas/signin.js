import {call, select, put} from 'redux-saga/effects'
import {takeLatest} from 'redux-saga';
import {browserHistory} from 'react-router'
import {actions as toastrActions} from 'react-redux-toastr';

import {loginApi} from '../fetch'
import {setClient} from '../actions/client'
import {LOGIN_REQUESTING, CLIENT_UNSET, CLIENT_UNSET_SUCCESS} from '../constants'

const getForm = (state, form) => {
  return state.getIn(['form', form]).toJS();
}

function * logout() {
  try {
    yield put({type: CLIENT_UNSET_SUCCESS});
    localStorage.removeItem('token')
    browserHistory.push('/app')
  } catch (e) {
    yield put(toastrActions.add({type: 'error', title: 'Chats', message: 'Sorry, an error occured!'}));
  }
}

function * loginFlow() {
  try {
    const credentials = yield select(getForm, 'login');
    const {login, password} = credentials.values;
    let token = yield call(loginApi, login, password)
    yield put(setClient(token))
    yield put(toastrActions.add({type: 'success', title: 'Chats', message: "Successful authorization"}));
    localStorage.setItem('token', JSON.stringify(token))
    browserHistory.push('/Chats')
  } catch (e) {
    let message = ""
    if (e.status === 400)
      message = 'Invalid email/password';
    else if (e.status === 500)
      message = 'Sorry, an server error'
    else
      message = 'Sorry, an error occured!';
    
    yield put(toastrActions.add({type: 'error', title: 'Chats', message: message}));
  }
}

function * loginWatcher() {
  yield takeLatest(LOGIN_REQUESTING, loginFlow);
}
function * logoutWatcher() {
  yield takeLatest(CLIENT_UNSET, logout)
}

export {loginWatcher, logoutWatcher}
