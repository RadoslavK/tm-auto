import {
  PubSub,
  withFilter,
} from 'graphql-subscriptions';
import { Events } from './events';
import { ILogEntry } from '../../_types/graphql';

type EventPayloads = {
  [Events.BuildingsUpdated]: {
    readonly villageId: number
  },

  [Events.QueuedUpdated]: {
    readonly villageId: number
  },

  [Events.LogEntryAdded]: {
    readonly logEntry: ILogEntry;
  },
}

type Extends<T, X> = T extends X ? true : false;

type EventWithoutPayload<TEvent extends Events> = Extends<TEvent, keyof EventPayloads> extends true ? never : TEvent;

const pubSub = new PubSub();

export const publishPayloadEvent = async <TEvent extends keyof EventPayloads>(event: TEvent, payload: EventPayloads[TEvent]): Promise<void> => {
  return pubSub.publish(event, payload);
};

export const publishEvent = async <TEvent extends Events>(event: EventWithoutPayload<TEvent>): Promise<void> => {
  return pubSub.publish(event, null);
};

export const subscribeToEvent = <TEvent extends Events>(event: EventWithoutPayload<TEvent>): () => AsyncIterator<void> => {
  return () => pubSub.asyncIterator<void>(event);
};

export const subscribeToPayloadEvent = <TEvent extends keyof EventPayloads, TPayload extends EventPayloads[TEvent], TArgs>(event: TEvent, filter?: (payload: TPayload, variables: TArgs) => boolean | Promise<boolean>): () => AsyncIterator<TPayload> => {
  return filter
    ? withFilter(() => pubSub.asyncIterator<TPayload>(event), filter)
    : () => pubSub.asyncIterator<TPayload>(event);
};

export const resolvePayloadEvent = <TEvent extends keyof EventPayloads, TResult>(processPayload: (payload: EventPayloads[TEvent]) => TResult) => {
  return processPayload;
};