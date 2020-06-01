import { Duration } from '../../_models/duration';
import { Timestamp } from '../../_models/misc/timestamp';
import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';
import { convertDelayToDate } from '../../utils/convertDelayToDate';

export default <Resolvers>{
  Query: {
    nextTaskExecution: (_, args) => Timestamp.fromDate(getAccountContext().nextExecutionService.get(args.task)),
    nextTasksExecution: () => Timestamp.fromDate(getAccountContext().nextExecutionService.tasks()),
    nextVillageTaskExecution: (_, args) => Timestamp.fromDate(getAccountContext().nextExecutionService.getForVillage(args.villageId, args.task)),
  },

  Mutation: {
    resetNextTaskExecution: (_, args) => Timestamp.fromDate(getAccountContext().nextExecutionService.resetNextTaskExecution(args.task)),
    resetNextTasksExecution: () => Timestamp.fromDate(getAccountContext().nextExecutionService.resetNextTasksExecution()),
    resetNextVillageTaskExecution: (_, args) => Timestamp.fromDate(getAccountContext().nextExecutionService.resetNextVillageTaskExecution(args.villageId, args.task)),
    setNextTaskExecution: (_, args) => Timestamp.fromDate(getAccountContext().nextExecutionService.set(args.task, convertDelayToDate(new Duration(args.delay)))),
    setNextTasksExecution: (_, args) => Timestamp.fromDate(getAccountContext().nextExecutionService.setTasks(convertDelayToDate(new Duration(args.delay)))),
    setNextVillageTaskExecution: (_, args) => Timestamp.fromDate(getAccountContext().nextExecutionService.setForVillage(args.villageId, args.task, convertDelayToDate(new Duration(args.delay)))),
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