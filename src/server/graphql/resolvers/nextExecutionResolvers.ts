import { Duration } from '../../_models/duration';
import {
  IDuration,
  ITimestamp,
} from '../../_types/graphql';
import { accountContext } from '../../accountContext';
import { BotEvent } from '../subscriptions/botEvent';
import { subscribeToEvent } from '../subscriptions/pubSub';
import { Resolvers } from './_types';

const convertDateToTimestamp = (date: Date): ITimestamp => ({ totalSeconds: Math.floor(date.getTime() / 1000) });

const delayToDate = (delay: IDuration): Date => {
  const date = new Date();
  date.setSeconds(date.getSeconds() + new Duration(delay).totalSeconds());

  return date;
};

export const nextExecutionResolvers: Resolvers = {
  Query: {
    nextTasksExecution: () => convertDateToTimestamp(accountContext.nextExecutionService.tasks()),
    nextTaskExecution: (_, args) => convertDateToTimestamp(accountContext.nextExecutionService.get(args.task)),
    nextVillageTaskExecution: (_, args) => convertDateToTimestamp(accountContext.nextExecutionService.getForVillage(args.villageId, args.task)),
  },

  Mutation: {
    setNextTaskExecution: (_, args) => {
      accountContext.nextExecutionService.set(args.task, delayToDate(args.delay));
      return true;
    },

    setNextVillageTaskExecution: (_, args) => {
      accountContext.nextExecutionService.setForVillage(args.villageId, args.task, delayToDate(args.delay));
      return true;
    },
  },

  Subscription: {
    nextTasksExecutionChanged: subscribeToEvent(BotEvent.NextTasksExecutionChanged, {
      resolve: p => convertDateToTimestamp(p.nextExecution),
    }),

    nextTaskExecutionChanged: subscribeToEvent(BotEvent.NextTaskExecutionChanged, {
      filter: (payload, variables) => payload.task === variables.task,
      resolve: p => convertDateToTimestamp(p.nextExecution),
    }),

    nextVillageTaskExecutionChanged: subscribeToEvent(BotEvent.NextVillageTaskExecutionChanged, {
      filter: (payload, variables) => payload.villageId === variables.villageId && payload.task === variables.task,
      resolve: p => convertDateToTimestamp(p.nextExecution),
    }),
  },
};
