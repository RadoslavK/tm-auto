import { VillageTaskType } from 'shared/enums/TaskType.js';
import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

class UseHeroResourcesVillageSettings {
  public readonly wood: boolean = true;
  public readonly clay: boolean = true;
  public readonly iron: boolean = true;
  public readonly crop: boolean = true;

  constructor(params: PartialFields<UseHeroResourcesVillageSettings> = {}) {
    mergeDefaults(this, params);
  }
}

export class GeneralVillageSettings {
  public readonly allowTasks: boolean = true;

  public readonly tasksOrder: ReadonlyArray<VillageTaskType> = [
    VillageTaskType.AutoParty,
    VillageTaskType.AutoBuild,
    VillageTaskType.AutoUnits,
    VillageTaskType.AutoAcademy,
    VillageTaskType.AutoSmithy,
  ];

  public readonly useHeroResources: UseHeroResourcesVillageSettings = new UseHeroResourcesVillageSettings();

  constructor(params: PartialFields<GeneralVillageSettings> = {}) {
    mergeDefaults(this, params);
  }
}
