import { BuildingInProgress } from '../../_models/buildings/inProgress/buildingInProgress';
import { IBuildingInProgress } from '../../_types/graphql';
import { buildingInfos } from '../../index';

export const mapBuildingInProgress = (building: BuildingInProgress): IBuildingInProgress => ({
  ...building,
  name: buildingInfos[building.type].name,
});
