import { BuildingType } from '../../_enums/BuildingType';
import { IAvailableNewBuilding } from '../../_types/graphql';
import { buildingNames } from '../../constants/buildingNames';

export const mapAvailableNewBuilding = (type: BuildingType): IAvailableNewBuilding => ({
  type,
  name: buildingNames[type],
});
