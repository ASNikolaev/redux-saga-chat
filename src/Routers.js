import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Provider} from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import {syncHistoryWithStore} from 'react-router-redux';

import Container from './containers/container';
import Chats from './containers/Chats';

import configureStore from './store';

import App from './components/App';
import Signin from './components/signin';
import Signup from './components/signup';
import PageNotFound from './components/PageNotFound';
import ChatForm from './components/ChatForm';
import Chat from './components/Chat';

import {checkIndexAuthorization, checkChatAuthorization} from './lib/check-auth';

const store = configureStore();

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState(state) {
    return state.get('routing').toObject();
  }
})

const Routers = () => {
  return (
    <Provider store={store}>
      <div className="wrap">
        <Router history={history}>
          <Route path='/' component={Container}>
            <IndexRoute onEnter={checkIndexAuthorization(store)}/>
            <Route path='app' component={App}></Route>
            <Route path='signin' component={Signin}/>
            <Route path='signup' component={Signup}/>
          </Route>
          <Route onEnter={checkChatAuthorization(store)} path='/chats' component={Chats}>
            <IndexRoute/>
            <Route path='addChat' component={ChatForm}></Route>
            <Route path=':id' component={Chat}></Route>
          </Route>
          <Route path="*" onEnter={checkIndexAuthorization(store)} component={PageNotFound}></Route>
        </Router>
        <ReduxToastr timeOut={2000} newestOnTop={false} preventDuplicates position="bottom-right" transitionIn="fadeIn" transitionOut="fadeOut" progressBar/>
      </div>
    </Provider>
  )
}

export default Routers;
