import { BuildingType } from '../../_enums/BuildingType';
import { IAvailableNewBuilding } from '../../_types/graphql';
import { buildingsService } from '../../services/buildingsService';

export const mapAvailableNewBuilding = (type: BuildingType): IAvailableNewBuilding => ({
  type,
  name: buildingsService.getBuildingInfo(type).name,
});
