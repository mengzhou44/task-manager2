import React from 'react';
import ReactDOM from 'react-dom';
 
import { ApolloProvider } from '@apollo/react-hooks';
import { Provider } from 'react-redux';
 
import createReduxStore from './utils/create-redux-store';
import createApolloClient  from './utils/create-apollo-client';
import App from './components/app';
import * as serviceWorker from './serviceWorker';

const store = createReduxStore();

const client = createApolloClient(store);

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
