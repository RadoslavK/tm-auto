import {
  TaskType,
  VillageTaskType,
} from '../_types/graphql';
import { BotEvent } from '../graphql/subscriptions/botEvent';
import { publishPayloadEvent } from '../graphql/subscriptions/pubSub';

const getDefaultExecutionTime = (): Date => new Date(1970, 1, 1);

export class NextExecutionService {
  private nextTaskExecutionTimes: Map<TaskType, Date> = new Map();
  private nextVillageTaskExecutionTimes: Map<number, Map<VillageTaskType, Date>> = new Map();

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
      villageId,
      task,
    });
  }
}
