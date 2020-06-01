import { BuildingType } from '../../../_shared/types/buildingType';
import { accountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { publishPayloadEvent } from '../../pubSub';
import { ActualBuilding } from './actual/actualBuilding';
import { BuildingInProgress } from './inProgress/buildingInProgress';
import { BuildingsInProgress } from './inProgress/buildingsInProgress';
import { BuildingQueue } from './queue/buildingQueue';
import { BuildingSpots } from './spots/buildingSpots';

export class Buildings {
  public readonly ongoing: BuildingsInProgress = new BuildingsInProgress();
  public readonly spots: BuildingSpots = new BuildingSpots();
  public readonly queue: BuildingQueue = new BuildingQueue();

  public updateActual = (buildings: readonly ActualBuilding[]): void => {
    buildings.forEach(b => {
      const spot = this.spots.at(b.fieldId);
      spot.level.actual = b.level;
      spot.type = b.type;
    });

    // todo refactor to service behavior
    const { id } = accountContext.villageService.currentVillage();

    publishPayloadEvent(BotEvent.ActualBuildingLevelsUpdated, { villageId: id });
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

    // TODO, refactor into service so only a service publishes payloads

    const { id } = accountContext.villageService.currentVillage();

    publishPayloadEvent(BotEvent.BuildingsInProgressUpdated, { villageId: id });
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
        } else if (spot.type !== BuildingType.None && spot.level.getTotal() === 0) {
          spot.type = BuildingType.None;
        }
      });

    const { id } = accountContext.villageService.currentVillage();

    publishPayloadEvent(BotEvent.QueuedUpdated, { villageId: id });
  };

  public freeFieldIds = (): readonly number[] => this
    .spots
    .buildings()
    .filter(b => b.level.getTotal() === 0)
    .map(b => b.fieldId);
}
