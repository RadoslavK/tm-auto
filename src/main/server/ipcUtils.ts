import { Socket } from 'net';

import ipc from 'node-ipc';

import { ClientMessage } from '../../_shared/ipc/clientMessages';
import {
  createServerBroadcastMessage,
  createServerErrorMessage,
  createServerReplyMessage,
} from '../../_shared/ipc/serverMessages.js';

export type IpcMessageHandler<TPayload = unknown, TResult = void> = (
  payload: TPayload,
) => TResult;

export const startIpcServer = async <TPayload = unknown, TResult = never>(
  id: string,
  handlers: Map<string, IpcMessageHandler<TPayload, TResult>>,
): Promise<void> =>
  new Promise((resolve) => {
    ipc.config.id = id;
    ipc.config.silent = true;

    const path = ipc.config.socketRoot + ipc.config.appspace + id;

    ipc.serve(path, () => {
      ipc.server.on(
        'message',
        (message: ClientMessage<TPayload>, socket: Socket) => {
          const { id, name, payload } = message;

          const handler = handlers.get(name);

          if (handler) {
            try {
              const result = handler(payload);
              const replyData = createServerReplyMessage(id, result);

              ipc.server.emit(socket, 'message', replyData);
            } catch (error) {
              const errorData = createServerErrorMessage(id, error);

              console.error(error.stack);

              ipc.server.emit(socket, 'message', errorData);

              throw error;
            }
          } else {
            console.warn(`No handler for method: ${name}`);
            const replyData = createServerReplyMessage(id, null);

            ipc.server.emit(socket, 'message', replyData);
          }
        },
      );

      resolve();
    });

    ipc.server.start();
  });

export const broadcastMessage = <TPayload>(
  name: string,
  payload: TPayload,
): void => {
  const message = createServerBroadcastMessage(name, payload);

  // @ts-ignore
  ipc.server.broadcast('message', message);
};
