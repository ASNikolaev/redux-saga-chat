import {takeLatest} from 'redux-saga';
import {call, select, put} from 'redux-saga/effects'
import {actions as toastrActions} from 'react-redux-toastr';

import {SIGNUP_REQUESTING} from '../constants'

import {signupApi} from '../fetch'

const getForm = (state, form) => {
  return state.getIn(['form', form]).toJS();
}

function * signupFlow() {
  try {
    const credentials = yield select(getForm, 'signup');
    const {email, login, password} = credentials.values;
    yield call(signupApi, email, login, password)
    yield put(toastrActions.add({type: 'success', title: 'Chats', message: "Account was successfully created"}));
  } catch (e) {
    let message = '';
    if (e.status === 400)
      message = 'Email is already taken';
    else
      message = 'Sorry, an error occured!';

    yield put(toastrActions.add({type: 'error', title: 'Chats', message: message}));
  }
}

function * signupWatcher() {
  yield takeLatest(SIGNUP_REQUESTING, signupFlow)
}

export {signupWatcher}
