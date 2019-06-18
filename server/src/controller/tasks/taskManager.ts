import { TravianPath } from '../../_enums/TravianPath';
import { Village } from '../../_models/village/village';
import { ITaskSettings } from '../../_types/ITaskSettings';
import { context } from '../../graphql/context';
import { Events } from '../../graphql/subscriptions/events';
import { pubSub } from '../../graphql/subscriptions/pubSub';
import { updateHeroInformation } from '../../parsers/hero/getHeroInformation';
import { getAllEnumValues } from '../../utils/enumUtils';
import { randomElement } from '../../utils/randomElement';
import { shuffle } from '../../utils/shuffle';
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
    for (const task of this._tasks) {
      await task.execute()
    }
  };
}

export class TaskManager {
  private readonly _generalTasks: readonly BotTaskEngine[];
  private readonly _villageTasks: Record<number, VillageBotTasksEngine>  = {};
  private readonly _finalTasks: readonly BotTaskEngine[];

  constructor() {
    this._generalTasks = [];
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

    for (const task of this._generalTasks) {
      await task.execute()
    }
  };

  private doVillageTasks = async (): Promise<void> => {
    const villages = context.villages.all();

    for (const village of shuffle(villages)) {
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
          AutoAdventureTask,
          //  TODO: autobuild storage, mozno spojit s autobuildom
          // AutoBuildStorage,
          AutoBuildTask,
          AutoUnitsTask,
        ]);
        this._villageTasks[village.id] = taskEngine;
      }

      await taskEngine.execute();

      await pubSub.publish(Events.BuildingsUpdated, null);
      await pubSub.publish(Events.VillageUpdated, null);
    }
  };

  private doFinalTasks = async (): Promise<void> => {
    for (const task of this._finalTasks) {
      await task.execute()
    }
  };
}
