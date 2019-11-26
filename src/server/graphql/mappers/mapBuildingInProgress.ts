import { BuildingInProgress } from '../../_models/buildings/inProgress/buildingInProgress';
import { IBuildingInProgress } from '../../_types/graphql';
import { buildingsService } from '../../services/buildingsService';

export const mapBuildingInProgress = (building: BuildingInProgress): IBuildingInProgress => ({
  ...building,
  name: buildingsService.getBuildingInfo(building.type).name,
  finishedAt: {
    totalSeconds: Math.floor(building.finishedAt.valueOf() / 1000),
  },
});
