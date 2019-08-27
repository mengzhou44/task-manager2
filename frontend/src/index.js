import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, { InMemoryCache} from 'apollo-boost';
 
import { ApolloProvider } from '@apollo/react-hooks';

import App from './components/app';
import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache();
 
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include',
  cache,
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
