import {
  BuildingSpotType,
  getBuildingSpotType,
} from '../../../_enums/buildingSpotType';
import { getWithMinimumSafe } from '../../../utils/getWithMaximum';
import { BuildingInProgress } from './buildingInProgress';

export class BuildingsInProgress {
  private m_buildings: readonly BuildingInProgress[] = [];

  public buildings = (): readonly BuildingInProgress[] => this.m_buildings;

  public set = (buildings: readonly BuildingInProgress[]): void => {
    this.m_buildings = buildings;
  };

  public isSpotFree = (type: BuildingSpotType): boolean =>
    type === BuildingSpotType.Any
      ? !this.m_buildings.length
      : !this.m_buildings.some(x => getBuildingSpotType(x.type) === type);

  public getTimeOfBuildingCompletion = (type: BuildingSpotType): Date | undefined => {
    const filteredSequence = type === BuildingSpotType.Any
      ? this.m_buildings.slice()
      : this.m_buildings.filter(x => getBuildingSpotType(x.type) === type);

    if (!filteredSequence.length) {
      return undefined;
    }

    const building = getWithMinimumSafe(filteredSequence, b => b.finishedAt.valueOf());
    return building.finishedAt;
  };
}
