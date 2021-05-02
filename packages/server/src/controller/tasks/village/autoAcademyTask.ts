import type { Page } from 'puppeteer';
import { BuildingType } from 'shared/enums/BuildingType.js';
import { VillageTaskType } from 'shared/enums/TaskType.js';

import { CoolDown } from '../../../_models/coolDown.js';
import { Duration } from '../../../_models/duration.js';
import { ClaimHeroResourcesReason } from '../../../_models/logs/content/resourceClaim.js';
import type { AutoAcademySettings } from '../../../_models/settings/tasks/autoAcademySettings.js';
import type { Village } from '../../../_models/village/village.js';
import { AccountContext } from '../../../accountContext.js';
import { getPage } from '../../../browser/getPage.js';
import { unitResearchPrerequisites } from '../../../constants/unitResearchPrerequisites.js';
import { BotEvent } from '../../../events/botEvent.js';
import { publishPayloadEvent } from '../../../pubSub.js';
import { unitUpgradeCostService } from '../../../services/info/unitUpgradeCostService.js';
import { canUseHeroResourcesInVillage } from '../../../utils/getUsableHeroResources.js';
import { mergeVillageAndHeroResources } from '../../../utils/mergeVillageAndHeroResources.js';
import { ensureBuildingSpotPage } from '../../actions/ensurePage.js';
import { claimHeroResources } from '../../actions/hero/claimHeroResources.js';
import { updateHeroResources } from '../../actions/hero/updateHeroResources.js';
import { updateActualResources } from '../../actions/village/updateResources.js';
import type {
  BotTaskWithCoolDownResult,
  VillageBotTaskWithCoolDown,
} from '../../taskEngine/botTaskEngine.js';

type OngoingResearch = {
  readonly duration: Duration;
  readonly unit: number;
}

const parseOngoingResearch = async (page: Page): Promise<OngoingResearch | null> => {
  const timer = await page.$('.under_progress .dur .timer');

  if (!timer) {
    return null;
  }

  const textDuration = await page.evaluate((el: HTMLElement) => el.textContent, timer);

  if (!textDuration) {
    throw new Error('Did not find duration but found the node');
  }

  const unit = await page.$eval('.under_progress .desc img', x => /u(\d+)/.exec(x.className)?.[1]);

  if (!unit) {
    throw new Error('Failed to parse unit');
  }

  const duration = Duration.fromText(textDuration);

  return {
    duration,
    unit: +unit,
  };
};

export class AutoAcademyTask implements VillageBotTaskWithCoolDown {
  readonly type: VillageTaskType = VillageTaskType.AutoAcademy;

  constructor(private village: Village) {}

  private settings = (): AutoAcademySettings =>
    AccountContext.getContext().settingsService.village(this.village.id).autoAcademy.get();

  public allowExecution = (): boolean =>
    AccountContext.getContext().settingsService.account.get().autoAcademy
    && this.settings().allow
    && !!this.settings().units.length;

  public coolDown = (): CoolDown => this.settings().coolDown;

  public execute = async (): Promise<BotTaskWithCoolDownResult | void> => {
    const academy = this.village.buildings.spots.ofType(BuildingType.Academy);

    if (!academy?.level.actual) {
      return;
    }

    const page = await getPage();

    await ensureBuildingSpotPage(academy.fieldId);

    const ongoingResearch = await parseOngoingResearch(page);

    if (ongoingResearch) {
      const oldUnits = this.settings().units;
      const newUnits = oldUnits.filter(unit => unit !== ongoingResearch.unit);

      if (oldUnits.length !== newUnits.length) {
        const newSettings = AccountContext.getContext().settingsService.village(this.village.id).autoAcademy.merge({ units: newUnits });

        publishPayloadEvent(BotEvent.AutoAcademySettingsUpdated, {
          villageId: this.village.id,
          settings: newSettings,
        });
      }

      return {
        nextCoolDown: CoolDown.fromDuration(ongoingResearch.duration),
      };
    }

    const { units, useHeroResources } = this.settings();

    const canUseHeroResources = useHeroResources && canUseHeroResourcesInVillage(this.village.id);

    if (canUseHeroResources) {
      await updateHeroResources();
    }


    const unitIndex = units[0];

    const prerequisites = unitResearchPrerequisites.get(unitIndex);

    if (!prerequisites?.length) {
      throw new Error(`Did not find any prerequisite for unit index: ${unitIndex}`);
    }

    const { spots } = this.village.buildings;

    for (const prerequisite of prerequisites) {
      const building = spots.ofType(prerequisite.building);

      if (!building || building.level.actual < prerequisite.level) {
        return;
      }
    }

    const villageResources = this.village.resources.amount;
    const totalResources = canUseHeroResources
      ? mergeVillageAndHeroResources(this.village.id)
      : villageResources;

    const cost = unitUpgradeCostService.getUpgradeCost(unitIndex, 0);

    const hasEnoughResources = totalResources.isGreaterOrEqualThan(cost);

    if (!hasEnoughResources) {
      return;
    }

    const unitNodes = await page.$$('.research');

    for (const node of unitNodes) {
      if (!await node.$(`img[class*="u${unitIndex}"]`)) {
        continue;
      }

      const information = await node.$('.information');

      if (!information) {
        throw new Error('Did not find unit information');
      }

      const confirmBtn = await information.$('button.green');

      if (!confirmBtn) {
        throw new Error('Did not find confirm button');
      }

      const needToClaimHeroResources = canUseHeroResources
        && villageResources.isLowerThan(cost);

      if (needToClaimHeroResources) {
        const resourcesToClaim = cost.subtract(villageResources);

        await claimHeroResources(resourcesToClaim, ClaimHeroResourcesReason.AutoAcademy);
      }

      AccountContext.getContext().logsService.logUnitUpgrade({
        unitIndex,
        level: 0,
      });

      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        confirmBtn.click(),
      ]);

      const newUnits = units.filter(unit => unit !== unitIndex);
      const settings = AccountContext.getContext().settingsService.village(this.village.id).autoAcademy.merge({ units: newUnits });

      publishPayloadEvent(BotEvent.AutoAcademySettingsUpdated, {
        villageId: this.village.id,
        settings,
      });

      const ongoingResearch = await parseOngoingResearch(page);

      if (!ongoingResearch) {
        throw new Error('Did not find ongoing research duration after submitting research');
      }

      await updateActualResources();

      return {
        nextCoolDown: CoolDown.fromDuration(ongoingResearch.duration),
      };
    }

    console.error('Did not find the unit for auto academy');
    AccountContext.getContext().logsService.logError('Did not find the unit for auto academy');
  };
}