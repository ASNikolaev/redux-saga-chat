import jwtDecode from 'jwt-decode';
import {setClient, unsetClient} from '../actions/client'

function checkAuthorization(dispatch) {
  const storedToken = localStorage.getItem('token')

  if (storedToken) {
    const token = JSON.parse(storedToken)

    var relevance = false;
    const currentlyDate = new Date().getTime() / 1000;
    const tokenDate = new Date(jwtDecode(token).exp).getTime();

    var restTime = tokenDate - currentlyDate;
    if (restTime && restTime > 0) {
      relevance = true;
    }

    if (!relevance) {
      dispatch(unsetClient())
      return false
    }
    dispatch(setClient(token));
    return true
  }

  return false
}

export function checkIndexAuthorization({dispatch}) {
  return (nextState, replace, next) => {
    if (checkAuthorization(dispatch)) {
      replace('chats')

      return next()
    }
    replace('app')
    return next()
  }
}

export function checkChatAuthorization({dispatch, getState}) {
  return (nextState, replace, next) => {
    const client = getState().client

    if (client && client.token)
      return next()

    if (checkAuthorization(dispatch))
      return next()
    replace('app')
    return next()
  }
}
