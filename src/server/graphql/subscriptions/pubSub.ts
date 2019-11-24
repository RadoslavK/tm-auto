import {
  PubSub,
  withFilter,
} from 'graphql-subscriptions';
import {
  BotEvent,
  BotEventPayloads,
} from './botEvent';

type Extends<T, X> = T extends X ? true : false;

type EventWithoutPayload<TEvent extends BotEvent> = Extends<TEvent, keyof BotEventPayloads> extends true ? never : TEvent;

const pubSub = new PubSub();

export const publishPayloadEvent = async <TEvent extends keyof BotEventPayloads>(event: TEvent, payload: BotEventPayloads[TEvent]): Promise<void> => {
  return pubSub.publish(event, payload);
};

export const publishEvent = async <TEvent extends BotEvent>(event: EventWithoutPayload<TEvent>): Promise<void> => {
  return pubSub.publish(event, null);
};

export const subscribeToEvent = <TEvent extends BotEvent>(event: EventWithoutPayload<TEvent>): () => AsyncIterator<void> => {
  return () => pubSub.asyncIterator<void>(event);
};

export const subscribeToPayloadEvent = <TEvent extends keyof BotEventPayloads, TPayload extends BotEventPayloads[TEvent], TArgs>(event: TEvent, filter?: (payload: TPayload, variables: TArgs) => boolean | Promise<boolean>): () => AsyncIterator<TPayload> => {
  return filter
    ? withFilter(() => pubSub.asyncIterator<TPayload>(event), filter)
    : () => pubSub.asyncIterator<TPayload>(event);
};

export const resolvePayloadEvent = <TEvent extends keyof BotEventPayloads, TResult>(processPayload: (payload: BotEventPayloads[TEvent]) => TResult) => {
  return processPayload;
};