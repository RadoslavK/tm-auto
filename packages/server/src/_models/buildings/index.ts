import { BuildingType } from 'shared/enums/BuildingType.js';

import { fieldIds } from '../../constants/fieldIds.js';
import { getMaximum } from '../../utils/getWithMaximum.js';
import type { ActualBuilding } from './actual/actualBuilding.js';
import type { BuildingInProgress } from './inProgress/buildingInProgress.js';
import { BuildingsInProgress } from './inProgress/buildingsInProgress.js';
import { BuildingQueue } from './queue/buildingQueue.js';
import type { BuildingSpot } from './spots/buildingSpot.js';
import { BuildingSpots } from './spots/buildingSpots.js';

export class Buildings {
  public readonly ongoing: BuildingsInProgress = new BuildingsInProgress();

  public readonly spots: BuildingSpots = new BuildingSpots();

  public readonly queue: BuildingQueue = new BuildingQueue();

  constructor(
    private onBuildingSpotUpdated: (buildingSpot: BuildingSpot) => void,
    private onOngoingUpdated: () => void,
    private onQueuedUpdated: () => void,
    private onCrannyCapacityUpdate: () => void,
  ) {}

  public updateActual = (buildings: readonly ActualBuilding[]): void => {
    let updatedAny = false;

    buildings.forEach((b) => {
      let updated = false;

      const spot = this.spots.at(b.fieldId);

      if (spot.level.actual !== b.level) {
        spot.level.actual = b.level;
        updated = true;
        updatedAny = true;
      }

      if (b.type !== BuildingType.None || spot.level.getTotal() === 0) {
        spot.type = b.type;
        updated = true;
        updatedAny = true;
      }

      if (updated) {
        this.onBuildingSpotUpdated(spot);
      }
    });

    if (updatedAny) {
      this.onCrannyCapacityUpdate();
    }
  };

  public updateOngoing = (
    buildingsInProgress: readonly BuildingInProgress[],
  ): void => {
    let updatedAny = false;

    this.spots.buildings().forEach((spot) => {
      let updated = false;

      const ongoingForSpot = buildingsInProgress.filter((bip) => bip.fieldId === spot.fieldId);
      const ongoingLevel = getMaximum(ongoingForSpot.map((bip) => bip.level));

      if (spot.level.ongoing !== ongoingLevel) {
        spot.level.ongoing = ongoingLevel;
        updated = true;
        updatedAny = true;
      }

      if (spot.type === BuildingType.None && ongoingLevel) {
        spot.type = ongoingForSpot[0].type;
        updated = true;
        updatedAny = true;
      }

      if (updated) {
        this.onBuildingSpotUpdated(spot);
      }
    });

    this.ongoing.set(buildingsInProgress);
    this.onOngoingUpdated();

    if (updatedAny) {
      this.onCrannyCapacityUpdate();
    }
  };

  public updateSpotsQueuedState = (): void => {
    let updatedAny = false;
    const queuedBuildings = this.queue.buildings();

    this.spots.buildings().forEach((spot) => {
      let updated = false;
      const queuedForSpot = queuedBuildings.filter((b) => b.fieldId === spot.fieldId);
      const queuedLevel = getMaximum(queuedForSpot.map((b) => b.level));

      if (spot.level.queued !== queuedLevel) {
        spot.level.queued = queuedLevel;
        updated = true;
        updatedAny = true;
      }

      if (spot.type === BuildingType.None && spot.level.queued) {
        spot.type = queuedForSpot[0].type;
        updated = true;
        updatedAny = true;
      } else if (
        spot.type > BuildingType.Crop &&
        spot.fieldId !== fieldIds.RallyPoint &&
        spot.fieldId !== fieldIds.Wall &&
        spot.level.getTotal() === 0
      ) {
        spot.type = BuildingType.None;
        updated = true;
        updatedAny = true;
      }

      if (updated) {
        this.onBuildingSpotUpdated(spot);
      }
    });

    this.onQueuedUpdated();

    if (updatedAny) {
      this.onCrannyCapacityUpdate();
    }
  };

  public freeFieldIds = (): readonly number[] =>
    this.spots
      .buildings()
      .filter((b) => b.level.getTotal() === 0)
      .map((b) => b.fieldId);
}
