// eslint-disable-next-line max-classes-per-file
import { logException } from '../../../../../_shared/utils/logException';
import { BuildingType } from '../../../_enums/BuildingType';
import { ITaskSettings } from '../../../_types/ITaskSettings';
import { getSeconds } from '../../../utils/getSeconds';
import { CoolDown } from '../../coolDown';

interface IUnitSettings {
  index: number;
  autoBuild: boolean;
  trainForever: boolean;
  targetAmount: number;
}

class UnitSettings implements IUnitSettings {
  index = 0;
  autoBuild = false;
  trainForever = false;
  targetAmount = 0;

  constructor(params: Partial<IUnitSettings> = {}) {
    Object.assign(this, params);
  }
}

interface IBuildingSettings {
  maxBuildTime: number | null;
  units: UnitSettings[];
}

class BuildingSettings implements IBuildingSettings {
  maxBuildTime: number | null = getSeconds({ hours: 1 });
  units: UnitSettings[] = [];

  constructor(params: Partial<IBuildingSettings> = {}) {
    Object.assign(this, params);
  }
}

interface IParams extends ITaskSettings {
  minCrop: number;

  barracks: IBuildingSettings;
  stable: IBuildingSettings;
  workshop: IBuildingSettings;
  residence: IBuildingSettings;
}

export class AutoUnitsSettings implements IParams {
  public allow = true;
  public coolDown: CoolDown = new CoolDown({
    min: getSeconds({ minutes: 10 }),
    max: getSeconds({ minutes: 20 }),
  });

  public minCrop = 0;

  public barracks: BuildingSettings = new BuildingSettings();
  public stable: BuildingSettings = new BuildingSettings();
  public workshop: BuildingSettings = new BuildingSettings();
  public residence: BuildingSettings = new BuildingSettings({ maxBuildTime: null });

  constructor(params: Partial<IParams> = {}) {
    Object.assign(this, params);

    if (this.coolDown instanceof CoolDown) {
      return;
    }

    this.coolDown = new CoolDown(this.coolDown);
  }

  public forBuilding = (type: BuildingType): BuildingSettings => {
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
        throw logException(`Invalid building type: ${type}`);
    }
  };
}
