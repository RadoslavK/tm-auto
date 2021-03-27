import { BuildingType } from 'shared/enums/BuildingType.js';
import { mergeDefaults } from 'shared/utils/merge.js';
import type { PartialFields } from 'shared/types/fields.type.js';
import { getAccountContext } from '../../../accountContext.js';
import { unitInfoService } from '../../../services/info/unitInfoService.js';
import { CoolDown } from '../../coolDown.js';
import { Duration } from '../../duration.js';

export class AutoUnitsUnitSettings {
  public readonly autoBuild: boolean = false;

  public readonly index: number = 0;

  public readonly targetAmount: number = 0;

  public readonly trainForever: boolean = false;

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

const getUnitsOfType = (
  buildingType: BuildingType,
): AutoUnitsUnitSettings[] => {
  let units = unitsMap.get(buildingType);

  if (units) {
    return units;
  }

  const { tribe } = getAccountContext().gameInfo;

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

  public readonly barracks: AutoUnitsBuildingSettings = new AutoUnitsBuildingSettings(
    {
      units: getUnitsOfType(BuildingType.Barracks),
    },
  );

  public readonly coolDown: CoolDown = new CoolDown({
    max: new Duration({ minutes: 12 }),
    min: new Duration({ minutes: 7 }),
  });

  public readonly minCrop: number = 0;

  public readonly residence: AutoUnitsBuildingSettings = new AutoUnitsBuildingSettings(
    {
      maxBuildTime: new Duration({ hours: 12 }),
      units: getUnitsOfType(BuildingType.Residence),
    },
  );

  public readonly stable: AutoUnitsBuildingSettings = new AutoUnitsBuildingSettings(
    {
      units: getUnitsOfType(BuildingType.Stable),
    },
  );

  public readonly workshop: AutoUnitsBuildingSettings = new AutoUnitsBuildingSettings(
    {
      units: getUnitsOfType(BuildingType.Workshop),
    },
  );

  constructor(params: PartialFields<AutoUnitsSettings> = {}) {
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