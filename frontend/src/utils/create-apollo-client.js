import { ApolloClient, InMemoryCache } from 'apollo-boost';

import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const createApolloClient = store => {
  const httpLink = createHttpLink({
    uri: 'http://localhost:3000/graphql'
  });

  const authLink = setContext((_, { headers }) => {
    const token = store.getState().auth.token;

    if (token === '') {
      return {
        headers
      };
    }
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
};

export default createApolloClient;
