import { BuildingType } from '../_enums/BuildingType';

const roundToNearest10 = (seconds: number): number => {
  return 10 * Math.round(seconds / 10);
};

export const getActualBuildingBuildTime = (originalBuildTime: number, gameSpeed: number, mainBuildingLevel: number, buildingType: BuildingType): number => {
  const isMainBuilding = buildingType === BuildingType.MainBuilding;
  let totalSeconds = originalBuildTime;

  totalSeconds /= gameSpeed;

  if (!isMainBuilding) {
    // MB has already corrected values
    totalSeconds *= mainBuildingLevel > 0 ? Math.pow(0.964, mainBuildingLevel - 1) : 5;
  }

  totalSeconds = roundToNearest10(totalSeconds);
  return totalSeconds;
};
