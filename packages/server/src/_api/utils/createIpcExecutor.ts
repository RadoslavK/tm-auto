import {
  GraphQLSchema,
  parse as parseQuery,
} from 'graphql';
import type { GraphqlHandlerPayload } from 'shared/types/graphql.js';
import {
  createGraphqlHandlerCompleteMessage,
  createGraphqlHandlerDataMessage,
  createGraphqlHandlerErrorMessage,
  GraphqlHandlerMessage,
  IpcHandler,
} from 'shared/utils/graphqlHandlerMessages.js';

import {
  broadcastMessage,
  IpcMessageHandler,
  startIpcServer,
} from '../../ipcUtils.js';
import { createApiContextProxy } from '../createApiContextProxy.js';
import { executeGraphqlOperation } from './executeGraphqlOperation.js';

type Params = {
  readonly schema: GraphQLSchema;
  readonly socketName: string;
};

export const createIpcExecutor = async ({
  schema,
  socketName,
}: Params): Promise<void> => {
  const handlers = new Map<string, IpcMessageHandler<GraphqlHandlerPayload>>();
  const context = createApiContextProxy();

  const graphqlHandler = ({ request, subscriptionId }: GraphqlHandlerPayload): void => {
    const result = executeGraphqlOperation({
      context,
      request: {
        ...request,
        query: parseQuery(request.query),
      },
      schema,
    });

    result.subscribe({
      next: (result) => {
        broadcastMessage<GraphqlHandlerMessage>(
          subscriptionId,
          createGraphqlHandlerDataMessage(result),
        );
      },
      error: (error) => {
        broadcastMessage<GraphqlHandlerMessage>(
          subscriptionId,
          createGraphqlHandlerErrorMessage(error),
        );
      },
      complete: () => {
        broadcastMessage<GraphqlHandlerMessage>(
          subscriptionId,
          createGraphqlHandlerCompleteMessage(),
        );
      },
    });
  };

  handlers.set(IpcHandler.GraphQL, graphqlHandler);
  await startIpcServer(socketName, handlers);
};
