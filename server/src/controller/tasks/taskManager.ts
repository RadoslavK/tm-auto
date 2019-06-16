import { TravianPath } from '../../_enums/TravianPath';
import { Village } from '../../_models/village/village';
import { ITaskSettings } from '../../_types/ITaskSettings';
import { context } from '../../graphql/context';
import { Events } from '../../graphql/subscriptions/events';
import { pubSub } from '../../graphql/subscriptions/pubSub';
import { updateHeroInformation } from '../../parsers/hero/getHeroInformation';
import { getAllEnumValues } from '../../utils/enumUtils';
import { randomElement } from '../../utils/randomElement';
import { updateBuildings } from '../actions/build/updateBuildings';
import { ensurePage } from '../actions/ensurePage';
import { ensureVillageSelected } from '../actions/ensureVillageSelected';
import { updateResources } from '../actions/village/updateResources';
import { updateUnitsInformation } from '../updateUnitsInformation';
import { AutoAdventureTask } from './autoAdventureTask';
import { AutoBuildTask } from './autoBuildTask';
import { AutoUnitsTask } from './autoUnitsTask';

export interface IBotTask {
  readonly settings: () => ITaskSettings;
  readonly execute: () => Promise<void>;
}

class BotTaskEngine<TArgs = undefined> {
  private readonly _task: IBotTask;
  private _timeOfNextExecution: Date = new Date();

  constructor(task: { new(args: TArgs): IBotTask }, args: TArgs = undefined) {
    this._task = new task(args);
  }

  private _isExecutionReady = (): boolean => this._timeOfNextExecution < new Date();

  public execute = async (): Promise<void> => {
    if (!this._task.settings().allow || !this._isExecutionReady()) {
      return;
    }

    const timeOfStart = new Date();
    await this._task.execute();
    const coolDown = this._task.settings().coolDown;
    const delay = coolDown.randomDelay();

    this._timeOfNextExecution = timeOfStart;
    this._timeOfNextExecution.setSeconds(this._timeOfNextExecution.getSeconds() + delay);
  }
}

class VillageBotTasksEngine {
  private readonly _tasks: readonly BotTaskEngine[];

  constructor(village: Village, tasks: { new(village: Village): IBotTask }[]) {
    this._tasks = tasks.map(task => new BotTaskEngine<Village>(task, village));
  }

  public execute = async (): Promise<void> => {
    await this._tasks.forEach(async (task) => await task.execute());
  };
}

export class TaskManager {
  private readonly _generalTasks: readonly BotTaskEngine[];
  private readonly _villageTasks: Record<number, VillageBotTasksEngine>  = {};
  private readonly _finalTasks: readonly BotTaskEngine[];

  constructor() {
    this._generalTasks = [
      new BotTaskEngine(AutoAdventureTask),
    ];

    this._finalTasks = [];
  }

  public execute = async (): Promise<void> => {
    if (!context.settings.general.allowTasks) {
      return;
    }

    await this.doGeneralTasks();
    await this.doVillageTasks();
    await this.doFinalTasks();
  };

  private doGeneralTasks = async (): Promise<void> => {
    await ensurePage(randomElement(getAllEnumValues(TravianPath)));
    await updateHeroInformation();

    await this._generalTasks.forEach(async (task) => await task.execute());
  };

  private doVillageTasks = async (): Promise<void> => {
    const villages = context.villages.all();

    await villages.forEach(async (village) => {
      if (!context.settings.village(village.id).general.allowTasks) {
        return;
      }

      await ensureVillageSelected(village.id);

      await updateResources();
      await updateBuildings();
      await updateUnitsInformation();

      let taskEngine = this._villageTasks[village.id];

      if (!taskEngine) {
        taskEngine = new VillageBotTasksEngine(village, [
          AutoBuildTask,
          AutoUnitsTask,
        ]);
        this._villageTasks[village.id] = taskEngine;
      }

      await taskEngine.execute();

      await pubSub.publish(Events.BuildingsUpdated, null);
      await pubSub.publish(Events.VillageUpdated, null);
    });
  };

  private doFinalTasks = async (): Promise<void> => {
    await this._finalTasks.forEach(async (task) => await task.execute());
  };
}
