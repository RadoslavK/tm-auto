import { BuildingType } from 'shared/enums/BuildingType.js';
import { TaskType } from 'shared/enums/TaskType.js';

import type { CoolDown } from '../../../_models/coolDown.js';
import type { AutoAcademySettings } from '../../../_models/settings/tasks/autoAcademySettings.js';
import type { Village } from '../../../_models/village/village.js';
import { AccountContext } from '../../../accountContext.js';
import { ensureBuildingSpotPage } from '../../actions/ensurePage.js';
import type {
  BotTaskWithCoolDown,
  BotTaskWithCoolDownResult,
} from '../../taskEngine/botTaskEngine.js';

export class AutoAcademyTask implements BotTaskWithCoolDown {
  readonly type: TaskType = TaskType.AutoAcademy;

  constructor(private village: Village) {}

  private settings = (): AutoAcademySettings =>
    AccountContext.getContext().settingsService.village(this.village.id).autoAcademy.get();

  public allowExecution = (): boolean => this.settings().allow;

  public coolDown = (): CoolDown => this.settings().coolDown;

  public execute = async (): Promise<BotTaskWithCoolDownResult | void> => {
    const academy = this.village.buildings.spots.ofType(BuildingType.Academy);

    if (!academy?.level.actual) {
      return;
    }

    await ensureBuildingSpotPage(academy.fieldId);
  };
}