import { Resolvers } from '../../_types';
import { Timestamp } from '../../../_models/misc/timestamp';
import { BotEvent } from '../../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';

export default <Resolvers>{
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