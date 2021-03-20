import { ServerMessageType } from 'shared/ipc/createServerMessage.js';
import { generateId } from 'shared/utils/generateId.js';
import type { ClientMessage } from 'shared/types/clientMessage.js';

type ReplyHandler<TPayload> = {
  readonly onError?: (error: Error) => void;
  readonly onSuccess?: (value: TPayload) => void;
};

type Listener<TPayload = unknown> = (payload: TPayload) => void;

export class IpcClient {
  private replyHandlers = new Map<string, ReplyHandler<any>>();
  private listenersMap = new Map<string, Listener<any>[]>();
  private messageQueue: ClientMessage<any>[] = [];
  private isConnected: boolean = false;

  constructor(public socketName: string) {}

  public initConnection = async (): Promise<void> => {
    const { ipc } = window.api;

    return new Promise((resolve) => {
      ipc.connect({
        id: this.socketName,
        onConnect: () => {
          this.isConnected = true;

          console.debug(`Connected to ${this.socketName}`);

          // Send any messages that were queued while closed
          if (this.messageQueue.length > 0) {
            this.messageQueue.forEach((message) =>
              ipc.sendMessage(this.socketName, message),
            );
            this.messageQueue = [];
          }

          resolve();
        },
        onMessage: message => {
          switch (message.type) {
            case ServerMessageType.Error: {
              const handler = this.replyHandlers.get(message.id);

              if (handler) {
                this.replyHandlers.delete(message.id);
                handler.onError?.(message.payload);
              }
              this.replyHandlers.delete(message.id);

              break;
            }

            case ServerMessageType.Reply: {
              const handler = this.replyHandlers.get(message.id);

              if (handler) {
                this.replyHandlers.delete(message.id);
                handler.onSuccess?.(message.payload);
              }

              break;
            }

            case ServerMessageType.Push: {
              const listeners = this.listenersMap.get(message.name);

              if (listeners) {
                listeners.forEach((listener) => {
                  listener(message.payload);
                });
              }

              break;
            }

            default:
              throw new Error(
                `Unknown message type, message data: ${JSON.stringify(
                  message,
                )}`,
              );
          }
        },
        onDisconnect: () => {
          console.debug('Client disconnected.');
        },
      });
    });
  };

  public closeConnection = (): void => {
    window.api.ipc.disconnect(this.socketName);
    this.listenersMap.clear();
    this.replyHandlers.clear();

    this.isConnected = false;
  };

  public sendMessage = <
    TPayload extends unknown = unknown,
    TResponse extends unknown = unknown
  >(
    name: string,
    payload: TPayload,
    handleResponse?: ReplyHandler<TResponse>,
  ): void => {
    const messageId = generateId();

    if (handleResponse) {
      this.replyHandlers.set(messageId, handleResponse);
    }

    const message: ClientMessage<TPayload> = {
      id: messageId,
      name,
      payload,
    };

    if (this.isConnected) {
      window.api.ipc.sendMessage(this.socketName, message);
    } else {
      this.messageQueue.push(message);
    }
  };

  public subscribe = <TPayload>(
    name: string,
    listener: Listener<TPayload>,
  ): void => {
    let listeners = this.listenersMap.get(name);

    if (!listeners) {
      listeners = [listener];
      this.listenersMap.set(name, listeners);
    } else {
      listeners.push(listener);
    }
  };

  public unsubscribe = <TPayload>(
    name: string,
    listener: Listener<TPayload>,
  ): void => {
    const currentListeners = this.listenersMap.get(name);

    if (!currentListeners) {
      return;
    }

    this.listenersMap.set(
      name,
      currentListeners.filter((x) => x !== listener),
    );
  };
}
