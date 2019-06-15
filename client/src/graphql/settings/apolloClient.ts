import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink, concat, split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { backend } from '../../constants/backend';
import ApolloClient from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';

function stripTypenames(obj: any, propToDelete: string) {
  for (const property in obj) {
    if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
      delete obj.property;
      const newData = stripTypenames(obj[property], propToDelete);
      obj[property] = newData;
    } else {
      if (property === propToDelete) {
        delete obj[property];
      }
    }
  }
  return obj;
}

const removeTypenameMiddleware = new ApolloLink(
  (operation, forward) => {
    if (operation.variables) {
      operation.variables = stripTypenames(operation.variables, '__typename');
      return forward ? forward(operation) : null;
    }
  },
);


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
  link: concat(removeTypenameMiddleware, link),
  cache,
});
