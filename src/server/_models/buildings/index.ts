import { IBuildingSpot } from '../../_types/graphql';
import { BuildingType } from '../../../_shared/types/buildingType';
import { buildingInfoService } from '../../services/info/buildingInfoService';
import { BuildingInProgress } from './inProgress/buildingInProgress';
import { BuildingsInProgress } from './inProgress/buildingsInProgress';
import { BuildingQueue } from './queue/buildingQueue';
import { BuildingSpots } from './spots/buildingSpots';

export interface IActualBuilding {
  readonly fieldId: number;
  readonly level: number;
  readonly type: BuildingType;
}

export class Buildings {
  public readonly ongoing: BuildingsInProgress = new BuildingsInProgress();
  public readonly spots: BuildingSpots = new BuildingSpots();
  public readonly queue: BuildingQueue = new BuildingQueue();

  public updateActual = (buildings: readonly IActualBuilding[]): void => {
    buildings.forEach(b => {
      const spot = this.spots.at(b.fieldId);
      spot.level.actual = b.level;
      spot.type = b.type;
    });
  };

  public updateOngoing = (buildingsInProgress: readonly BuildingInProgress[]): void => {
    this.spots
      .buildings()
      .forEach(spot => {
        spot.level.ongoing = buildingsInProgress.filter(bip => bip.fieldId === spot.fieldId).length;
      });

    this.ongoing.set(buildingsInProgress);
  };

  public normalizedBuildingSpots = (): readonly IBuildingSpot[] => this.spots.buildings().map((b): IBuildingSpot => {
    const queued = this.queue.buildings().filter(bb => bb.fieldId === b.fieldId);
    const ongoing = this.ongoing.buildings().filter(bb => bb.fieldId === b.fieldId);
    // eslint-disable-next-line unicorn/no-nested-ternary
    const type = b.type || (ongoing.length ? ongoing[0].type : (queued.length ? queued[0].type : BuildingType.None));
    const info = buildingInfoService.getBuildingInfo(type);

    return {
      fieldId: b.fieldId,
      level: {
        ...b.level,
        max: info.maxLevel,
        total: b.level.total(),
      },
      name: info.name,
      type,
    };
  });

  public freeFieldIds = (): readonly number[] => this
    .normalizedBuildingSpots()
    .filter(b => b.level.total === 0)
    .map(b => b.fieldId);
}
