import { Duration } from '../../_models/duration';
import { Timestamp } from '../../_models/misc/timestamp';
import { accountContext } from '../../accountContext';
import { BotEvent } from '../subscriptions/botEvent';
import { subscribeToEvent } from '../subscriptions/pubSub';
import { Resolvers } from './_types';

const convertDelayToDate = (delay: Duration): Date => {
  const date = new Date();
  date.setSeconds(date.getSeconds() + delay.getTotalSeconds());

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
      accountContext.nextExecutionService.set(args.task, convertDelayToDate(new Duration(args.delay)));
      return true;
    },

    setNextVillageTaskExecution: (_, args) => {
      accountContext.nextExecutionService.setForVillage(args.villageId, args.task, convertDelayToDate(new Duration(args.delay)));
      return true;
    },
  },

  Query: {
    nextTaskExecution: (_, args) => Timestamp.fromDate(accountContext.nextExecutionService.get(args.task)),
    nextTasksExecution: () => Timestamp.fromDate(accountContext.nextExecutionService.tasks()),
    nextVillageTaskExecution: (_, args) => Timestamp.fromDate(accountContext.nextExecutionService.getForVillage(args.villageId, args.task)),
  },

  Subscription: {
    nextTaskExecutionChanged: subscribeToEvent(BotEvent.NextTaskExecutionChanged, {
      filter: (payload, variables) => payload.task === variables.task,
      resolve: p => Timestamp.fromDate(p.nextExecution),
    }),

    nextTasksExecutionChanged: subscribeToEvent(BotEvent.NextTasksExecutionChanged, {
      resolve: p => Timestamp.fromDate(p.nextExecution),
    }),

    nextVillageTaskExecutionChanged: subscribeToEvent(BotEvent.NextVillageTaskExecutionChanged, {
      filter: (payload, variables) => payload.villageId === variables.villageId && payload.task === variables.task,
      resolve: p => Timestamp.fromDate(p.nextExecution),
    }),
  },
};
