import type { TaskType } from 'shared/enums/TaskType.js';

import { BotEvent } from '../events/botEvent.js';
import { publishPayloadEvent } from '../pubSub.js';

const getDefaultExecutionTime = (): Date => new Date(1970, 1, 1);

export class NextExecutionService {
  private nextTaskExecutionTimes: Map<TaskType, Date> = new Map();

  private nextVillageTaskExecutionTimes: Map<
    string,
    Map<TaskType, Date>
  > = new Map();

  private nextTasksExecution: Date | undefined;

  public resetNextTaskExecution = (task: TaskType): Date => {
    const date = new Date();

    this.set(task, new Date());

    return date;
  };

  public resetNextTasksExecution = (): Date => {
    const date = new Date();

    this.setTasks(date);

    return date;
  };

  public resetNextVillageTaskExecution = (
    villageId: string,
    task: TaskType,
  ): Date => {
    const date = new Date();

    this.setForVillage(villageId, task, date);

    return date;
  };

  public tasks = (): Date =>
    this.nextTasksExecution || getDefaultExecutionTime();

  public setTasks = (nextExecution: Date): Date => {
    this.nextTasksExecution = nextExecution;

    publishPayloadEvent(BotEvent.NextTasksExecutionChanged, { nextExecution });

    return nextExecution;
  };

  public get = (task: TaskType): Date =>
    this.nextTaskExecutionTimes.get(task) || getDefaultExecutionTime();

  public set = (task: TaskType, nextExecution: Date): Date => {
    this.nextTaskExecutionTimes.set(task, nextExecution);

    publishPayloadEvent(BotEvent.NextTaskExecutionChanged, {
      nextExecution,
      task,
    });

    return nextExecution;
  };

  public getForVillage = (villageId: string, task: TaskType): Date => {
    const villageTimes = this.nextVillageTaskExecutionTimes.get(villageId);

    if (!villageTimes) {
      return getDefaultExecutionTime();
    }

    return villageTimes.get(task) || getDefaultExecutionTime();
  };

  public getMultipleForVillage = (villageId: string, tasks: ReadonlyArray<TaskType>): ReadonlyArray<{ readonly task: TaskType; readonly date: Date }> => {
    const villageTimes = this.nextVillageTaskExecutionTimes.get(villageId);

    return tasks.map(task => ({
      task,
      date: villageTimes?.get(task) || getDefaultExecutionTime(),
    }));
  };

  public setForVillage = (
    villageId: string,
    task: TaskType,
    nextExecution: Date,
  ): Date => {
    let villageTimes = this.nextVillageTaskExecutionTimes.get(villageId);

    if (!villageTimes) {
      villageTimes = new Map();
      this.nextVillageTaskExecutionTimes.set(villageId, villageTimes);
    }

    villageTimes.set(task, nextExecution);
    publishPayloadEvent(BotEvent.NextVillageTaskExecutionChanged, {
      nextExecution,
      task,
      villageId,
    });

    return nextExecution;
  };
}
