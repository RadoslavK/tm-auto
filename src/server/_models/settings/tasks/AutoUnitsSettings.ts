// eslint-disable-next-line max-classes-per-file
import { BuildingType } from '../../../_enums/BuildingType';
import { ITaskSettings } from '../../../_types/ITaskSettings';
import { getSeconds } from '../../../utils/getSeconds';
import { CoolDown } from '../../coolDown';

interface IAutoUnitsUnitSettings {
  index: number;
  autoBuild: boolean;
  trainForever: boolean;
  targetAmount: number;
}

export class AutoUnitsUnitSettings implements IAutoUnitsUnitSettings {
  index = 0;
  autoBuild = false;
  trainForever = false;
  targetAmount = 0;

  constructor(params: Partial<IAutoUnitsUnitSettings> = {}) {
    Object.assign(this, params);
  }
}

interface IAutoUnitsBuildingSettings {
  allow: boolean;
  maxBuildTime: number;
}

export class AutoUnitsBuildingSettings implements IAutoUnitsBuildingSettings {
  allow = true;
  maxBuildTime: number = getSeconds({ hours: 1 });

  constructor(params: Partial<IAutoUnitsBuildingSettings> = {}) {
    Object.assign(this, params);
  }
}

interface IParams extends ITaskSettings {
  minCrop: number;
  units: AutoUnitsUnitSettings[];
  buildings: Record<BuildingType, AutoUnitsBuildingSettings>;
}

export class AutoUnitsSettings implements IParams {
  public allow: boolean;
  public coolDown: CoolDown;

  public minCrop: number;

  public buildings: Record<BuildingType, AutoUnitsBuildingSettings> = {} as Record<BuildingType, AutoUnitsBuildingSettings>;

  public units: AutoUnitsUnitSettings[];

  constructor(params: Partial<IParams> = {}) {
    this.buildings[BuildingType.Barracks] = new AutoUnitsBuildingSettings(params.buildings && params.buildings[BuildingType.Barracks]);
    this.buildings[BuildingType.Stable] = new AutoUnitsBuildingSettings(params.buildings && params.buildings[BuildingType.Stable]);
    this.buildings[BuildingType.Workshop] = new AutoUnitsBuildingSettings(params.buildings && params.buildings[BuildingType.Workshop]);
    this.buildings[BuildingType.Residence] = new AutoUnitsBuildingSettings(params.buildings && params.buildings[BuildingType.Residence] || { maxBuildTime: getSeconds({ hours: 12 }) });

    this.units = params.units
      ? params.units.map(unitSettings => new AutoUnitsUnitSettings(unitSettings))
      : [...new Array(10).keys()].map(index => new AutoUnitsUnitSettings({ index: index + 1 }));

    this.allow = params.allow || false;
    this.minCrop = params.minCrop || 0;

    this.coolDown = params.coolDown
      ? new CoolDown(this.coolDown)
      : new CoolDown({
        min: getSeconds({ minutes: 10 }),
        max: getSeconds({ minutes: 20 }),
      });
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
