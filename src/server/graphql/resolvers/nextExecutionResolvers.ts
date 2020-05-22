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
  Mutation: {
    resetNextTaskExecution: (_, args) => {
      accountContext.nextExecutionService.resetNextTaskExecution(args.task);
      return true;
    },

    resetNextVillageTaskExecution: (_, args) => {
      accountContext.nextExecutionService.resetNextVillageTaskExecution(args.villageId, args.task);
      return true;
    },

    setNextTaskExecution: (_, args) => {
      accountContext.nextExecutionService.set(args.task, delayToDate(args.delay));
      return true;
    },

    setNextVillageTaskExecution: (_, args) => {
      accountContext.nextExecutionService.setForVillage(args.villageId, args.task, delayToDate(args.delay));
      return true;
    },
  },

  Query: {
    nextTaskExecution: (_, args) => convertDateToTimestamp(accountContext.nextExecutionService.get(args.task)),
    nextTasksExecution: () => convertDateToTimestamp(accountContext.nextExecutionService.tasks()),
    nextVillageTaskExecution: (_, args) => convertDateToTimestamp(accountContext.nextExecutionService.getForVillage(args.villageId, args.task)),
  },

  Subscription: {
    nextTaskExecutionChanged: subscribeToEvent(BotEvent.NextTaskExecutionChanged, {
      filter: (payload, variables) => payload.task === variables.task,
      resolve: p => convertDateToTimestamp(p.nextExecution),
    }),

    nextTasksExecutionChanged: subscribeToEvent(BotEvent.NextTasksExecutionChanged, {
      resolve: p => convertDateToTimestamp(p.nextExecution),
    }),

    nextVillageTaskExecutionChanged: subscribeToEvent(BotEvent.NextVillageTaskExecutionChanged, {
      filter: (payload, variables) => payload.villageId === variables.villageId && payload.task === variables.task,
      resolve: p => convertDateToTimestamp(p.nextExecution),
    }),
  },
};
