import {
  ApolloLink,
  execute as executeLink,
} from 'apollo-link';
import { parse as parseQuery } from 'graphql';
import {
  broadcastMessage,
  IHandler,
  startIpcServer,
} from './ipcUtils';
import { IGraphqlHandlerPayload } from '../_shared/graphql/models';
import {
  createGraphqlHandlerCompleteMessage,
  createGraphqlHandlerDataMessage,
  createGraphqlHandlerErrorMessage,
  GraphqlHandlerMessage,
  IpcHandler,
} from '../_shared/ipc/graphqlHandlerMessages';

interface IIpcExecutorOptions {
  readonly link: ApolloLink;
  readonly socketName: string;
}

export const createIpcExecutor = async (options: IIpcExecutorOptions): Promise<void> => {
  const {
    link,
    socketName,
  } = options;

  const handlers = new Map<string, IHandler<IGraphqlHandlerPayload, void>>();

  const graphqlHandler = async (payload: IGraphqlHandlerPayload): Promise<void> => {
    const { subscriptionId, request } = payload;
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