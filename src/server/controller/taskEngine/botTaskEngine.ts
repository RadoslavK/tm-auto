import { CoolDown } from '../../_models/coolDown';
import {
  TaskType,
  VillageTaskType,
} from '../../../_shared/types/taskType';

export type BotTaskResult = {
  readonly nextCoolDown?: CoolDown | null;
};

type BotTaskBase = {
  readonly allowExecution: () => boolean;
  readonly coolDown: () => CoolDown;
  readonly execute: () => Promise<BotTaskResult | void>;
};

export type BotTask = BotTaskBase & {
  readonly type: TaskType;
};

export type VillageBotTask = BotTaskBase & {
  readonly type: VillageTaskType;
};

export class BotTaskEngine {
  private readonly _task: BotTask | VillageBotTask;
  private readonly _setNextExecution: (nextExecution: Date) => void;
  private readonly _getNextExecution: () => Date;

  constructor(task: BotTask | VillageBotTask, getNextExecution: () => Date, setNextExecution: (nextExecution: Date) => void) {
    this._task = task;
    this._setNextExecution = setNextExecution;
    this._getNextExecution = getNextExecution;
  }

  public isExecutionReady = (): boolean => this._task.allowExecution()
    && this._getNextExecution() < new Date();

  public execute = async (): Promise<void> => {
    if (!this.isExecutionReady()) {
      return;
    }

    const timeOfStart = new Date();
    const result = await this._task.execute();

    const coolDown = result && result.nextCoolDown
      ? result.nextCoolDown.mergeMin(this._task.coolDown())
      : this._task.coolDown();

    const delay = coolDown.getRandomDelay();

    const timeOfNextExecution = timeOfStart;
    timeOfNextExecution.setSeconds(timeOfNextExecution.getSeconds() + delay);

    this._setNextExecution(timeOfNextExecution);
  };
}