import { BuildingType } from '../../enums/BuildingType';
import { IBuildingLevel } from './IBuildingLevel';

export interface IBuilding {
  readonly level: IBuildingLevel;
  readonly type: BuildingType;
}
