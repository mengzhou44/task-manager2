import { compose, createStore, applyMiddleware } from 'redux';
import persistState from 'redux-localstorage';
import reduxThunk from 'redux-thunk';

import reducers from '../reducers';

const createReduxStore = () => {
  const enhancer = compose(persistState(/*paths, config*/));

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */

  return createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(reduxThunk), enhancer)
  );
};

export default createReduxStore;
