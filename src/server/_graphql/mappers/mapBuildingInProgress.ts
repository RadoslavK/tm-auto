import { BuildingInProgress as BuildingInProgressModel } from '../../_models/buildings/inProgress/buildingInProgress';
import { BuildingInProgress } from '../../_types/graphql';
import { buildingInfoService } from '../../services/info/buildingInfoService';

export const mapBuildingInProgress = (building: BuildingInProgressModel): BuildingInProgress => ({
  ...building,
  finishedAt: {
    totalSeconds: Math.floor(building.finishedAt.valueOf() / 1000),
  },
  name: buildingInfoService.getBuildingInfo(building.type).name,
});
