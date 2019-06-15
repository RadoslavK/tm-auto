import { BuildingType } from '../../_enums/BuildingType';
import { IBuildingSpot } from '../../_types/graphql';
import { buildingNames } from '../../constants/buildingNames';
import { buildingInfos } from '../../index';
import { BuildingInProgress } from './inProgress/buildingInProgress';
import { BuildingsInProgress } from './inProgress/buildingsInProgress';
import { BuildingQueue } from './queue/buildingQueue';
import { BuildingSpot } from './spots/buildingSpot';
import { BuildingSpots } from './spots/BuildingSpots';

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

  public normalizedBuildingSpots = (): readonly IBuildingSpot[] => {
    return this.spots.buildings().map((b): IBuildingSpot => {
      const queued = this.queue.buildings().filter(bb => bb.fieldId === b.fieldId);
      const ongoing = this.ongoing.buildings().filter(bb => bb.fieldId === b.fieldId);
      const type = b.type || (ongoing.length ? ongoing[0].type : (queued.length ? queued[0].type : BuildingType.None));

      return {
        type,
        fieldId: b.fieldId,
        level: {
          ...b.level,
          total: b.level.total(),
          max: buildingInfos[type].length,
        },
        name: buildingNames[type],
      };
    });
  };
}
