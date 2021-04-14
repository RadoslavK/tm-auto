import { getAllEnumValues } from 'shared/utils/enumUtils.js';

import { TravianPath } from '../_enums/travianPath.js';
import { AccountContext } from '../accountContext.js';
import { BotEvent } from '../events/botEvent.js';
import { updateHeroInformation } from '../parsers/hero/updateHeroInformation.js';
import { publishPayloadEvent } from '../pubSub.js';
import { randomElement } from '../utils/randomElement.js';
import { shuffle } from '../utils/shuffle.js';
import { updateBuildings } from './actions/buildings/updateBuildings.js';
import { ensurePage } from './actions/ensurePage.js';
import { ensureVillageSelected } from './actions/ensureVillageSelected.js';
import { collectTaskRewards } from './actions/mentor/collectTaskRewards.js';
import { updateCapitalAndAlly } from './actions/player/updateCapitalAndAlly.js';
import { updateNewOldVillages } from './actions/village/updateNewOldVillages.js';
import { updateResources } from './actions/village/updateResources.js';
import {
  BotTaskEngine,
  BotTaskEngineWithCoolDown,
  IBotTaskEngine,
} from './taskEngine/botTaskEngine.js';
import { VillageBotTasksEngine } from './taskEngine/villageBotTaskEngine.js';
import { DailyRewardsTask } from './tasks/dailyRewardsTask.js';
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
    this._generalTasks = [
      new BotTaskEngine(new DailyRewardsTask()),
    ];
    this._finalTasks = [];
    this._villageTasks = {};

    const autoAdventureTask = new AutoAdventureTask();

    this._autoAdventureTask = new BotTaskEngineWithCoolDown(
      autoAdventureTask,
      () =>
        AccountContext.getContext().nextExecutionService.get(autoAdventureTask.type),
      (nextExecution) => {
        AccountContext.getContext().nextExecutionService.set(
          autoAdventureTask.type,
          nextExecution,
        );
      },
    );
  }

  public execute = async (): Promise<void> => {
    if (!AccountContext.getContext().settingsService.account.get().allowTasks) {
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
    await updateCapitalAndAlly();

    for (const task of this._generalTasks) {
      await task.execute();
    }
  };

  private doVillageTasks = async (): Promise<void> => {
    const villages = AccountContext.getContext().villageService.allVillages();
    const scannedVillages = shuffle(villages.filter(v => v.scanned));
    const notScannedVillages = shuffle(villages.filter(v => !v.scanned));

    //  Scan not scanned villages first
    for (const village of notScannedVillages.concat(scannedVillages)) {
      if (
        !AccountContext.getContext().settingsService.village(village.id).general.get()
          .allowTasks
      ) {
        continue;
      }

      let taskEngine = this._villageTasks[village.id];

      if (!taskEngine) {
        taskEngine = new VillageBotTasksEngine(village, [
          AutoPartyTask,
          AutoBuildTask,
          // TODO - Update resources - market
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
      await collectTaskRewards();
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
