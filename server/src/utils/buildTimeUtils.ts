import { BuildingType } from '../_enums/BuildingType';
import { unitInfos } from '../index';

const roundToNearest10 = (seconds: number): number => {
  return 10 * Math.round(seconds / 10);
};

const unitsModifier = {
  1: 1,
  2: 0.9,
  3: 0.81,
  4: 0.729,
  5: 0.6561,
  6: 0.5905,
  7: 0.5314,
  8: 0.4783,
  9: 0.4305,
  10: 0.3874,
  11: 0.3487,
  12: 0.3138,
  13: 0.2824,
  14: 0.2542,
  15: 0.2288,
  16: 0.2059,
  17: 0.1853,
  18: 0.1668,
  19: 0.1501,
  20: 0.1351,
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

export const getActualUnitBuildTime = (unitIndex: number, gameSpeed: number, buildingLevel: number): number => {
  const originalBuildTime = unitInfos[unitIndex].cost.buildTime;
  const modifier = unitsModifier[buildingLevel];
  const buildTime = originalBuildTime / gameSpeed * modifier
  return Math.round(buildTime);
};
