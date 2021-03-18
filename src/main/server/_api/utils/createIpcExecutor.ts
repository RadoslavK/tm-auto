import {
  GraphQLSchema,
  parse as parseQuery,
} from 'graphql';

import { GraphqlHandlerPayload } from '../../../../_shared/graphql/models.js';
import {
  GraphqlHandlerMessage,
  IpcHandler,
  createGraphqlHandlerCompleteMessage,
  createGraphqlHandlerDataMessage,
  createGraphqlHandlerErrorMessage,
} from '../../../../_shared/ipc/graphqlHandlerMessages.js';
import {
  IpcMessageHandler,
  broadcastMessage,
  startIpcServer,
} from '../../ipcUtils.js';
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

  const graphqlHandler = ({ request, subscriptionId }: GraphqlHandlerPayload): void => {
    const result = executeGraphqlOperation({
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
