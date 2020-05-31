import { Duration } from '../../_models/duration';
import { Timestamp } from '../../_models/misc/timestamp';
import { Resolvers } from '../../_types/resolvers.type';
import { accountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';
import { convertDelayToDate } from '../../utils/convertDelayToDate';

export default <Resolvers>{
  Query: {
    nextTaskExecution: (_, args) => Timestamp.fromDate(accountContext.nextExecutionService.get(args.task)),
    nextTasksExecution: () => Timestamp.fromDate(accountContext.nextExecutionService.tasks()),
    nextVillageTaskExecution: (_, args) => Timestamp.fromDate(accountContext.nextExecutionService.getForVillage(args.villageId, args.task)),
  },

  Mutation: {
    resetNextTaskExecution: (_, args) => Timestamp.fromDate(accountContext.nextExecutionService.resetNextTaskExecution(args.task)),
    resetNextTasksExecution: () => Timestamp.fromDate(accountContext.nextExecutionService.resetNextTasksExecution()),
    resetNextVillageTaskExecution: (_, args) => Timestamp.fromDate(accountContext.nextExecutionService.resetNextVillageTaskExecution(args.villageId, args.task)),
    setNextTaskExecution: (_, args) => Timestamp.fromDate(accountContext.nextExecutionService.set(args.task, convertDelayToDate(new Duration(args.delay)))),
    setNextTasksExecution: (_, args) => Timestamp.fromDate(accountContext.nextExecutionService.setTasks(convertDelayToDate(new Duration(args.delay)))),
    setNextVillageTaskExecution: (_, args) => Timestamp.fromDate(accountContext.nextExecutionService.setForVillage(args.villageId, args.task, convertDelayToDate(new Duration(args.delay)))),
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