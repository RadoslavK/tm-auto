// eslint-disable-next-line max-classes-per-file
import { BuildingType } from '../../../_enums/BuildingType';
import { CoolDown } from '../../coolDown';
import { Duration } from '../../duration';
import { merge } from '../../../../_shared/merge';
import { Fields } from '../../../../_shared/types';
import {
  IAutoUnitsBuildingSettings,
  IAutoUnitsSettings,
  IAutoUnitsUnitSettings,
} from '../../../_types/graphql';
import { accountContext } from '../../../accountContext';
import { unitInfos } from '../../../bootstrap/loadInfo';

const defaultUnitSettings: Fields<AutoUnitsUnitSettings> = {
  index: 0,
  autoBuild: false,
  trainForever: false,
  targetAmount: 0,
};

export class AutoUnitsUnitSettings implements IAutoUnitsUnitSettings {
  index: number;
  autoBuild: boolean;
  trainForever: boolean;
  targetAmount: number;

  constructor(params: Partial<IAutoUnitsUnitSettings> = {}) {
    Object.assign(this, merge(defaultUnitSettings, params));
  }
}

const defaults: Fields<AutoUnitsBuildingSettings> = {
  allow: true,
  maxBuildTime: new Duration({ hours: 1 }),
  units: [],
};

export class AutoUnitsBuildingSettings implements IAutoUnitsBuildingSettings {
  allow: boolean;
  maxBuildTime: Duration;
  units: AutoUnitsUnitSettings[];

  constructor(params: Partial<IAutoUnitsBuildingSettings> = {}) {
    Object.assign(this, merge(defaults, {
      ...params,
      maxBuildTime: params.maxBuildTime && new Duration(params.maxBuildTime),
      units: params.units && params.units.map(u => new AutoUnitsUnitSettings(u)),
    }));
  }
}

const unitsMap: Map<BuildingType, IAutoUnitsUnitSettings[]> = new Map();

const getUnitsOfType = (buildingType: BuildingType): IAutoUnitsUnitSettings[] => {
  let units = unitsMap.get(buildingType);

  if (units) {
    return units;
  }

  const { tribe } = accountContext.gameInfo;

  units = [...unitInfos.keys()]
    .reduce((reduced, k): IAutoUnitsUnitSettings[] => {
      const info = unitInfos.get(k);

      if (!info || info.tribe !== tribe || info.buildingType !== buildingType) {
        return reduced;
      }

      const s: IAutoUnitsUnitSettings = new AutoUnitsUnitSettings({
        index: k,
      });

      return [...reduced, s];
    }, [] as IAutoUnitsUnitSettings[]);

  unitsMap.set(buildingType, units);

  return units;
};

const defaultSettings = (): Fields<AutoUnitsSettings> => ({
  allow: false,
  coolDown: new CoolDown({
    min: new Duration({ minutes: 7 }),
    max: new Duration({ minutes: 12 }),
  }),
  minCrop: 0,
  barracks: new AutoUnitsBuildingSettings({
    units: getUnitsOfType(BuildingType.Barracks),
  }),
  stable: new AutoUnitsBuildingSettings({
    units: getUnitsOfType(BuildingType.Stable),
  }),
  workshop: new AutoUnitsBuildingSettings({
    units: getUnitsOfType(BuildingType.Workshop),
  }),
  residence: new AutoUnitsBuildingSettings({
    maxBuildTime: new Duration({ hours: 12 }),
    units: getUnitsOfType(BuildingType.Residence),
  }),
});

export class AutoUnitsSettings implements IAutoUnitsSettings {
  public allow: boolean;
  public coolDown: CoolDown;

  public minCrop: number;

  public barracks: AutoUnitsBuildingSettings;
  public stable: AutoUnitsBuildingSettings;
  public workshop: AutoUnitsBuildingSettings;
  public residence: AutoUnitsBuildingSettings;

  constructor(params: Partial<IAutoUnitsSettings> = {}) {
    Object.assign(this, merge(defaultSettings(), {
      ...params,
      coolDown: params.coolDown && new CoolDown(params.coolDown),
      barracks: params.barracks && new AutoUnitsBuildingSettings(params.barracks),
      stable: params.stable && new AutoUnitsBuildingSettings(params.stable),
      workshop: params.workshop && new AutoUnitsBuildingSettings(params.workshop),
      residence: params.residence && new AutoUnitsBuildingSettings(params.residence),
    }));
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
        throw new Error(`Invalid building type requested: ${BuildingType[type]}`);
    }
  };
}
