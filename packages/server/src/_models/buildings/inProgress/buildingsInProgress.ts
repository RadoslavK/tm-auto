import {
  BuildingSpotType,
  getBuildingSpotType,
} from '../../../_enums/buildingSpotType.js';
import { getWithMinimumSafe } from '../../../utils/getWithMaximum.js';
import type { BuildingInProgress } from './buildingInProgress.js';

export class BuildingsInProgress {
  private _buildings: readonly BuildingInProgress[] = [];

  public buildings = (): readonly BuildingInProgress[] => this._buildings;

  public set = (buildings: readonly BuildingInProgress[]): void => {
    this._buildings = buildings;
  };

  public isSpotFree = (type: BuildingSpotType): boolean =>
    type === BuildingSpotType.Any
      ? !this._buildings.length
      : !this._buildings.some((x) => getBuildingSpotType(x.type) === type);

  public getTimeOfBuildingCompletion = (
    type: BuildingSpotType,
  ): Date | undefined => {
    const filteredSequence =
      type === BuildingSpotType.Any
        ? this._buildings.slice()
        : this._buildings.filter((x) => getBuildingSpotType(x.type) === type);

    if (!filteredSequence.length) {
      return;
    }

    const building = getWithMinimumSafe(filteredSequence, (b) =>
      b.finishedAt.valueOf(),
    );
    return building.finishedAt;
  };
}
