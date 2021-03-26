import type { ExecutionResult } from 'graphql';
import type { GraphqlHandlerPayload } from 'shared/types/models.js';
import type {
  Observer,
  Unsubscribable,
} from 'shared/types/observable.js';
import { generateId } from 'shared/utils/generateId.js';
import {
  GraphqlHandlerMessage,
  GraphqlHandlerMessageType,
  IpcHandler,
} from 'shared/utils/graphqlHandlerMessages.js';

import type { IpcClient } from '../../_ipc/ipcUtils.js';

export type RequestBody = {
  readonly name: string;
  readonly query: string;
  readonly variables: Record<string, any>;
}

type Params<TResult> = {
  readonly getData: (data: ExecutionResult) => TResult;
  readonly ipcClient: IpcClient;
  readonly observer: Observer<TResult>;
  readonly request: RequestBody;
};

export const fetchFunction = <TResult>({
  getData,
  ipcClient,
  observer,
  request,
}: Params<TResult>): Unsubscribable => {
  const subscriptionId = `${request.name}_${generateId()}`;

  const processMessage = (message: GraphqlHandlerMessage): void => {
    switch (message.type) {
      case GraphqlHandlerMessageType.Data: {
        return observer.next(getData(message.payload));
      }

      case GraphqlHandlerMessageType.Error: {
        observer.error({
          name: 'TODO',
          message: message.error.message,
          stack: message.error.stack,
        });

        throw message.error;
      }

      case GraphqlHandlerMessageType.Complete: {
        ipcClient.unsubscribe(subscriptionId, processMessage);

        return observer.complete();
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
    request,
    subscriptionId,
  },{
    onError: console.error,
  });

  return {
    unsubscribe: () => ipcClient.unsubscribe(subscriptionId, processMessage),
  };
};