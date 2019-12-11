import {
  ITimestamp,
  TaskType,
  VillageTaskType,
} from '../_types/graphql';
import { BotEvent } from '../graphql/subscriptions/botEvent';
import { publishPayloadEvent } from '../graphql/subscriptions/pubSub';

const getDefaultExecutionTime = (): Date => new Date();

const convertDateToTimestamp = (date: Date): ITimestamp => ({ totalSeconds: Math.floor(date.getTime() / 1000) });

export class NextExecutionService {
  private nextTaskExecutionTimes: Map<TaskType, Date> = new Map();
  private nextVillageTaskExecutionTimes: Map<number, Map<VillageTaskType, Date>> = new Map();

  public get = (task: TaskType): ITimestamp => convertDateToTimestamp(
    this.nextTaskExecutionTimes.get(task) || getDefaultExecutionTime(),
  );

  public set = (task: TaskType, nextExecution: Date): void => {
    this.nextTaskExecutionTimes.set(task, nextExecution);

    publishPayloadEvent(BotEvent.NextTaskExecutionChanged, {
      nextExecution: convertDateToTimestamp(nextExecution),
      task,
    });
  };

  public getForVillage = (villageId: number, task: VillageTaskType): ITimestamp => {
    const villageTimes = this.nextVillageTaskExecutionTimes.get(villageId);

    if (!villageTimes) {
      return convertDateToTimestamp(getDefaultExecutionTime());
    }

    return convertDateToTimestamp(
      villageTimes.get(task) || getDefaultExecutionTime(),
    );
  };

  public setForVillage = (villageId: number, task: VillageTaskType, nextExecution: Date): void => {
    let villageTimes = this.nextVillageTaskExecutionTimes.get(villageId);

    if (!villageTimes) {
      villageTimes = new Map();
      this.nextVillageTaskExecutionTimes.set(villageId, villageTimes);
    }

    villageTimes.set(task, nextExecution);
    publishPayloadEvent(BotEvent.NextVillageTaskExecutionChanged, {
      nextExecution: convertDateToTimestamp(nextExecution),
      villageId,
      task,
    });
  }
}
