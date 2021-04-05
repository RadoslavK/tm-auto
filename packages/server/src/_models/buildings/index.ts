import { BuildingType } from 'shared/enums/BuildingType.js';

import { fieldIds } from '../../constants/fieldIds.js';
import { getMaximum } from '../../utils/getWithMaximum.js';
import type { ActualBuilding } from './actual/actualBuilding.js';
import type { BuildingInProgress } from './inProgress/buildingInProgress.js';
import { BuildingsInProgress } from './inProgress/buildingsInProgress.js';
import { BuildingQueue } from './queue/buildingQueue.js';
import type { BuildingSpot } from './spots/buildingSpot.js';
import { BuildingSpots } from './spots/buildingSpots.js';

type UpdateParams = {
  readonly actual?: readonly ActualBuilding[];
  readonly ongoing: readonly BuildingInProgress[];
  readonly triggerMainBuildingsUpdatedEvent?: boolean;
};

type Events = {
  readonly onBuildingSpotUpdated: (buildingSpot: BuildingSpot) => void;
  readonly onCrannyCapacityUpdate: () => void;
  readonly onMainBuildingLevelsChanged: () => void;
  readonly onOngoingUpdated: () => void;
};

export class Buildings {
  public readonly ongoing: BuildingsInProgress = new BuildingsInProgress();

  public readonly spots: BuildingSpots = new BuildingSpots();

  public readonly queue: BuildingQueue = new BuildingQueue();

  constructor(
    private events: Events,
  ) {}

  public update = ({
    actual,
    ongoing,
    triggerMainBuildingsUpdatedEvent,
  }: UpdateParams): void => {
    let updatedAny = false;
    let mbLevelChanged = false;

    this.spots.buildings().forEach((spot) => {
      let updated = false;
      let ogMbLevel = spot.type === BuildingType.MainBuilding
        ? spot.level.getActualAndOngoing()
        : null;

      const setUpdated = () => {
        updated = true;
        updatedAny = true;
      };

      const actualForSpot = actual?.find(a => a.fieldId === spot.fieldId);
      const ongoingForSpot = ongoing.filter((bip) => bip.fieldId === spot.fieldId);
      const ongoingLevel = getMaximum(ongoingForSpot.map((bip) => bip.level));

      if (actualForSpot) {
        if (spot.level.actual !== actualForSpot.level) {
          spot.level.actual = actualForSpot.level;
          setUpdated();
        }

        if (actualForSpot.type !== BuildingType.None || spot.level.getTotal() === 0) {
          spot.type = actualForSpot.type;
          setUpdated();
        }
      }

      if (spot.level.ongoing !== ongoingLevel) {
        spot.level.ongoing = ongoingLevel;
        setUpdated();
      }

      if (spot.type === BuildingType.None && ongoingLevel) {
        spot.type = ongoingForSpot[0].type;
        setUpdated();
      }

      if (ogMbLevel !== null) {
        const newMbLevel = spot.level.getActualAndOngoing();

        if (ogMbLevel !== newMbLevel) {
          mbLevelChanged = true;
        }
      }

      if (updated) {
        this.events.onBuildingSpotUpdated(spot);
      }
    });

    this.ongoing.set(ongoing);
    this.events.onOngoingUpdated();

    if (updatedAny) {
      this.events.onCrannyCapacityUpdate();
    }

    if (triggerMainBuildingsUpdatedEvent && mbLevelChanged) {
      this.events.onMainBuildingLevelsChanged();
    }
  };

  public updateSpotsQueuedState = (): void => {
    let updatedAny = false;
    const queuedBuildings = this.queue.buildings();

    this.spots.buildings().forEach((spot) => {
      let updated = false;
      const queuedForSpot = queuedBuildings.filter((b) => b.fieldId === spot.fieldId);
      const queuedLevel = getMaximum(queuedForSpot.map((b) => b.targetLevel));

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
        this.events.onBuildingSpotUpdated(spot);
      }
    });

    if (updatedAny) {
      this.events.onCrannyCapacityUpdate();
    }
  };

  public freeFieldIds = (): readonly number[] =>
    this.spots
      .buildings()
      .filter((b) => b.level.getTotal() === 0)
      .map((b) => b.fieldId);
}
