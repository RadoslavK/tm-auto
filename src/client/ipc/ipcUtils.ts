import {
  ServerMessage,
  ServerMessageType,
} from '../../_shared/ipc/serverMessages';
import { IClientMessage } from '../../_shared/ipc/clientMessages';

interface IReplyHandler {
  readonly resolve: (value: any) => void;
  readonly reject: any;
}

interface IListener<TPayload = {}> {
  (payload: TPayload): void;
}

const replyHandlers = new Map<string, IReplyHandler>();
const listenersMap = new Map<string, IListener<any>[]>();

let messageQueue: string[] = [];
let socketClient: any | null = null;

const connectSocket = (socketName: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // @ts-ignore
    window.ipcConnect(socketName, client => {
      client.on('message', (messageData: string) => {
        const message = JSON.parse(messageData) as ServerMessage;

        switch (message.type) {
          case ServerMessageType.Error:
            replyHandlers.delete(message.id);

            break;

          case ServerMessageType.Reply: {
            const handler = replyHandlers.get(message.id);

            if (handler) {
              replyHandlers.delete(message.id);
              handler.resolve(message.payload);
            }

            break;
          }

          case ServerMessageType.Push: {
            const listeners = listenersMap.get(message.name);

            if (listeners) {
              listeners.forEach(listener => {
                listener(message.payload);
              });
            }

            break;
          }

          default:
            throw new Error(`Unknown message type, message data: ${messageData}`);
        }
      });

      client.on('connect', () => {
        socketClient = client;

        // Send any messages that were queued while closed
        if (messageQueue.length > 0) {
          messageQueue.forEach(message => client.emit('message', message));
          messageQueue = [];
        }

        resolve();
      });

      client.on('disconnect', () => {
        socketClient = null;
      });
    });
  });
};

export const init = async (): Promise<void> => {
  // @ts-ignore
  const socketName = await window.getServerSocket();
  await connectSocket(socketName);

  console.log(`Connected to ${socketName}`);
};

export const send = <TPayload extends object = {},TResult = void>(name: string, payload: TPayload): Promise<TResult> => new Promise((resolve, reject) => {
  // @ts-ignore
  const messageId = window.uuid.v4();
  replyHandlers.set(messageId, { resolve, reject });

  const messageData: IClientMessage <TPayload> = {
    id: messageId,
    name,
    payload,
  };

  const message = JSON.stringify(messageData);

  if (socketClient) {
    socketClient.emit('message', message);
  } else {
    messageQueue.push(message);
  }
});

export const subscribe = <TPayload>(name: string, listener: IListener<TPayload>): () => void => {
  let listeners = listenersMap.get(name);

  if (!listeners) {
    listeners = [listener];
    listenersMap.set(name, listeners);
  } else {
    listeners.push(listener);
  }

  const unsubscribe = (): void => {
    const currentListeners = listenersMap.get(name);

    if (!currentListeners) {
      return;
    }

    listenersMap.set(name, currentListeners.filter(x => x !== listener));
  };

  return unsubscribe;
};

export const unsubscribeName = (name: string): void => {
  listenersMap.delete(name);
};

export const unsubscribeAll = (): void => {
  listenersMap.clear();
};


