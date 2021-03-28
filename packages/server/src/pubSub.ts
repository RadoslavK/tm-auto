import type { GraphQLResolveInfo } from 'graphql';
import { withFilter } from 'graphql-subscriptions';
import { $$asyncIterator } from 'iterall';
import pubSub from 'pubsub-js';

import type { BotEvent } from './events/botEvent.js';
import type { BotEventPayloads } from './events/botEventPayloads.js';

type Extends<T, X> = T extends X ? true : false;

type EventWithoutPayload<TEvent extends BotEvent> = Extends<
  TEvent,
  keyof BotEventPayloads
> extends true
  ? never
  : TEvent;

export const publishPayloadEvent = <TEvent extends keyof BotEventPayloads>(
  event: TEvent,
  payload: BotEventPayloads[TEvent],
): void => {
  pubSub.publish(event, payload);
};

export const publishEvent = <TEvent extends BotEvent>(event: EventWithoutPayload<TEvent>): void => {
  pubSub.publish(event, null);
};

type EventPayload<TEvent> = TEvent extends keyof BotEventPayloads
  ? BotEventPayloads[TEvent]
  : undefined;

class PubSubAsyncIterator<TEvent extends BotEvent>
  implements AsyncIterator<EventPayload<TEvent>> {
  private pullQueue: ((value: IteratorResult<EventPayload<TEvent>>) => void)[];

  private pushQueue: EventPayload<TEvent>[];

  private event: TEvent;

  private subscribed: null | Promise<string>;

  private running: boolean;

  constructor(event: TEvent) {
    this.pullQueue = [];
    this.pushQueue = [];
    this.running = true;
    this.subscribed = null;
    this.event = event;
  }

  public async next(): Promise<IteratorResult<EventPayload<TEvent>>> {
    if (!this.subscribed) {
      await (this.subscribed = this.subscribe());
    }

    return this.pullValue();
  }

  public return = async (): Promise<IteratorResult<EventPayload<TEvent>>> => {
    await this.emptyQueue();

    return { done: true, value: undefined };
  };

  public throw = async (error: Error) => {
    await this.emptyQueue();

    return Promise.reject(error);
  };

  public [$$asyncIterator] = () => this;

  private pushValue = async (_message: string, data: EventPayload<TEvent>) => {
    await this.subscribed;

    const resolve = this.pullQueue.shift();

    if (resolve) {
      resolve(
        this.running
          ? { done: false, value: data }
          : { done: true, value: undefined },
      );
    } else {
      this.pushQueue.push(data);
    }
  };

  private pullValue = async (): Promise<IteratorResult<EventPayload<TEvent>>> =>
    new Promise((resolve) => {
      const value = this.pushQueue.shift();

      if (value) {
        resolve(
          this.running
            ? { done: false, value }
            : { done: true, value: undefined },
        );
      } else {
        this.pullQueue.push(resolve);
      }
    });

  private emptyQueue = async () => {
    if (!this.running) {
      return;
    }

    this.running = false;
    this.pullQueue.forEach((resolve) =>
      resolve({ done: true, value: undefined }),
    );
    this.pullQueue.length = 0;
    this.pushQueue.length = 0;

    const subscriptionId = await this.subscribed;

    if (subscriptionId) {
      this.unsubscribe(subscriptionId);
    }
  };

  private subscribe = async (): Promise<string> =>
    pubSub.subscribe(this.event, this.pushValue.bind(this));

  private unsubscribe = (subscriptionId: string): void => {
    pubSub.unsubscribe(subscriptionId);
  };
}

type Options<TEvent, TArgs, TResult> = {
  readonly filter?: (
    payload: EventPayload<TEvent>,
    subscriptionVariables: TArgs,
  ) => boolean;
  readonly resolve: (payload: EventPayload<TEvent>) => TResult;
};

type Subscribe<TEvent, TArgs> = (
  root: object,
  args: TArgs,
  ctx: any,
  info: GraphQLResolveInfo,
) => AsyncIterator<TEvent>;

export const subscribeToEvent = <
  TEvent extends BotEvent,
  TArgs,
  TResult,
>(
  event: TEvent,
  options: Options<TEvent, TArgs, TResult>,
) => {
  const { filter, resolve } = options;

  const sub = () => new PubSubAsyncIterator(event);

  const subscribe: Subscribe<TEvent, TArgs> = filter ? withFilter(sub, filter) : sub;

  return { resolve, subscribe };
};