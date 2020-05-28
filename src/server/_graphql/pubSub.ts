import {
  PubSub,
  withFilter,
} from 'graphql-subscriptions';

import { SubscriptionSubscribeFn } from '../_types/graphql';
import { BotEvent } from '../events/botEvent';
import { BotEventPayloads } from '../events/botEventPayloads';

type Extends<T, X> = T extends X ? true : false;

type EventWithoutPayload<TEvent extends BotEvent> = Extends<TEvent, keyof BotEventPayloads> extends true ? never : TEvent;

const pubSub = new PubSub();

export const publishPayloadEvent = async <TEvent extends keyof BotEventPayloads>(event: TEvent, payload: BotEventPayloads[TEvent]): Promise<void> => pubSub.publish(event, payload);

export const publishEvent = async <TEvent extends BotEvent>(event: EventWithoutPayload<TEvent>): Promise<void> => pubSub.publish(event, null);

type EventPayload<TEvent> = TEvent extends keyof BotEventPayloads ? BotEventPayloads[TEvent] : undefined;

type Options<TEvent, TArgs, TResult> = {
  readonly filter?: (payload: EventPayload<TEvent>, subscriptionVariables: TArgs) => boolean;
  readonly resolve: (payload: EventPayload<TEvent>) => TResult;
};

export const subscribeToEvent = <TEvent extends BotEvent, TArgs, TResult, TParent, TContext>(
  event: TEvent,
  options: Options<TEvent, TArgs, TResult>,
) => {
  const {
    filter,
    resolve,
  } = options;

  const sub = () => pubSub.asyncIterator<EventPayload<TEvent>>(event);

  const subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs> = filter
    ? withFilter(sub, filter)
    : sub;

  return { resolve, subscribe };
};