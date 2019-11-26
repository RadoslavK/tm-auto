import { BuildingInProgress } from '../../_models/buildings/inProgress/buildingInProgress';
import { IBuildingInProgress } from '../../_types/graphql';
import { buildingInfos } from '../../bootstrap/loadInfo';
import { buildingsService } from '../../services/buildingsService';

export const mapBuildingInProgress = (building: BuildingInProgress): IBuildingInProgress => ({
  ...building,
  name: buildingsService.getBuildingInfo(building.type).name,
});
