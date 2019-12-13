import { CoolDown } from '../_models/coolDown';
import {
  TaskType,
  VillageTaskType,
} from '../_types/graphql';
import {
  IBotTask,
  IVillageBotTask,
} from '../controller/tasks/_types';
import { BotEvent } from '../graphql/subscriptions/botEvent';
import { publishPayloadEvent } from '../graphql/subscriptions/pubSub';

type GetCoolDown = () => CoolDown;

const getDefaultExecutionTime = (): Date => new Date(1970, 1, 1);

export class NextExecutionService {
  private nextTaskExecutionTimes: Map<TaskType, Date> = new Map();
  private nextVillageTaskExecutionTimes: Map<number, Map<VillageTaskType, Date>> = new Map();
  private nextTasksExecution: Date | undefined;

  private defaultTaskCoolDowns: Map<TaskType, GetCoolDown> = new Map();
  private defaultVillageTaskCoolDowns: Map<number, Map<VillageTaskType, GetCoolDown>> = new Map();

  public setDefaultTaskCoolDown = (task: IBotTask): void => {
    this.defaultTaskCoolDowns.set(task.type, task.coolDown);
  };

  public setDefaultVillageTaskCoolDown = (villageId: number, task: IVillageBotTask): void => {
    let coolDowns = this.defaultVillageTaskCoolDowns.get(villageId);

    if (!coolDowns) {
      coolDowns = new Map();
      this.defaultVillageTaskCoolDowns.set(villageId, coolDowns);
    }

    coolDowns.set(task.type, task.coolDown);
  };

  public resetNextTaskExecution = (task: TaskType): void => {
    const nextExecution = new Date();
    const getCoolDown = this.defaultTaskCoolDowns.get(task);
    const delay = getCoolDown && getCoolDown().randomDelay() || 0;

    nextExecution.setSeconds(nextExecution.getSeconds() + delay);

    this.set(task, nextExecution);
  };

  public resetNextVillageTaskExecution = (villageId: number, task: VillageTaskType): void => {
    const nextExecution = new Date();
    const villageCoolDowns = this.defaultVillageTaskCoolDowns.get(villageId);
    const getCoolDown = villageCoolDowns && villageCoolDowns.get(task);
    const delay = getCoolDown && getCoolDown().randomDelay() || 0;

    nextExecution.setSeconds(nextExecution.getSeconds() + delay);

    this.setForVillage(villageId, task, nextExecution);
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
      villageId,
      task,
    });
  }
}
