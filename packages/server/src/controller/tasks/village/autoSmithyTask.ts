import { BuildingType } from 'shared/enums/BuildingType.js';
import { TaskType } from 'shared/enums/TaskType.js';

import type { CoolDown } from '../../../_models/coolDown.js';
import type {
  AutoSmithySettings,
  AutoSmithyUnitSettings,
} from '../../../_models/settings/tasks/autoSmithySettings.js';
import type { Village } from '../../../_models/village/village.js';
import { AccountContext } from '../../../accountContext.js';
import { getPage } from '../../../browser/getPage.js';
import { ensureBuildingSpotPage } from '../../actions/ensurePage.js';
import type {
  BotTaskWithCoolDown,
  BotTaskWithCoolDownResult,
} from '../../taskEngine/botTaskEngine.js';

export class AutoSmithyTask implements BotTaskWithCoolDown {
  readonly type: TaskType = TaskType.AutoSmithy;

  private settings = (): AutoSmithySettings =>
    AccountContext.getContext().settingsService.village(this.village.id).autoSmithy.get();

  public allowExecution = (): boolean =>
    AccountContext.getContext().settingsService.account.get().autoSmithy
    && this.settings().allow
    && !!this.settings().units.length;

  public coolDown = (): CoolDown => this.settings().coolDown;

  constructor(private village: Village) {
  }

  public execute = async (): Promise<BotTaskWithCoolDownResult | void> => {
    const smithy = this.village.buildings.spots.ofType(BuildingType.Smithy);

    if (!smithy?.level.actual) {
      return;
    }

    await ensureBuildingSpotPage(smithy.fieldId);

    const settings = this.settings();

    for (const unitSettings of settings.units) {
      await this.ensureUnit(unitSettings, settings.useHeroResources);
    }
  };

  private ensureUnit = async (unitSettings: AutoSmithyUnitSettings, useHeroResources: boolean): Promise<void> => {
    console.log(useHeroResources);

    const { unitIndex, levels } = unitSettings;
    const firstLevel = levels[0];

    const page = await getPage();
    const unitNodes = await page.$$('.research');

    for (const node of unitNodes) {
      if (!await node.$(`img[class*="u${unitIndex}"]`)) {
        continue;
      }

      const information = await node.$('.information');

      if (!information) {
        throw new Error('Did not find unit information');
      }

      AccountContext.getContext().logsService.logUnitUpgrade({
        unitIndex,
        level: firstLevel.targetLevel,
      });
    }
  };
}