import { BuildingInProgress } from '../../_models/buildings/inProgress/buildingInProgress';
import { IBuildingInProgress } from '../../_types/graphql';
import { buildingNames } from '../../constants/buildingNames';

export const mapBuildingInProgress = (building: BuildingInProgress): IBuildingInProgress => ({
  ...building,
  name: buildingNames[building.type],
});
