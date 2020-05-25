import {
  ApolloLink,
  execute as executeLink,
} from 'apollo-link';
import { parse as parseQuery } from 'graphql';

import { GraphqlHandlerPayload } from '../_shared/graphql/models';
import {
  createGraphqlHandlerCompleteMessage,
  createGraphqlHandlerDataMessage,
  createGraphqlHandlerErrorMessage,
  GraphqlHandlerMessage,
  IpcHandler,
} from '../_shared/ipc/graphqlHandlerMessages';
import {
  broadcastMessage,
  IpcMessageHandler,
  startIpcServer,
} from './ipcUtils';

type Params = {
  readonly link: ApolloLink;
  readonly socketName: string;
};

export const createIpcExecutor = async (parms: Params): Promise<void> => {
  const {
    link,
    socketName,
  } = parms;

  const handlers = new Map<string, IpcMessageHandler<GraphqlHandlerPayload>>();

  const graphqlHandler = (payload: GraphqlHandlerPayload): void => {
    const { request, subscriptionId } = payload;
    const result = executeLink(link, {
      ...request,
      query: parseQuery(request.query),
    });

    result.subscribe(
      data => {
        broadcastMessage<GraphqlHandlerMessage>(subscriptionId, createGraphqlHandlerDataMessage(data));
      },
      error => {
        broadcastMessage<GraphqlHandlerMessage>(subscriptionId, createGraphqlHandlerErrorMessage(error));
      },
      () => {
        broadcastMessage<GraphqlHandlerMessage>(subscriptionId, createGraphqlHandlerCompleteMessage());
      },
    );
  };

  handlers.set(IpcHandler.GraphQL, graphqlHandler);

  await startIpcServer(socketName, handlers);
};