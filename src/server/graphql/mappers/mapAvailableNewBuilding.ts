import { BuildingType } from '../../_enums/BuildingType';
import { IAvailableNewBuilding } from '../../_types/graphql';
import { buildingInfos } from '../../bootstrap/loadInfo';

export const mapAvailableNewBuilding = (type: BuildingType): IAvailableNewBuilding => ({
  type,
  name: buildingInfos[type].name,
});
