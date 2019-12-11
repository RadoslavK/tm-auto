import { accountContext } from '../../accountContext';
import { BotEvent } from '../subscriptions/botEvent';
import { subscribeToEvent } from '../subscriptions/pubSub';
import { Resolvers } from './_types';

export const nextExecutionResolvers: Resolvers = {
  Query: {
    nextTaskExecution: (_, args) => accountContext.nextExecutionService.get(args.task),
    nextVillageTaskExecution: (_, args) => accountContext.nextExecutionService.getForVillage(args.villageId, args.task),
  },

  Subscription: {
    nextTaskExecutionChanged: subscribeToEvent(BotEvent.NextTaskExecutionChanged, {
      filter: (payload, variables) => payload.task === variables.task,
      resolve: p => p.nextExecution,
    }),

    nextVillageTaskExecutionChanged: subscribeToEvent(BotEvent.NextVillageTaskExecutionChanged, {
      filter: (payload, variables) => payload.villageId === variables.villageId && payload.task === variables.task,
      resolve: p => p.nextExecution,
    }),
  },
};
