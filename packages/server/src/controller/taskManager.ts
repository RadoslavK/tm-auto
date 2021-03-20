import { getAllEnumValues } from 'shared/utils/enumUtils.js';
import { TravianPath } from '../_enums/travianPath.js';
import { getAccountContext } from '../accountContext.js';
import { BotEvent } from '../events/botEvent.js';
import { updateHeroInformation } from '../parsers/hero/updateHeroInformation.js';
import { publishPayloadEvent } from '../pubSub.js';
import { randomElement } from '../utils/randomElement.js';
import { shuffle } from '../utils/shuffle.js';
import { updateBuildings } from './actions/buildings/updateBuildings.js';
import { ensurePage } from './actions/ensurePage.js';
import { ensureVillageSelected } from './actions/ensureVillageSelected.js';
import { updateHeroResources } from './actions/hero/updateHeroResources.js';
import { updatePlayerInfo } from './actions/player/updatePlayerInfo.js';
import { updateNewOldVillages } from './actions/village/updateNewOldVillages.js';
import { updateResources } from './actions/village/updateResources.js';
import {
  BotTaskEngine,
  BotTaskEngineWithCoolDown,
  IBotTaskEngine,
} from './taskEngine/botTaskEngine.js';
import { VillageBotTasksEngine } from './taskEngine/villageBotTaskEngine.js';
import { AutoMentorTask } from './tasks/autoMentorTask.js';
import { AutoAdventureTask } from './tasks/village/autoAdventureTask.js';
import { AutoBuildTask } from './tasks/village/autoBuildTask';
import { AutoPartyTask } from './tasks/village/autoPartyTask.js';
import { AutoUnitsTask } from './tasks/village/autoUnitsTask.js';

export class TaskManager {
  private readonly _generalTasks: readonly IBotTaskEngine[];

  private readonly _villageTasks: Record<string, VillageBotTasksEngine>;

  private readonly _finalTasks: readonly IBotTaskEngine[];

  //  special handling
  private readonly _autoAdventureTask: BotTaskEngineWithCoolDown;

  constructor() {
    this._generalTasks = [new BotTaskEngine(new AutoMentorTask())];
    this._finalTasks = [];
    this._villageTasks = {};

    const autoAdventureTask = new AutoAdventureTask();

    this._autoAdventureTask = new BotTaskEngineWithCoolDown(
      autoAdventureTask,
      () =>
        getAccountContext().nextExecutionService.get(autoAdventureTask.type),
      (nextExecution) => {
        getAccountContext().nextExecutionService.set(
          autoAdventureTask.type,
          nextExecution,
        );
      },
    );
  }

  public execute = async (): Promise<void> => {
    if (!getAccountContext().settingsService.account.get().allowTasks) {
      return;
    }

    await this.doGeneralTasks();
    await this.doVillageTasks();
    await this.doFinalTasks();
  };

  private doGeneralTasks = async (): Promise<void> => {
    await ensurePage(
      randomElement(
        getAllEnumValues(TravianPath).filter(
          (x) => ![TravianPath.Logout, TravianPath.AccountOverview].includes(x),
        ),
      ),
    );
    await updateNewOldVillages();
    await updateHeroInformation();
    await updateHeroResources();
    await updatePlayerInfo();

    for (const task of this._generalTasks) {
      await task.execute();
    }
  };

  private doVillageTasks = async (): Promise<void> => {
    const villages = getAccountContext().villageService.allVillages();

    for (const village of shuffle(villages)) {
      if (
        !getAccountContext().settingsService.village(village.id).general.get()
          .allowTasks
      ) {
        continue;
      }

      let taskEngine = this._villageTasks[village.id];

      if (!taskEngine) {
        taskEngine = new VillageBotTasksEngine(village, [
          AutoPartyTask,
          AutoBuildTask,
          // Update resources - market
          AutoUnitsTask,
        ]);
        this._villageTasks[village.id] = taskEngine;
      }

      if (
        !this._autoAdventureTask.isExecutionReady() &&
        !taskEngine.isExecutionReady()
      ) {
        continue;
      }

      await ensureVillageSelected(village.id);

      await updateResources();
      await updateBuildings();

      await this._autoAdventureTask.execute();

      await taskEngine.execute();

      publishPayloadEvent(BotEvent.VillageUpdated, { village });
    }
  };

  private doFinalTasks = async (): Promise<void> => {
    for (const task of this._finalTasks) {
      await task.execute();
    }
  };
}
