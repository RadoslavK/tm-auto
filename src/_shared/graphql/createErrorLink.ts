import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';

export const createErrorLink = (): ApolloLink => {
  return onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ path, stack, message }) => {
        console.error(`[GraphQL error]: Operation: ${operation.operationName}, Path: ${JSON.stringify(path)}, Variables: ${JSON.stringify(operation.variables)}`);
        console.error(message);
        console.error(stack);
      });
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });
};