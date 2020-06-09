import { generateId } from '../../../_shared/generateId';
import { ClientMessage } from '../../../_shared/ipc/clientMessages';
import {
  ServerMessage,
  ServerMessageType,
} from '../../../_shared/ipc/serverMessages';

type ReplyHandler<TPayload> = {
  readonly onError: (error: Error) => void;
  readonly onSuccess: (value: TPayload) => void;
};

type Listener<TPayload = unknown> = (payload: TPayload) => void;

export class IpcClient {
  private replyHandlers = new Map<string, ReplyHandler<any>>();

  private listenersMap = new Map<string, Listener<any>[]>();

  private messageQueue: ClientMessage<any>[] = [];

  private socketClient: any | null = null;

  constructor(public socketName: string) {}

  public initConnection = async (): Promise<void> =>
    new Promise(resolve => {
      window.api.ipcConnect(this.socketName, client => {
        client.on('message', (message: ServerMessage) => {
          switch (message.type) {
            case ServerMessageType.Error: {
              const handler = this.replyHandlers.get(message.id);

              if (handler) {
                this.replyHandlers.delete(message.id);
                handler.onError(message.payload);
              }
              this.replyHandlers.delete(message.id);

              break;
            }

            case ServerMessageType.Reply: {
              const handler = this.replyHandlers.get(message.id);

              if (handler) {
                this.replyHandlers.delete(message.id);
                handler.onSuccess(message.payload);
              }

              break;
            }

            case ServerMessageType.Push: {
              const listeners = this.listenersMap.get(message.name);

              if (listeners) {
                listeners.forEach(listener => {
                  listener(message.payload);
                });
              }

              break;
            }

            default:
              throw new Error(`Unknown message type, message data: ${JSON.stringify(message)}`);
          }
        });

        client.on('connect', () => {
          this.socketClient = client;
          console.debug(`Connected to ${this.socketName}`);

          // Send any messages that were queued while closed
          if (this.messageQueue.length > 0) {
            this.messageQueue.forEach(message => client.emit('message', message));
            this.messageQueue = [];
          }

          resolve();
        });

        client.on('disconnect', () => {
          console.debug('Client disconnected.');

          this.socketClient = null;
        });
      });
    });

  public closeConnection = (): void => {
    this.listenersMap.clear();
    this.replyHandlers.clear();
    window.api.ipcDisconnect(this.socketName);
    this.socketClient = null;
  };

  public sendMessage = <TPayload extends unknown = unknown, TResponse extends unknown = unknown>(name: string, payload: TPayload, handleResponse?: ReplyHandler<TResponse>): void => {
    const messageId = generateId();

    if (handleResponse) {
      this.replyHandlers.set(messageId, handleResponse);
    }

    const message: ClientMessage<TPayload> = {
      id: messageId,
      name,
      payload,
    };

    if (this.socketClient) {
      this.socketClient.emit('message', message);
    } else {
      this.messageQueue.push(message);
    }
  };

  public subscribe = <TPayload>(name: string, listener: Listener<TPayload>): void => {
    let listeners = this.listenersMap.get(name);

    if (!listeners) {
      listeners = [listener];
      this.listenersMap.set(name, listeners);
    } else {
      listeners.push(listener);
    }
  };

  public unsubscribe = <TPayload>(name: string, listener: Listener<TPayload>): void => {
    const currentListeners = this.listenersMap.get(name);

    if (!currentListeners) {
      return;
    }

    this.listenersMap.set(name, currentListeners.filter(x => x !== listener));
  };
}