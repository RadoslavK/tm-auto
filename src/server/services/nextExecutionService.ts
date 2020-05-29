import {
  TaskType,
  VillageTaskType,
} from '../_graphql/graphql.type';
import { publishPayloadEvent } from '../_graphql/pubSub';
import { BotEvent } from '../events/botEvent';

const getDefaultExecutionTime = (): Date => new Date(1970, 1, 1);

export class NextExecutionService {
  private nextTaskExecutionTimes: Map<TaskType, Date> = new Map();
  private nextVillageTaskExecutionTimes: Map<number, Map<VillageTaskType, Date>> = new Map();
  private nextTasksExecution: Date | undefined;

  public resetNextTaskExecution = (task: TaskType): void => {
    this.set(task, new Date());
  };

  public resetNextVillageTaskExecution = (villageId: number, task: VillageTaskType): void => {
    this.setForVillage(villageId, task, new Date());
  };

  public tasks = (): Date => this.nextTasksExecution
    || getDefaultExecutionTime();

  public setTasks = (nextExecution: Date): void => {
    this.nextTasksExecution = nextExecution;

    publishPayloadEvent(BotEvent.NextTasksExecutionChanged, { nextExecution });
  };

  public get = (task: TaskType): Date => this.nextTaskExecutionTimes.get(task)
    || getDefaultExecutionTime();

  public set = (task: TaskType, nextExecution: Date): void => {
    this.nextTaskExecutionTimes.set(task, nextExecution);

    publishPayloadEvent(BotEvent.NextTaskExecutionChanged, {
      nextExecution,
      task,
    });
  };

  public getForVillage = (villageId: number, task: VillageTaskType): Date => {
    const villageTimes = this.nextVillageTaskExecutionTimes.get(villageId);

    if (!villageTimes) {
      return getDefaultExecutionTime();
    }

    return villageTimes.get(task)
     || getDefaultExecutionTime();
  };

  public setForVillage = (villageId: number, task: VillageTaskType, nextExecution: Date): void => {
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
  };
}
