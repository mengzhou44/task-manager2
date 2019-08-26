import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import App from './components/app';
import * as serviceWorker from './serviceWorker';

const cache = new InMemoryCache();

const link = new HttpLink({
  uri: 'http://localhost:3000/graphql',
  credentials: 'include'
});

const client = new ApolloClient({
  credentials: 'include',
  cache,
  link
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
