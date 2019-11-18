import ipc from 'node-ipc';
import { IClientMessage } from '../_shared/ipc/clientMessages';
import {
  createServerBroadcastMessage,
  createServerErrorMessage,
  createServerReplyMessage,
} from '../_shared/ipc/serverMessages';

export interface IHandler<TPayload = {}, TResult = void> {
  (payload: TPayload): Promise<TResult>;
}

export const startIpcServer = async <TPayload = {}, TResult = never>(socketName: string, handlers : Map<string, IHandler<TPayload, TResult>>): Promise<void> => {
  return new Promise((resolve, reject) => {
    ipc.config.id = socketName;
    ipc.config.silent = true;

    ipc.serve(() => {
      ipc.server.on('message', async (messageData: string, socket: any) => {
        const message = JSON.parse(messageData) as IClientMessage<TPayload>;
        const { id, name, payload } = message;

        const handler = handlers.get(name);

        if (handler) {
          try {
            const result = await handler(payload);
            const replyData = createServerReplyMessage(id, result);

            ipc.server.emit(
              socket,
              'message',
              JSON.stringify(replyData),
            );
          } catch(error) {
            const errorData = createServerErrorMessage(id);

            ipc.server.emit(
              socket,
              'message',
              JSON.stringify(errorData),
            );

            throw error;
          }
        } else {
          console.warn(`No handler for method: ${name}`);
          const replyData = createServerReplyMessage(id, null);

          ipc.server.emit(
            socket,
            'message',
            JSON.stringify(replyData)
          );
        }
      });

      resolve();
    });

    ipc.server.start();
  });
};

export const broadcastMessage = <TPayload>(name: string, payload: TPayload): void => {
  const messageData = createServerBroadcastMessage(name, payload);

  // @ts-ignore
  ipc.server.broadcast('message', JSON.stringify(messageData));
};
