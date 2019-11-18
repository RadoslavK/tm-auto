// eslint-disable-next-line max-classes-per-file
import { TravianPath } from '../../_enums/TravianPath';
import { Village } from '../../_models/village/village';
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
import { AutoAdventureTask } from './village/autoAdventureTask';
import { AutoBuildTask } from './village/autoBuildTask';
import { AutoPartyTask } from './village/autoPartyTask';
import { AutoUnitsTask } from './village/autoUnitsTask';
import { settingsService } from '../../services/settingsService';
import { villagesService } from '../../services/villageService';
import { IBotTask } from '../../_models/tasks';

class BotTaskEngine<TArgs = undefined> {
  private readonly m_task: IBotTask;
  private m_timeOfNextExecution: Date = new Date();

  constructor(task: IBotTask) {
    this.m_task = task;
  }

  private isExecutionReady = (): boolean => this.m_timeOfNextExecution < new Date();

  public execute = async (): Promise<void> => {
    if (!this.m_task.settings().allow || !this.isExecutionReady()) {
      return;
    }

    const timeOfStart = new Date();
    const result = await this.m_task.execute() || {};

    const coolDown = result.nextCoolDown
      ? result.nextCoolDown.getMin(this.m_task.settings().coolDown)
      : this.m_task.settings().coolDown;

    const delay = coolDown.randomDelay();

    this.m_timeOfNextExecution = timeOfStart;
    this.m_timeOfNextExecution.setSeconds(this.m_timeOfNextExecution.getSeconds() + delay);
  }
}

class VillageBotTasksEngine {
  private readonly m_tasks: readonly BotTaskEngine[];

  constructor(village: Village, tasks: { new(village: Village): IBotTask }[]) {
    this.m_tasks = tasks.map(Task => {
      const task = new Task(village);
      return new BotTaskEngine<Village>(task);
    });
  }

  public execute = async (): Promise<void> => {
    for (const task of this.m_tasks) {
      await task.execute()
    }
  };
}

export class TaskManager {
  private readonly m_generalTasks: readonly BotTaskEngine[];
  private readonly m_villageTasks: Record<number, VillageBotTasksEngine>  = {};
  private readonly m_finalTasks: readonly BotTaskEngine[];

  constructor() {
    this.m_generalTasks = [];
    this.m_finalTasks = [];
  }

  public execute = async (): Promise<void> => {
    if (!settingsService.get().general.allowTasks) {
      return;
    }

    await this.doGeneralTasks();
    await this.doVillageTasks();
    await this.doFinalTasks();
  };

  private doGeneralTasks = async (): Promise<void> => {
    await ensurePage(randomElement(getAllEnumValues(TravianPath)));
    await updateHeroInformation();

    for (const task of this.m_generalTasks) {
      await task.execute()
    }
  };

  private doVillageTasks = async (): Promise<void> => {
    const villages = villagesService.get().all();

    for (const village of shuffle(villages)) {
      if (!settingsService.get().village(village.id).general.allowTasks) {
        return;
      }

      await ensureVillageSelected(village.id);

      await updateResources();
      await updateBuildings();
      await updateUnitsInformation();

      let taskEngine = this.m_villageTasks[village.id];

      if (!taskEngine) {
        taskEngine = new VillageBotTasksEngine(village, [
          AutoAdventureTask,
          AutoPartyTask,
          //  TODO: autobuild storage, mozno spojit s autobuildom
          // AutoBuildStorage,
          AutoBuildTask,
          AutoUnitsTask,
        ]);
        this.m_villageTasks[village.id] = taskEngine;
      }

      await taskEngine.execute();

      await pubSub.publish(Events.BuildingsUpdated, null);
      await pubSub.publish(Events.VillageUpdated, null);
    }
  };

  private doFinalTasks = async (): Promise<void> => {
    for (const task of this.m_finalTasks) {
      await task.execute()
    }
  };
}
