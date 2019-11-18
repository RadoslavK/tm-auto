import {
  ApolloLink,
  FetchResult,
  Observable,
  Operation,
} from 'apollo-link';
import { print as printQuery } from 'graphql';
import {
  init,
  send,
  subscribe,
} from '../../ipc/ipcUtils';
import {
  IGraphqlHandlerPayload,
  ISerializableGraphQLRequest,
} from '../../../_shared/graphql/models';
import {
  GraphqlHandlerMessage,
  GraphqlHandlerMessageType,
  IpcHandler,
} from '../../../_shared/ipc/graphqlHandlerMessages';

export const createIpcLink = async (): Promise<ApolloLink> => {
  await init();

  let counter = 0;

  return new ApolloLink((
    operation: Operation,
    forward?: (operation: Operation) => Observable<FetchResult>,
  ): Observable<FetchResult> | null => {
    const handleRequest = async (observer: ZenObservable.SubscriptionObserver<FetchResult>): Promise<void> => {
      const request: ISerializableGraphQLRequest = {
        operationName: operation.operationName,
        variables: operation.variables,
        query: printQuery(operation.query),
        context: operation.getContext(),
      };

      const processMessage = (message: GraphqlHandlerMessage): void => {
        switch (message.type) {
          case GraphqlHandlerMessageType.Data:
            return observer.next(message.data || {});

          case GraphqlHandlerMessageType.Error:
            return observer.error(message.error);

          case GraphqlHandlerMessageType.Complete:
            return observer.complete();

          default:
            throw new Error(`Unknown result type, message: ${JSON.stringify(message)}`);
        }
      };

      const subscriptionId = `${++counter}`;
      subscribe<GraphqlHandlerMessage>(subscriptionId, processMessage);
      await send<IGraphqlHandlerPayload>(IpcHandler.GraphQL, { subscriptionId, request });
    };

    return new Observable(observer => {
      handleRequest(observer);
    });
  });
};