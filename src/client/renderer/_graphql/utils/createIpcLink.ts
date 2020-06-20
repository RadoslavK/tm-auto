import { ApolloLink, FetchResult, Observable } from '@apollo/client';
import { print as printQuery } from 'graphql';

import { generateId } from '../../../../_shared/generateId';
import {
  GraphqlHandlerPayload,
  SerializableGraphQLRequest,
} from '../../../../_shared/graphql/models';
import {
  GraphqlHandlerMessage,
  GraphqlHandlerMessageType,
  IpcHandler,
} from '../../../../_shared/ipc/graphqlHandlerMessages';
import { IpcClient } from '../../_ipc/ipcUtils';

export const createIpcLink = async (
  ipcClient: IpcClient,
): Promise<ApolloLink> => {
  await ipcClient.initConnection();

  return new ApolloLink((operation): Observable<FetchResult> | null => {
    const handleRequest = (
      observer: ZenObservable.SubscriptionObserver<FetchResult>,
    ): void => {
      const request: SerializableGraphQLRequest = {
        operationName: operation.operationName,
        query: printQuery(operation.query),
        variables: operation.variables,
      };

      const subscriptionId = `${request.operationName}_${generateId()}`;

      const processMessage = (message: GraphqlHandlerMessage): void => {
        switch (message.type) {
          case GraphqlHandlerMessageType.Data:
            return observer.next(message.data || {});

          case GraphqlHandlerMessageType.Error:
            return observer.error(message.error);

          case GraphqlHandlerMessageType.Complete: {
            ipcClient.unsubscribe(subscriptionId, processMessage);

            return observer.complete();
          }

          default: {
            ipcClient.unsubscribe(subscriptionId, processMessage);

            throw new Error(
              `Unknown result type, message: ${JSON.stringify(message)}`,
            );
          }
        }
      };

      ipcClient.subscribe<GraphqlHandlerMessage>(
        subscriptionId,
        processMessage,
      );
      ipcClient.sendMessage<GraphqlHandlerPayload>(IpcHandler.GraphQL, {
        request,
        subscriptionId,
      });
    };

    return new Observable((observer) => {
      handleRequest(observer);
    });
  });
};
