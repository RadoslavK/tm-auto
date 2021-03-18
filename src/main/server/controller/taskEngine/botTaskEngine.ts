import { CoolDown } from '../../_models/coolDown.js';
import { TaskType } from '../../_models/misc/taskType.js';

export type BotTaskWithCoolDownResult = {
  readonly nextCoolDown?: CoolDown | null;
};

export type BotTaskBase = {
  readonly allowExecution: () => boolean;
  readonly type: TaskType;
};

export type BotTask = BotTaskBase & {
  readonly execute: () => Promise<void>;
};

export type BotTaskWithCoolDown = BotTaskBase & {
  readonly allowExecution: () => boolean;
  readonly coolDown: () => CoolDown;
  readonly execute: () => Promise<BotTaskWithCoolDownResult | void>;
};

export interface IBotTaskEngine {
  execute: () => Promise<void>;
  isExecutionReady: () => boolean;
}

export class BotTaskEngine implements IBotTaskEngine {
  protected readonly _task: BotTask;

  constructor(task: BotTask) {
    this._task = task;
  }

  public isExecutionReady = (): boolean => this._task.allowExecution();

  public execute = async (): Promise<void> => {
    if (!this.isExecutionReady()) {
      return;
    }

    await this._task.execute();
  };
}

export class BotTaskEngineWithCoolDown implements IBotTaskEngine {
  protected readonly _task: BotTaskWithCoolDown;

  private readonly _setNextExecution: (nextExecution: Date) => void;

  private readonly _getNextExecution: () => Date;

  constructor(
    task: BotTaskWithCoolDown,
    getNextExecution: () => Date,
    setNextExecution: (nextExecution: Date) => void,
  ) {
    this._task = task;
    this._setNextExecution = setNextExecution;
    this._getNextExecution = getNextExecution;
  }

  public isExecutionReady = (): boolean =>
    this._task.allowExecution() &&
    (!this._getNextExecution || this._getNextExecution() <= new Date());

  public execute = async (): Promise<void> => {
    if (!this.isExecutionReady()) {
      return;
    }

    const timeOfStart = new Date();
    const result = await this._task.execute();

    const coolDown =
      result && result.nextCoolDown
        ? result.nextCoolDown.mergeMin(this._task.coolDown())
        : this._task.coolDown();

    const delay = coolDown.getRandomDelay();

    const timeOfNextExecution = timeOfStart;
    timeOfNextExecution.setSeconds(timeOfNextExecution.getSeconds() + delay);

    this._setNextExecution(timeOfNextExecution);
  };
}
