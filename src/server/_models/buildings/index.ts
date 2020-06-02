import { BuildingType } from '../../../_shared/types/buildingType';
import { fieldIds } from '../../constants/fieldIds';
import { ActualBuilding } from './actual/actualBuilding';
import { BuildingInProgress } from './inProgress/buildingInProgress';
import { BuildingsInProgress } from './inProgress/buildingsInProgress';
import { BuildingQueue } from './queue/buildingQueue';
import { BuildingSpots } from './spots/buildingSpots';

export class Buildings {
  public readonly ongoing: BuildingsInProgress = new BuildingsInProgress();
  public readonly spots: BuildingSpots = new BuildingSpots();
  public readonly queue: BuildingQueue = new BuildingQueue();

  constructor(
    private onActualUpdated: () => void,
    private onOngoingUpdated: () => void,
    private onQueuedUpdated: () => void,
  ) {}

  public updateActual = (buildings: readonly ActualBuilding[]): void => {
    buildings.forEach(b => {
      const spot = this.spots.at(b.fieldId);
      spot.level.actual = b.level;

      if (b.type !== BuildingType.None || spot.level.getTotal() === 0) {
        spot.type = b.type;
      }
    });

    this.onActualUpdated();
  };

  public updateOngoing = (buildingsInProgress: readonly BuildingInProgress[]): void => {
    this.spots
      .buildings()
      .forEach(spot => {
        const ongoingForSpot = buildingsInProgress.filter(bip => bip.fieldId === spot.fieldId);
        const ongoingLevel = ongoingForSpot.length;

        spot.level.ongoing = ongoingLevel;

        if (spot.type === BuildingType.None && ongoingLevel) {
          spot.type = ongoingForSpot[0].type;
        }
      });

    this.ongoing.set(buildingsInProgress);
    this.onOngoingUpdated();
  };

  public updateSpotsQueuedState = (): void => {
    const queuedBuildings = this.queue.buildings();

    this
      .spots
      .buildings()
      .forEach(spot => {
        const queuedForSpot = queuedBuildings.filter(b => b.fieldId === spot.fieldId);
        const queuedLevel = queuedForSpot.length;

        spot.level.queued = queuedLevel;

        if (spot.type === BuildingType.None && queuedLevel) {
          spot.type = queuedForSpot[0].type;
        } else if (
          spot.type > BuildingType.Crop
          && spot.fieldId !== fieldIds.RallyPoint
          && spot.fieldId !== fieldIds.Wall
          && spot.level.getTotal() === 0
        ) {
          spot.type = BuildingType.None;
        }
      });

    this.onQueuedUpdated();
  };

  public freeFieldIds = (): readonly number[] => this
    .spots
    .buildings()
    .filter(b => b.level.getTotal() === 0)
    .map(b => b.fieldId);
}
