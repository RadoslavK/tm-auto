import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { backend } from '../../constants/backend';
import ApolloClient from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
  uri: `${backend.url}/graphql`,
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:3000/subscriptions',
  options: {
    reconnect: true,
    lazy: true,
  },
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition'
      && definition.operation === 'subscription';
  },
  wsLink,
  httpLink,
);

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link,
  cache,
});
