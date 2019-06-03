import { BuildingType } from '../../_enums/BuildingType';

export const buildingNames: Record<BuildingType, string> = Object.freeze({
  [BuildingType.None]: 'Building site',
  [BuildingType.Wood]: 'Woodcutter',
  [BuildingType.Clay]: 'Clay Pit',
  [BuildingType.Iron]: 'Iron Mine',
  [BuildingType.Crop]: 'Cropland',
});
