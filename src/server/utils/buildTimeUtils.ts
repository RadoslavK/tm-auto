import { BuildingType } from '../_enums/buildingType';
import { Duration } from '../_models/duration';

const roundToNearest10 = (seconds: number): number => {
  return 10 * Math.round(seconds / 10);
};

const getUnitsModifier = (buildingLevel: number): number => {
  switch (buildingLevel) {
    case 1:
      return 1;
    case 2:
      return 0.9;
    case 3:
      return 0.81;
    case 4:
      return 0.729;
    case 5:
      return 0.6561;
    case 6:
      return 0.5905;
    case 7:
      return 0.5314;
    case 8:
      return 0.4783;
    case 9:
      return 0.4305;
    case 10:
      return 0.3874;
    case 11:
      return 0.3487;
    case 12:
      return 0.3138;
    case 13:
      return 0.2824;
    case 14:
      return 0.2542;
    case 15:
      return 0.2288;
    case 16:
      return 0.2059;
    case 17:
      return 0.1853;
    case 18:
      return 0.1668;
    case 19:
      return 0.1501;
    case 20:
      return 0.1351;
    default:
      throw new Error(`Invalid unit building level ${buildingLevel}`);
  }
};

export const getActualBuildingBuildTime = (originalBuildTime: Duration, gameSpeed: number, mainBuildingLevel: number, buildingType: BuildingType): Duration => {
  const isMainBuilding = buildingType === BuildingType.MainBuilding;
  let totalSeconds = originalBuildTime.totalSeconds();

  totalSeconds /= gameSpeed;

  if (!isMainBuilding) {
    // MB has already corrected values
    totalSeconds *= mainBuildingLevel > 0 ? 0.964 ** (mainBuildingLevel - 1) : 5;
  }

  totalSeconds = roundToNearest10(totalSeconds);
  return Duration.fromSeconds(totalSeconds);
};

export const getActualUnitBuildTime = (originalBuildTime: Duration, gameSpeed: number, buildingLevel: number): Duration => {
  //  TODO do unit infos ulozit duration ale v subore radsej nechat total seconds
  const modifier = getUnitsModifier(buildingLevel);
  const buildTime = originalBuildTime.totalSeconds() / gameSpeed * modifier;
  const actualBuildTimeInSeconds = Math.round(buildTime);

  return Duration.fromSeconds(actualBuildTimeInSeconds);
};
