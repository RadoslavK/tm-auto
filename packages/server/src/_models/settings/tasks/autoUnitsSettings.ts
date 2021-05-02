import { BuildingType } from 'shared/enums/BuildingType.js';
import type { Tribe } from 'shared/enums/Tribe.js';
import type { PartialFields } from 'shared/types/fields.type.js';
import { mergeDefaults } from 'shared/utils/merge.js';

import { unitInfoService } from '../../../services/info/unitInfoService.js';
import { CoolDown } from '../../coolDown.js';
import { Duration } from '../../duration.js';

export class AutoUnitsUnitSettings {
  public readonly autoBuild: boolean = false;

  public readonly index: number = 0;

  public readonly targetAmount: number = 0;

  public readonly trainForever: boolean = false;

  public readonly minimumBatch: number = 1;

  constructor(params: PartialFields<AutoUnitsUnitSettings> = {}) {
    mergeDefaults(this, params);
  }
}

export class AutoUnitsBuildingSettings {
  public readonly allow: boolean = true;

  public readonly maxBuildTime: Duration = new Duration({ hours: 1 });

  public units: AutoUnitsUnitSettings[] = [];

  constructor(params: PartialFields<AutoUnitsBuildingSettings> = {}) {
    mergeDefaults(this, params);
  }
}

const unitsMap: Map<BuildingType, AutoUnitsUnitSettings[]> = new Map();

const getUnitsOfType = (buildingType: BuildingType, tribe: Tribe): AutoUnitsUnitSettings[] => {
  let units = unitsMap.get(buildingType);

  if (units) {
    return units;
  }

  units = unitInfoService
    .getAllInfos()
    .filter((i) => i.tribe === tribe && i.buildingType === buildingType)
    .map(({ index }) => new AutoUnitsUnitSettings({ index }));

  unitsMap.set(buildingType, units);

  return units;
};

export class AutoUnitsSettings {
  public readonly allow: boolean = false;

  public readonly useHeroResources: boolean = false;

  public readonly coolDown: CoolDown = new CoolDown({
    max: new Duration({ minutes: 12 }),
    min: new Duration({ minutes: 7 }),
  });

  public readonly minCrop: number = 0;

  public readonly barracks: AutoUnitsBuildingSettings;
  public readonly stable: AutoUnitsBuildingSettings;
  public readonly workshop: AutoUnitsBuildingSettings;
  public readonly residence: AutoUnitsBuildingSettings

  constructor(params: PartialFields<AutoUnitsSettings> = {}, tribe: Tribe) {
    this.barracks = new AutoUnitsBuildingSettings({
      units: getUnitsOfType(BuildingType.Barracks, tribe),
    });

    this.stable = new AutoUnitsBuildingSettings({
      units: getUnitsOfType(BuildingType.Stable, tribe),
    });

    this.workshop = new AutoUnitsBuildingSettings({
      units: getUnitsOfType(BuildingType.Workshop, tribe),
    });

    this.residence = new AutoUnitsBuildingSettings({
      maxBuildTime: new Duration({ hours: 12 }),
      units: getUnitsOfType(BuildingType.Residence, tribe),
    });

    mergeDefaults(this, params);
  }

  public forBuilding = (type: BuildingType): AutoUnitsBuildingSettings => {
    switch (type) {
      case BuildingType.Barracks:
        return this.barracks;

      case BuildingType.Stable:
        return this.stable;

      case BuildingType.Workshop:
        return this.workshop;

      case BuildingType.Palace:
      case BuildingType.Residence:
        return this.residence;

      default:
        throw new Error(
          `Invalid building type requested: ${BuildingType[type] || type}`,
        );
    }
  };
}
