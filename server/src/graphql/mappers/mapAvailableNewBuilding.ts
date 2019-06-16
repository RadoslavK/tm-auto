import { BuildingType } from '../../_enums/BuildingType';
import { IAvailableNewBuilding } from '../../_types/graphql';
import { buildingInfos } from '../../index';

export const mapAvailableNewBuilding = (type: BuildingType): IAvailableNewBuilding => ({
  type,
  name: buildingInfos[type].name,
});
