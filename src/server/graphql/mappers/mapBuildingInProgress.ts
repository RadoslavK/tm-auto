import { BuildingInProgress } from '../../_models/buildings/inProgress/buildingInProgress';
import { IBuildingInProgress } from '../../_types/graphql';
import { buildingInfoService } from '../../services/info/buildingInfoService';

export const mapBuildingInProgress = (building: BuildingInProgress): IBuildingInProgress => ({
  ...building,
  name: buildingInfoService.getBuildingInfo(building.type).name,
  finishedAt: {
    totalSeconds: Math.floor(building.finishedAt.valueOf() / 1000),
  },
});
