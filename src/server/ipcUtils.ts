import ipc from 'node-ipc';

import { ClientMessage } from '../_shared/ipc/clientMessages';
import {
  createServerBroadcastMessage,
  createServerErrorMessage,
  createServerReplyMessage,
} from '../_shared/ipc/serverMessages';

export type IpcMessageHandler<TPayload = unknown, TResult = void> = (payload: TPayload) => TResult;

export const startIpcServer = async <TPayload = unknown, TResult = never>(socketName: string, handlers: Map<string, IpcMessageHandler<TPayload, TResult>>): Promise<void> => new Promise(resolve => {
  ipc.config.id = socketName;
  ipc.config.silent = true;

  ipc.serve(() => {
    ipc.server.on('message', (message: ClientMessage<TPayload>, socket: any) => {
      const { id, name, payload } = message;

      const handler = handlers.get(name);

      if (handler) {
        try {
          const result = handler(payload);
          const replyData = createServerReplyMessage(id, result);

          ipc.server.emit(
            socket,
            'message',
            replyData,
          );
        } catch (error) {
          const errorData = createServerErrorMessage(id, error);

          console.error(error.stack);

          ipc.server.emit(
            socket,
            'message',
            errorData,
          );

          throw error;
        }
      } else {
        console.warn(`No handler for method: ${name}`);
        const replyData = createServerReplyMessage(id, null);

        ipc.server.emit(
          socket,
          'message',
          replyData,
        );
      }
    });

    resolve();
  });

  ipc.server.start();
});

export const broadcastMessage = <TPayload>(name: string, payload: TPayload): void => {
  const message = createServerBroadcastMessage(name, payload);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  ipc.server.broadcast('message', message);
};
