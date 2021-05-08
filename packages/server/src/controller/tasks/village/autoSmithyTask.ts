import { BuildingType } from 'shared/enums/BuildingType.js';
import { VillageTaskType } from 'shared/enums/TaskType.js';

import { CoolDown } from '../../../_models/coolDown.js';
import { Duration } from '../../../_models/duration.js';
import { ClaimHeroResourcesReason } from '../../../_models/logs/content/resourceClaim.js';
import { Resources } from '../../../_models/misc/resources.js';
import type {
  AutoSmithySettings,
  AutoSmithyUnitSettings,
} from '../../../_models/settings/tasks/autoSmithySettings.js';
import type { Village } from '../../../_models/village/village.js';
import { AccountContext } from '../../../accountContext.js';
import { browserManager } from '../../../browser/browserManager.js';
import { BotEvent } from '../../../events/botEvent.js';
import { publishPayloadEvent } from '../../../pubSub.js';
import { canUseHeroResourcesInVillage } from '../../../utils/getUsableHeroResources.js';
import { mergeVillageAndHeroResources } from '../../../utils/mergeVillageAndHeroResources.js';
import { ensureBuildingSpotPage } from '../../actions/ensurePage.js';
import { claimHeroResources } from '../../actions/hero/claimHeroResources.js';
import { updateHeroResources } from '../../actions/hero/updateHeroResources.js';
import type {
  BotTaskWithCoolDownResult,
  VillageBotTaskWithCoolDown,
} from '../../taskEngine/botTaskEngine.js';

type UnitParams = {
  readonly actualLevel: number;
  readonly nextLevelCost: Resources;
}

