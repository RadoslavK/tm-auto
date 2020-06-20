import { ApolloLink } from '@apollo/client';
import { onError } from '@apollo/link-error';

export const createErrorLink = (): ApolloLink =>
  onError(({ graphQLErrors, networkError, operation }) => {
    console.error(
      `Operation: ${operation.operationName}, Variables: ${JSON.stringify(
        operation.variables,
      )}`,
    );

    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, path, stack }) => {
        console.error(`[GraphQL Error]: Path: ${JSON.stringify(path)}`);
        console.error(message);
        console.error(stack);
      });
    }
    if (networkError) {
      console.error(`[Network error]: ${JSON.stringify(networkError.message)}`);
      console.error(networkError.stack);
    }
  });
