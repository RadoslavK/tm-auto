import {
  idArg,
  mutationField,
  queryField,
  subscriptionField,
} from 'nexus';

import { Duration } from '../../_models/duration.js';
import { TaskType } from '../../_models/misc/taskType.js';
import { Timestamp } from '../../_models/misc/timestamp.js';
import { BotEvent } from '../../events/botEvent.js';
import { subscribeToEvent } from '../../pubSub.js';
import { convertDelayToDate } from '../../utils/convertDelayToDate.js';

export const NextTasksExecutionQuery = queryField(t => {
  t.field('nextTasksExecution', {
    type: 'Timestamp',
    resolve: (_, _args, ctx) =>
      Timestamp.fromDate(ctx.nextExecutionService.tasks()),
  });
});

export const NextTaskExecutionQuery = queryField(t => {
  t.field('nextTaskExecution', {
    type: 'Timestamp',
    args: {
      task: 'TaskType',
    },
    resolve: (_, args, ctx) =>
      Timestamp.fromDate(
        ctx.nextExecutionService.get(TaskType[args.task]),
      ),
  });
});

export const NextVillageTaskExecutionQuery = queryField(t => {
  t.field('nextVillageTaskExecution', {
    type: 'Timestamp',
    args: {
      villageId: idArg(),
      task: 'TaskType',
    },
    resolve: (_, args, ctx) =>
      Timestamp.fromDate(
        ctx.nextExecutionService.getForVillage(
          args.villageId,
          TaskType[args.task],
        ),
      ),
  });
});

export const SetNextTaskExecutionMutation = mutationField(t => {
  t.field('setNextTaskExecution', {
    type: 'Timestamp',
    args: {
      task: 'TaskType',
      delay: 'DurationInput',
    },
    resolve: (_, args, ctx) =>
      Timestamp.fromDate(
        ctx.nextExecutionService.set(
          TaskType[args.task],
          convertDelayToDate(new Duration(args.delay)),
        ),
      ),
  });
});

export const SetNextTasksExecutionMutation = mutationField(t => {
  t.field('setNextTasksExecution', {
    type: 'Timestamp',
    args: {
      delay: 'DurationInput',
    },
    resolve: (_, args, ctx) =>
      Timestamp.fromDate(
        ctx.nextExecutionService.setTasks(
          convertDelayToDate(new Duration(args.delay)),
        ),
      ),
  });
});

export const SetNextVillageTaskExecutionMutation = mutationField(t => {
  t.field('setNextVillageTaskExecution', {
    type: 'Timestamp',
    args: {
      villageId: 'ID',
      task: 'TaskType',
      delay: 'DurationInput',
    },
    resolve: (_, args, ctx) =>
      Timestamp.fromDate(
        ctx.nextExecutionService.setForVillage(
          args.villageId,
          TaskType[args.task],
          convertDelayToDate(new Duration(args.delay)),
        ),
      ),
  });
});

export const ResetNextTaskExecutionMutation = mutationField(t => {
  t.field('resetNextTaskExecution', {
    type: 'Timestamp',
    args: {
      task: 'TaskType',
    },
    resolve: (_, args, ctx) =>
      Timestamp.fromDate(
        ctx.nextExecutionService.resetNextTaskExecution(
          TaskType[args.task],
        ),
      ),
  });
});

export const ResetNextTasksExecutionMutation = mutationField(t => {
  t.field('resetNextTasksExecution', {
    type: 'Timestamp',
    resolve: (_, _args, ctx) =>
      Timestamp.fromDate(
        ctx.nextExecutionService.resetNextTasksExecution(),
      ),
  });
});

export const ResetNextVillageTaskExecutionMutation = mutationField(t => {
  t.field('resetNextVillageTaskExecution', {
    type: 'Timestamp',
    args: {
      villageId: 'ID',
      task: 'TaskType',
    },
    resolve: (_, args, ctx) =>
      Timestamp.fromDate(
        ctx.nextExecutionService.resetNextVillageTaskExecution(
          args.villageId,
          TaskType[args.task],
        ),
      ),
  });
});

export const NextTasksExecutionChangedSubscription = subscriptionField(t => {
  t.field('nextTasksExecutionChanged', {
    type: 'Timestamp',
    ...subscribeToEvent(
      BotEvent.NextTasksExecutionChanged,
      {
        resolve: (p) => Timestamp.fromDate(p.nextExecution),
      },
    ),
  });
});

export const NextTaskExecutionChangedSubscription = subscriptionField(t => {
  t.field('nextTaskExecutionChanged', {
    type: 'Timestamp',
    args: {
      task: 'TaskType',
    },
    ...subscribeToEvent(
      BotEvent.NextTaskExecutionChanged,
      {
        filter: (payload, variables) => payload.task === variables.task,
        resolve: (p) => Timestamp.fromDate(p.nextExecution),
      },
    ),
  });
});

export const NextVillageTaskExecutionChangedSubscription = subscriptionField(t => {
  t.field('nextVillageTaskExecutionChanged', {
    type: 'Timestamp',
    args: {
      villageId: 'ID',
      task: 'TaskType',
    },
    ...subscribeToEvent(
      BotEvent.NextVillageTaskExecutionChanged,
      {
        filter: (payload, variables) =>
          payload.villageId === variables.villageId &&
          payload.task === variables.task,
        resolve: (p) => Timestamp.fromDate(p.nextExecution),
      },
    ),
  });
});