//  key - unitIndex
const parseActualUnits = async (): Promise<ReadonlyMap<number, UnitParams>> => {
  const page = await browserManager.getPage();

  const researchNodes = await page.$$('.research');

  const levels = new Map<number, UnitParams>();

  for (const researchNode of researchNodes) {
    const unitIndex = await researchNode.$eval('.unitZoom', x => {
      const onclickText = x.getAttribute('onclick');

      if (!onclickText) {
        return null;
      }

      return /unitZoom\((\d+)/.exec(onclickText)?.[1];
    });

    if (!unitIndex) {
      throw new Error('Failed to parse unit index');
    }

    const information = await researchNode.$('.information');

    if (!information) {
      throw new Error('Did not find information node');
    }

    const level = await information.$eval('.level', x => {
      const text = x.textContent;

      if (!text) {
        return null;
      }

      const reg = /(\d+)/g;

      let level: number | null = null;
      let result: RegExpExecArray | null;

      while((result = reg.exec(text)) !== null) {
        if (level === null) {
          level = +result[1];
        } else {
          level += +result[1];
        }
      }

      return level;
    });

    if (level === null) {
      throw new Error('Failed to parse level');
    }

    let nextLevelCost: Resources;

    if (level === 20) {
      nextLevelCost = new Resources();
    } else {
      const getResource = async (index: number): Promise<number> => {
        const res = await information.$eval(`.resourceWrapper .resource:nth-child(${index}) .value`, x => +(x.textContent ?? -1));

        if (res === -1) {
          throw new Error('Failed to parse resource');
        }

        return res;
      };

      const wood = await getResource(1);
      const clay = await getResource(1);
      const iron = await getResource(1);
      const crop = await getResource(1);
      nextLevelCost = new Resources({ wood,  clay, iron, crop });
    }

    levels.set(+unitIndex, {
      actualLevel: level,
      nextLevelCost,
    });
  }

  return levels;
};

const parseOngoingDuration = async (): Promise<Duration | null> => {
  const page = await browserManager.getPage();
  const timer = await page.$('.under_progress .dur .timer');

  if (!timer) {
    return null;
  }

  const textDuration = await page.evaluate((el: HTMLElement) => el.textContent, timer);

  if (!textDuration) {
    throw new Error('Failed to extract duration');
  }

  return Duration.fromText(textDuration);
};

//  TODO check min troops
export class AutoSmithyTask implements VillageBotTaskWithCoolDown {
  readonly type: VillageTaskType = VillageTaskType.AutoSmithy;

  private settingsService = () =>
    AccountContext.getContext().settingsService.village(this.village.id).autoSmithy;

  private settings = (): AutoSmithySettings => this.settingsService().get();

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

    const settings = this.settings();
    const canUseHeroResources = settings.useHeroResources && canUseHeroResourcesInVillage(this.village.id);

    if (canUseHeroResources) {
      await updateHeroResources();
    }

    await ensureBuildingSpotPage(smithy.fieldId);

    const actualUnits = await parseActualUnits();
    this.removeAlreadyUpgradedUnits(actualUnits);

    const ongoingDuration = await parseOngoingDuration();

    if (ongoingDuration) {
      return {
        nextCoolDown: CoolDown.fromDuration(ongoingDuration),
      };
    }

    const villageResources = this.village.resources.amount;
    const totalResources = canUseHeroResources
      ? mergeVillageAndHeroResources(this.village.id)
      : villageResources;

    for (const unitSettings of settings.units) {
      const actualUnitParams = actualUnits.get(unitSettings.unitIndex);

      if (!actualUnitParams) {
        //  Its not available
        continue;
      }

      const nextLevel = actualUnitParams.actualLevel + 1;

      if (nextLevel > smithy.level.actual) {
        continue;
      }

      const hasEnoughResources = totalResources.isGreaterOrEqualThan(actualUnitParams.nextLevelCost);

      if (!hasEnoughResources) {
        continue;
      }

      if (canUseHeroResources) {
        const neededRes = actualUnitParams.nextLevelCost.subtract(villageResources);

        if (neededRes.getTotal() > 0) {
          await claimHeroResources(neededRes, ClaimHeroResourcesReason.AutoSmithy);
          await ensureBuildingSpotPage(smithy.fieldId);
        }
      }

      await this.ensureUnit(unitSettings, nextLevel);

      break;
    }
  };

  private removeAlreadyUpgradedUnits = (actualUnits: ReadonlyMap<number, UnitParams>): void => {
    const { units } = this.settings();

    for (const [unitIndex, { actualLevel }] of actualUnits) {
      const unit = units.find(u => u.unitIndex === unitIndex);

      if (!unit) {
        continue;
      }

      const { levels } = unit;
      let newLevels = levels.filter(l => l.targetLevel > actualLevel);

      const newUnit: AutoSmithyUnitSettings = { ...unit, levels: newLevels };

      if (newLevels.length) {
        if (newLevels.length !== levels.length) {
          const newUnits = units.map(unit => unit.unitIndex === newUnit.unitIndex
            ? newUnit
            : unit);

          this.settingsService().merge({ units: newUnits });

          publishPayloadEvent(BotEvent.AutoSmithySettingsUnitUpdated, {
            villageId: this.village.id,
            unitSettings: newUnit,
          });
        }
      } else {
        const newUnits = units.filter(unit => unit.unitIndex !== newUnit.unitIndex);

        this.settingsService().merge({ units: newUnits });

        publishPayloadEvent(BotEvent.AutoSmithySettingsUnitRemoved, {
          villageId: this.village.id,
          unitSettings: newUnit,
        });
      }
    }
  };

  private ensureUnit = async (unitSettings: AutoSmithyUnitSettings, nextLevel: number): Promise<void> => {
    const { unitIndex, levels } = unitSettings;
    const firstLevel = levels[0];

    const page = await browserManager.getPage();
    const unitNodes = await page.$$('.research');

    for (const node of unitNodes) {
      if (!await node.$(`img[class*="u${unitIndex}"]`)) {
        continue;
      }

      const confirmBtn = await node.$('.information button.green');

      if (!confirmBtn) {
        throw new Error('Did not find confirm button');
      }

      AccountContext.getContext().logsService.logUnitUpgrade({
        unitIndex,
        level: nextLevel,
      });

      if (firstLevel.targetLevel === nextLevel) {
        const { units } = this.settings();

        if (levels.length === 1) {
          const newUnit: AutoSmithyUnitSettings = { ...unitSettings, levels: [] };
          const newUnits = units.filter(unit => unit.unitIndex !== newUnit.unitIndex);

          this.settingsService().merge({ units: newUnits });

          publishPayloadEvent(BotEvent.AutoSmithySettingsUnitRemoved, {
            villageId: this.village.id,
            unitSettings: newUnit,
          });
        } else {
          const newLevels = [...levels];
          newLevels.shift();
          const newUnit: AutoSmithyUnitSettings = { ...unitSettings, levels: newLevels };
          const newUnits = units.map(unit => unit.unitIndex === newUnit.unitIndex
            ? newUnit
            : unit);

          this.settingsService().merge({ units: newUnits });

          publishPayloadEvent(BotEvent.AutoSmithySettingsUnitUpdated, {
            villageId: this.village.id,
            unitSettings: newUnit,
          });
        }
      }

      await Promise.all([
        page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
        confirmBtn.click(),
      ]);

      break;
    }
  };
}