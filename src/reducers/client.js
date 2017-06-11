import Immutable from 'immutable';
import jwtDecode from 'jwt-decode';

import {CLIENT_SET, CLIENT_UNSET, CLIENT_UNSET_SUCCESS} from '../constants'

const initialSate = Immutable.Map({isAuthorized: null, login: null, admin: null, token: null});

function client(state = initialSate, action) {
  switch (action.type) {
    case CLIENT_SET:
      return state.merge({
        isAuthorized: true,
        login: jwtDecode(action.token).sub,
        admin: jwtDecode(action.token).admin,
        token: action.token
      })

    case CLIENT_UNSET:
    case CLIENT_UNSET_SUCCESS:
      return state.merge({isAuthorized: false, login: null, admin: null, token: null})
    default:
      return state
  }
}

export default client
