import { BuildingLevel, IBuildingLevel } from './buildingLevel';
import { BuildingType } from '../../enums/BuildingType';
import { IParsedBuilding } from '../../parsers/parseResourceFields';
import { IComparable } from '../../../../../_shared/types/IComparable';

interface IParams {
  readonly level: IBuildingLevel;
  readonly type: BuildingType;
}

export interface IBuilding extends
  IParams {
}

export class Building implements IBuilding {
  readonly level: IBuildingLevel = new BuildingLevel();
  readonly type: BuildingType = BuildingType.None;

  constructor(params: Partial<IBuilding> = {}) {
    Object.assign(this, params);
  }

  static fromParsed = (building: IParsedBuilding): IBuilding => ({
    level: new BuildingLevel({ actual: building.level }),
    type: building.type,
  });
}
