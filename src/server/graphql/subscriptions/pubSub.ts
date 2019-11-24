import {
  PubSub,
  withFilter,
} from 'graphql-subscriptions';
import {
  BotEvent,
  BotEventPayloads,
} from './botEvent';
import { SubscriptionSubscribeFn } from '../../_types/graphql';

type Extends<T, X> = T extends X ? true : false;

type EventWithoutPayload<TEvent extends BotEvent> = Extends<TEvent, keyof BotEventPayloads> extends true ? never : TEvent;

const pubSub = new PubSub();

export const publishPayloadEvent = async <TEvent extends keyof BotEventPayloads>(event: TEvent, payload: BotEventPayloads[TEvent]): Promise<void> => {
  return pubSub.publish(event, payload);
};

export const publishEvent = async <TEvent extends BotEvent>(event: EventWithoutPayload<TEvent>): Promise<void> => {
  return pubSub.publish(event, null);
};

type EventPayload<TEvent> = TEvent extends keyof BotEventPayloads ? BotEventPayloads[TEvent] : undefined;

interface ISubscribeToEventOptions<TEvent, TArgs, TResult> {
  readonly filter?: (payload: EventPayload<TEvent>, subscriptionVariables: TArgs) => boolean;
  readonly resolve: (payload: EventPayload<TEvent>) => TResult;
}

export const subscribeToEvent = <TEvent extends BotEvent, TArgs, TResult, TKey, TParent, TContext>(
  event: TEvent,
  options: ISubscribeToEventOptions<TEvent, TArgs, TResult>,
) => {
  const {
    filter,
    resolve,
  } = options;

  const sub = () => pubSub.asyncIterator<EventPayload<TEvent>>(event);

  const subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs> = filter
    ? withFilter(sub, filter)
    : sub;

  return { subscribe, resolve };
};