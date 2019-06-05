import ApolloClient from 'apollo-boost';
import { backend } from '../../constants/backend';

export const apolloClient = new ApolloClient({
  uri: `${backend.url}/graphql`,
});
