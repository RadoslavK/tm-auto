// eslint-disable-next-line max-classes-per-file
import { BuildingType } from '../../../_enums/BuildingType';
import { ITaskSettingsParams } from '../../../_types/ITaskSettingsParams';
import { CoolDown } from '../../coolDown';
import {
  Duration,
  IDurationParams,
} from '../../duration';
import { merge } from '../../../../_shared/merge';
import { Fields } from '../../../../_shared/types';
import { mapRecord } from '../../../../_shared/objectUtils';

export interface IAutoUnitsUnitSettingsParams {
  readonly index: number;
  readonly autoBuild: boolean;
  readonly trainForever: boolean;
  readonly targetAmount: number;
}

const defaultUnitSettings: Fields<AutoUnitsUnitSettings> = {
  index: 0,
  autoBuild: false,
  trainForever: false,
  targetAmount: 0,
};

export class AutoUnitsUnitSettings implements IAutoUnitsUnitSettingsParams {
  index: number;
  autoBuild: boolean;
  trainForever: boolean;
  targetAmount: number;

  constructor(params: Partial<IAutoUnitsUnitSettingsParams> = {}) {
    Object.assign(this, merge(defaultUnitSettings, params));
  }
}

export interface IAutoUnitsBuildingSettingsParams {
  readonly allow: boolean;
  readonly maxBuildTime: IDurationParams;
}

const defaults: Fields<AutoUnitsBuildingSettings> = {
  allow: true,
  maxBuildTime: new Duration({ hours: 1 }),
};

export class AutoUnitsBuildingSettings implements IAutoUnitsBuildingSettingsParams {
  allow: boolean;
  maxBuildTime: Duration;

  constructor(params: Partial<IAutoUnitsBuildingSettingsParams> = {}) {
    Object.assign(this, merge(defaults, {
      ...params,
      maxBuildTime: params.maxBuildTime && new Duration(params.maxBuildTime),
    }));
  }
}

export interface IAutoUnitsSettingsParams extends ITaskSettingsParams {
  readonly minCrop: number;
  readonly units: IAutoUnitsUnitSettingsParams[];
  readonly buildings: Record<BuildingType, IAutoUnitsBuildingSettingsParams>;
}

const defaultSettings: Fields<AutoUnitsSettings> = {
  allow: false,
  coolDown: new CoolDown({
    min: new Duration({ minutes: 10 }),
    max: new Duration({ minutes: 20 }),
  }),
  minCrop: 0,
  units: [...new Array(10).keys()].map(index => new AutoUnitsUnitSettings({ index: index + 1 })),
  buildings: {
    [BuildingType.Barracks]: new AutoUnitsBuildingSettings(),
    [BuildingType.Stable]: new AutoUnitsBuildingSettings(),
    [BuildingType.Workshop]: new AutoUnitsBuildingSettings(),
    [BuildingType.Residence]: new AutoUnitsBuildingSettings({ maxBuildTime: new Duration({ hours: 12 }) }),
  } as Record<BuildingType, AutoUnitsBuildingSettings>,
};

export class AutoUnitsSettings implements IAutoUnitsSettingsParams {
  public allow: boolean;
  public coolDown: CoolDown;

  public minCrop: number;

  public buildings: Record<BuildingType, AutoUnitsBuildingSettings> = {} as Record<BuildingType, AutoUnitsBuildingSettings>;

  public units: AutoUnitsUnitSettings[];

  constructor(params: Partial<IAutoUnitsSettingsParams> = {}) {
    Object.assign(this, merge(defaultSettings, {
      ...params,
      coolDown: params.coolDown && new CoolDown(params.coolDown),
      buildings: params.buildings && mapRecord(params.buildings, b => new AutoUnitsBuildingSettings(b)),
    }));
  }

  public forBuilding = (type: BuildingType): AutoUnitsBuildingSettings => {
    const buildingSettings = Object
      .entries(this.buildings)
      .find(([bType]) => (bType as any as BuildingType) === type);

    if (!buildingSettings) {
      throw new Error(`Invalid building type requested: ${BuildingType[type]}`);
    }

    return buildingSettings[1];
  };
}
