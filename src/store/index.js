import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { Iterable } from 'immutable';

import history from '@/router/history';
import api from '@/middleware/api';
import reducer from './reducer';

const logger = createLogger({
  stateTransformer: (state) => {
    const newState = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const i of Object.keys(state)) {
      if (Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    }

    return newState;
  },
});

const router = routerMiddleware(history);

const middlewares = [router, thunk];

if (__DEV__) { // eslint-disable-line no-undef
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(thunk, api)(createStore);

const store = createStoreWithMiddleware(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // eslint-disable-line no-underscore-dangle,max-len
  applyMiddleware(...middlewares),
);

if (module.hot) {
  module.hot.accept('./reducer', () => {
    store.replaceReducer(reducer);
  });
}

export default store;
