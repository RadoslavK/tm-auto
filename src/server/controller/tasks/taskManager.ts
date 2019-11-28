// eslint-disable-next-line max-classes-per-file
import { TravianPath } from '../../_enums/travianPath';
import { Village } from '../../_models/village/village';
import { accountContext } from '../../accountContext';
import { BotEvent } from '../../graphql/subscriptions/botEvent';
import {
  publishEvent,
  publishPayloadEvent,
} from '../../graphql/subscriptions/pubSub';
import { updateHeroInformation } from '../../parsers/hero/updateHeroInformation';
import { getAllEnumValues } from '../../utils/enumUtils';
import { randomElement } from '../../utils/randomElement';
import { shuffle } from '../../utils/shuffle';
import { updateBuildings } from '../actions/buildings/updateBuildings';
import { ensurePage } from '../actions/ensurePage';
import { ensureVillageSelected } from '../actions/ensureVillageSelected';
import { updatePlayerInfo } from '../actions/player/updatePlayerInfo';
import { updateNewOldVillages } from '../actions/village/updateNewOldVillages';
import { updateResources } from '../actions/village/updateResources';
import { updateUnitsInformation } from '../updateUnitsInformation';
import { IBotTask } from './_types';
import { AutoAdventureTask } from './village/autoAdventureTask';
import { AutoBuildTask } from './village/autoBuildTask';
import { AutoPartyTask } from './village/autoPartyTask';
import { AutoUnitsTask } from './village/autoUnitsTask';

class BotTaskEngine<TArgs = undefined> {
  private readonly m_task: IBotTask;
  private m_timeOfNextExecution: Date = new Date();

  constructor(task: IBotTask) {
    this.m_task = task;
  }

  private isExecutionReady = (): boolean => this.m_timeOfNextExecution < new Date();

  public execute = async (): Promise<void> => {
    if (!this.m_task.allowExecution() || !this.isExecutionReady()) {
      return;
    }

    const timeOfStart = new Date();
    const result = await this.m_task.execute();

    const coolDown = result && result.nextCoolDown
      ? result.nextCoolDown.getMin(this.m_task.coolDown())
      : this.m_task.coolDown();

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
      await task.execute();
    }
  };
}

export class TaskManager {
  private readonly m_generalTasks: readonly BotTaskEngine[];
  private readonly m_villageTasks: Record<number, VillageBotTasksEngine> = {};
  private readonly m_finalTasks: readonly BotTaskEngine[];

  constructor() {
    this.m_generalTasks = [];
    this.m_finalTasks = [];
  }

  public execute = async (): Promise<void> => {
    if (!accountContext.settingsService.general.get().allowTasks) {
      return;
    }

    await this.doGeneralTasks();
    await this.doVillageTasks();
    await this.doFinalTasks();
  };

  private doGeneralTasks = async (): Promise<void> => {
    await ensurePage(randomElement(getAllEnumValues(TravianPath)));
    await updateNewOldVillages();
    await updateHeroInformation();
    await updatePlayerInfo();

    for (const task of this.m_generalTasks) {
      await task.execute();
    }
  };

  private doVillageTasks = async (): Promise<void> => {
    const villages = accountContext.villageService.allVillages();

    for (const village of shuffle(villages)) {
      if (!accountContext.settingsService.village(village.id).general.get().allowTasks) {
        return;
      }

      await ensureVillageSelected(village.id);

      await updateResources();
      await updateBuildings();
      // await updateUnitsInformation();

      let taskEngine = this.m_villageTasks[village.id];

      if (!taskEngine) {
        taskEngine = new VillageBotTasksEngine(village, [
          AutoAdventureTask,
          AutoPartyTask,
          //  TODO: autobuild storage, mozno spojit s autobuildom
          // AutoBuildStorage,
          AutoBuildTask,
          // Update resources - market
          AutoUnitsTask,
        ]);
        this.m_villageTasks[village.id] = taskEngine;
      }

      await taskEngine.execute();

      await publishPayloadEvent(BotEvent.BuildingsUpdated, { villageId: village.id });
      await publishEvent(BotEvent.VillageUpdated);
    }
  };

  private doFinalTasks = async (): Promise<void> => {
    for (const task of this.m_finalTasks) {
      await task.execute();
    }
  };
}
