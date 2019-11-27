import { BuildingType } from './buildingType';

export enum BuildingSpotType {
  Any = 'Any',
  Fields = 'Fields',
  Infrastructure = 'Infrastructure',
}

export const getBuildingSpotType = (buildingType: BuildingType): BuildingSpotType =>
  buildingType >= BuildingType.Wood && buildingType <= BuildingType.Crop
    ? BuildingSpotType.Fields
    : BuildingSpotType.Infrastructure;
