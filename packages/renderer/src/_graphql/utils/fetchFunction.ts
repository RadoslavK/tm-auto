import type {
  GraphQLResponse,
  RequestParameters,
  Variables,
} from 'relay-runtime';
import type { Sink } from 'relay-runtime/lib/network/RelayObservable';
import type {
  GraphqlHandlerPayload,
  SerializableGraphQLRequest,
} from 'shared/types/models.js';
import { generateId } from 'shared/utils/generateId.js';
import {
  GraphqlHandlerMessage,
  GraphqlHandlerMessageType,
  IpcHandler,
} from 'shared/utils/graphqlHandlerMessages.js';

import type { IpcClient } from '../../_ipc/ipcUtils.js';

type Params = {
  readonly ipcClient: IpcClient;
  readonly request: RequestParameters;
  readonly sink: Sink<GraphQLResponse>;
  readonly variables: Variables;
};

export const fetchFunction = ({
  ipcClient,
  request,
  sink,
  variables,
}: Params) => {
  if (typeof request.text !== 'string') {
    sink.error(new Error('No query found'));

    return;
  }

  const body: SerializableGraphQLRequest = {
    name: request.name,
    query: request.text,
    variables,
  };

  const subscriptionId = `${request.name}_${generateId()}`;

  const processMessage = (message: GraphqlHandlerMessage): void => {
    switch (message.type) {
      case GraphqlHandlerMessageType.Data: {
        // TODO can data and errors be at the same time?
        return message.payload.data
          ? sink.next({
            data: message.payload.data,
          })
          : sink.next({
            errors: message.payload.errors!.map(e => (
              {
                message: e.message,
              }
            )),
          });
      }

      case GraphqlHandlerMessageType.Error: {
        sink.error({
          name: 'TODO',
          message: message.error.message,
          stack: message.error.stack,
        });

        throw message.error;
      }

      case GraphqlHandlerMessageType.Complete: {
        ipcClient.unsubscribe(subscriptionId, processMessage);

        return sink.complete();
      }

      default: {
        ipcClient.unsubscribe(subscriptionId, processMessage);

        throw new Error(`Unknown result type, message: ${JSON.stringify(message)}`);
      }
    }
  };

  ipcClient.subscribe<GraphqlHandlerMessage>(
    subscriptionId,
    processMessage,
  );

  ipcClient.sendMessage<GraphqlHandlerPayload>(IpcHandler.GraphQL, {
    request: body,
    subscriptionId,
  },{
    onError: console.error,
  });
};