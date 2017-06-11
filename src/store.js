import createSagaMiddleware from 'redux-saga'
import {applyMiddleware, createStore, compose} from 'redux'

import IndexReducer from './reducers'
import IndexSagas from './sagas'

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const composeSetup = process.env.NODE_ENV !== 'production' && typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;
  const store = createStore(IndexReducer, composeSetup(applyMiddleware(sagaMiddleware)),);

  sagaMiddleware.run(IndexSagas)
  return store
}

export default configureStore;
