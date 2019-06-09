import { allBuildingTypes, BuildingType } from '../_enums/BuildingType';
import { Tribe } from '../_enums/Tribe';
import { BuildingConditions, CapitalCondition } from '../_models/buildings/buildingConditions';
import { BuildingInProgress } from '../_models/buildings/buildingInProgress';
import { BuildingQueue } from '../_models/buildings/BuildingQueue';
import { BuildingSpot } from '../_models/buildings/buildingSpot';
import { QueuedBuilding } from '../_models/buildings/queuedBuilding';
import {
  IAvailableNewBuildingsInput,
  IBuildingSpot,
  IDequeueBuildingAtFieldInput,
  IEnqueueBuildingInput,
  INewBuildingInfo,
  IQueuedBuildingManipulationInput,
} from '../_types/graphql';
import { buildingNames } from '../constants/buildingNames';
import { context } from '../graphql/context';
import { buildingInfos, buildingsConditions } from '../index';
import { getWithMaximum } from '../utils/getWithMaximum';

const fieldIds = Object.freeze({
  RallyPoint: 39,
  Wall: 40,
});

export enum MovingDirection {
  Up = -1,
  Down = 1,
}

export class BuildingsService {
  private readonly _buildingSpots: Record<number, readonly BuildingSpot[]> = {};
  private readonly _buildingsInProgress: Record<number, BuildingInProgress[]> = {};
  private readonly _buildingQueues: Record<number, BuildingQueue> = {};

  public buildingSpots(villageId: number): readonly BuildingSpot[] {
    return this._buildingSpots[villageId] || [];
  }

  public setBuildingSpots(villageId: number, buildings: readonly BuildingSpot[]) {
    this._buildingSpots[villageId] = buildings.slice();
  }

  public buildingQueue(villageId: number): BuildingQueue {
    let queue = this._buildingQueues[villageId];

    if (!queue) {
      queue = new BuildingQueue();
      this._buildingQueues[villageId] = queue;
    }

    return queue;
  }

  public buildingsInProgress(villageId: number): readonly BuildingInProgress[] {
    return this._buildingsInProgress[villageId] || [];
  }

  public setBuildingsInProgress(villageId: number, buildings: readonly BuildingInProgress[]): void {
    this._buildingsInProgress[villageId] = buildings.slice();
  }

  public clearQueue(villageId: number): void {
    const queue = this.buildingQueue(villageId);
    queue.clear();
  }

  public enqueueBuilding(input: IEnqueueBuildingInput): void {
    const {
      type,
      fieldId,
      levels,
      villageId,
    } = input;

    const totalLevel = this.normalizedBuildingSpots(villageId).find(spot => spot.fieldId === fieldId).level.total;
    const queue = this.buildingQueue(villageId);
    const maxLevel = buildingInfos[type].length;

    for (let i = 1; i <= levels; i++) {
      const level = totalLevel + i;

      if (level > maxLevel) {
        return;
      }

      const queueId = `${fieldId}-${type}-${level}-${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8)}`;
      const building: QueuedBuilding = new QueuedBuilding({
        fieldId,
        level,
        type,
        queueId,
      });

      queue.add(building);
    }
  }

  public dequeueBuilding(input: IQueuedBuildingManipulationInput): void {
    const {
      queueId,
      villageId,
    } = input;

    const queue = this.buildingQueue(villageId);
    queue.remove(queueId);

    this.correctBuildingQueue(villageId);
  }

  public dequeueBuildingAtField(input: IDequeueBuildingAtFieldInput): void {
    const {
      deleteAll,
      fieldId,
      villageId,
    } = input;

    const queue = this.buildingQueue(villageId);

    if (deleteAll) {
      queue
        .buildings()
        .filter(b => b.fieldId === fieldId)
        .map(b => b.queueId)
        .forEach(queue.remove);
    } else {
      queue.popLastAtField(fieldId);
    }

    this.correctBuildingQueue(villageId);
  }

  public normalizedBuildingSpots(villageId: number): readonly IBuildingSpot[] {
    const spots = this.buildingSpots(villageId);
    const queue = this.buildingQueue(villageId);
    const inProgress = this.buildingsInProgress(villageId);

    return spots.map((b): IBuildingSpot => {
      const queued = queue.buildings().filter(bb => bb.fieldId === b.fieldId);
      const ongoing = inProgress.filter(bb => bb.fieldId === b.fieldId);
      const type = b.type || (ongoing.length ? ongoing[0].type : (queued.length ? queued[0].type : BuildingType.None));

      return {
        type,
        fieldId: b.fieldId,
        level: {
          actual: b.level,
          queued: queued.length,
          ongoing: ongoing.length,
          total: b.level + ongoing.length + queued.length,
          max: buildingInfos[type].length,
        },
        name: buildingNames[type],
      };
    });
  }

  public availableNewBuildings(input: IAvailableNewBuildingsInput): readonly INewBuildingInfo[] {
    const {
      fieldId,
      villageId,
    } = input;

    const {
      tribe,
    } = context.player;

    const buildingTypes: BuildingType[] = [];

    switch (fieldId) {
      //place to build wall
      case fieldIds.Wall: {
        let type: BuildingType;

        switch (tribe) {
          case Tribe.Egyptians: {
            type = BuildingType.StoneWall;
            break;
          }

          case Tribe.Gauls: {
            type = BuildingType.Palisade;
            break;
          }

          case Tribe.Huns: {
            type = BuildingType.MakeshiftWall;
            break;
          }

          case Tribe.Romans: {
            type = BuildingType.CityWall;
            break;
          }

          case Tribe.Teutons: {
            //Teutons
            type = BuildingType.EarthWall;
            break;
          }
        }

        buildingTypes.push(type);
        break;
      }

      //rally point only
      case fieldIds.RallyPoint: {
        buildingTypes.push(BuildingType.RallyPoint);
        break;
      }

      default: {
        for (let i = 0; i < allBuildingTypes.length; i++) {
          const type = allBuildingTypes[i];

          if (type <= BuildingType.Crop) {
            continue;
          }

          switch (type) {
            case BuildingType.Blacksmith:
            case BuildingType.RallyPoint:
            case BuildingType.CityWall:
            case BuildingType.EarthWall:
            case BuildingType.Palisade:
            case BuildingType.StoneWall:
            case BuildingType.MakeshiftWall:
            case BuildingType.WonderOfTheWorld:
              continue;
          }

          const buildingConditions = buildingsConditions[type];
          const meetVillageConditions = this.newBuildingMeetsConditions(villageId, buildingConditions);

          if (!meetVillageConditions) {
            continue;
          }

          const normalizedBuildingSlots = this.normalizedBuildingSpots(villageId);
          const spotsOfType = normalizedBuildingSlots.filter(b => b.type === type);

          //max count = 1
          const bAlreadyExists = spotsOfType.length > 0;

          if (bAlreadyExists) {
            if (type != BuildingType.Granary
              && type != BuildingType.Warehouse
              && type != BuildingType.Cranny
              && type != BuildingType.Trapper) {
              continue;
            }

            //requirements for more than 1 building of that type
            if (!spotsOfType.some(b => b.level.total === buildingInfos[b.type].length)) {
              continue;
            }
          }

          //requirements
          buildingTypes.push(type);
        }

        break;
      }
    }

    return buildingTypes.map((type): INewBuildingInfo => ({
      type,
      name: buildingNames[type],
    }));
  }

  public correctBuildingQueue(villageId: number) {
    const queue = this.buildingQueue(villageId);
    const queuedBuildings = queue.buildings();
    const offsets: Record<number, number> = {};

    this.buildingSpots(villageId).forEach(spot => {
      offsets[spot.fieldId] = 0;
    });

    queuedBuildings.forEach(qBuilding => {
      const shouldBeRemoved = this.shouldRemoveBuildingFromQueue(villageId, qBuilding, offsets);

      if (shouldBeRemoved) {
        queue.remove(qBuilding.queueId);
      } else {
        offsets[qBuilding.fieldId]++;
      }
    });
  }

  public canMoveQueuedBuilding(input: IQueuedBuildingManipulationInput, direction: MovingDirection): boolean {
    const {
      villageId,
      queueId,
    } = input;

    const queue = this.buildingQueue(villageId);

    const queueIndex = queue.buildings().findIndex(b => b.queueId === queueId);

    if (queueIndex === -1) {
      return false;
    }

    const newIndex = queueIndex + direction;
    if (newIndex < 0 || newIndex >= queue.buildings().length) {
     return false;
    }

    const building = queue.buildings()[queueIndex];
    const buildingInTheWay = queue.buildings()[queueIndex + direction];

    const isMovingUp = direction === MovingDirection.Up;

    //moving up/down and its same id/type as next/previous level too so cant move more up
    if (buildingInTheWay.fieldId === building.fieldId
      && buildingInTheWay.level === building.level + direction) {
      return false;
    }

    let qBuildingWithPossiblyAffectedRequirements: QueuedBuilding;
    let theOtherBuilding: IBuildingSpot;

    const normalizedBuildings = this.normalizedBuildingSpots(villageId);

    if (isMovingUp) {
      qBuildingWithPossiblyAffectedRequirements = building;
      theOtherBuilding = normalizedBuildings.find(b => b.fieldId === buildingInTheWay.fieldId);
    } else {
      qBuildingWithPossiblyAffectedRequirements = buildingInTheWay;
      theOtherBuilding = normalizedBuildings.find(b => b.fieldId == building.fieldId);
    }

    return this.willQueuedBuildingStillMeetItsRequirementsAfterRepositioning(
      villageId,
      qBuildingWithPossiblyAffectedRequirements,
      theOtherBuilding.fieldId,
    );
  }

  private willQueuedBuildingStillMeetItsRequirementsAfterRepositioning(villageId: number, checkedBuilding: QueuedBuilding, reducedOffsetBuildingFieldId: number): boolean {
    // need to calculate offset till its position
    const offsets: Record<number, number> = {};
    const queuedBuildings = this.buildingQueue(villageId).buildings();
    const spots = this.buildingSpots(villageId);

    for (let i = 0; i < spots.length; i++) {
      const spot = spots[i];
      offsets[spot.fieldId] = 0;
    }

    for (let i = 0; i < queuedBuildings.length; i++) {
      const qBuilding = queuedBuildings[i];
      offsets[qBuilding.fieldId]++;

      if (qBuilding.queueId === checkedBuilding.queueId) {
        break;
      }
    }

    return this.willQueuedBuildingStillMeetItsRequirementsAfterRepositioningOther(
      villageId,
      checkedBuilding,
      offsets,
      reducedOffsetBuildingFieldId);
  }

  private willQueuedBuildingStillMeetItsRequirementsAfterRepositioningOther(villageId: number, checkedBuilding: QueuedBuilding, offsets: Record<number, number>, reducedOffsetBuildingFieldId?: number): boolean {
    const getTemporaryTotalLevel = (building: IBuildingSpot): number =>
      building.level.actual
      + building.level.ongoing
      + (building.fieldId === reducedOffsetBuildingFieldId
          ? offsets[building.fieldId] - 1
          : offsets[building.fieldId]);

    const normalizedBuildings = this.normalizedBuildingSpots(villageId);
    const conditions = buildingsConditions[checkedBuilding.type];

    if (conditions.type > BuildingType.Crop) {
      const maxLevel = buildingInfos[checkedBuilding.type].length;

      const anyCompleted = normalizedBuildings
        .filter(b => b.type === checkedBuilding.type)
        .some(b => getTemporaryTotalLevel(b) >= maxLevel);

      if (!anyCompleted) {
        // if not unique, but at least 1 is not fully completed
        // it can break down on queue switch
        const highestLevelBuildingOfSameType = getWithMaximum(
          normalizedBuildings.filter(b => b.type === checkedBuilding.type),
          getTemporaryTotalLevel,
        );

        if (!highestLevelBuildingOfSameType) {
          return false;
        }

        const itsTemporaryLevel = getTemporaryTotalLevel(highestLevelBuildingOfSameType);

        //if they are not the same building spot or its level is not preceding to this then theres a problem
        if (highestLevelBuildingOfSameType.fieldId !== checkedBuilding.fieldId || (itsTemporaryLevel < checkedBuilding.level - 1)) {
          return false;
        }
      }
    }

    for (let i = 0; i < conditions.requiredBuildings.length; i++)
    {
      const requiredBuilding = conditions.requiredBuildings[i];
      const requiredBuildingExists = normalizedBuildings.some(
        b => b.type === requiredBuilding.type
          && getTemporaryTotalLevel(b) >= requiredBuilding.level);

      if (!requiredBuildingExists) {
        return false;
      }
    }

    return true;
  }

  public moveQueuedBuildingDown(input: IQueuedBuildingManipulationInput): boolean {
    if (!this.canMoveQueuedBuilding(input, MovingDirection.Down)) {
      return false;
    }

    const {
      queueId,
      villageId,
    } = input;

    const queue = this.buildingQueue(villageId);
    queue.moveDown(queueId);

    return true;
  }

  public moveQueuedBuildingUp(input: IQueuedBuildingManipulationInput): boolean {
    if (!this.canMoveQueuedBuilding(input, MovingDirection.Up)) {
      return false;
    }

    const {
      queueId,
      villageId,
    } = input;

    const queue = this.buildingQueue(villageId);
    queue.moveUp(queueId);

    return true;
  }

  private shouldRemoveBuildingFromQueue(villageId: number, queuedBuilding: QueuedBuilding, providedOffsets: Record<number, number>): boolean {
    if (queuedBuilding.type === BuildingType.Palace
      && context.villageService.villages().some(otherVillage =>
        otherVillage.id !== villageId
        && this.normalizedBuildingSpots(otherVillage.id).some(b => b.type === BuildingType.Palace))) {
      //iba 1 palac
      return true;
    }

    const normalizedBuildings = this.normalizedBuildingSpots(villageId);

    const previousLevelBuildingExists = normalizedBuildings.some(b =>
      b.type === queuedBuilding.type
      && b.fieldId === queuedBuilding.fieldId
      && (b.level.actual
      + b.level.ongoing
      + providedOffsets[queuedBuilding.fieldId]
      + 1)
      === queuedBuilding.level);

    //mala by existovat budova s predoslym lvl
    if (!previousLevelBuildingExists) {
      return true;
    }

    const conditions = buildingsConditions[queuedBuilding.type];
    const village = context.villageService.villages().find(v => v.id === villageId);

    if ((conditions.capital === CapitalCondition.Prohibited && village.isCapital)
      || (conditions.capital === CapitalCondition.Required && !village.isCapital)) {
      return true;
    }

    if (queuedBuilding.level == 1) {
      //dolezite iba ked sa stava nove
      const prohibitedBuildingExists = normalizedBuildings.some(
        b => b.level.actual + b.level.ongoing + providedOffsets[b.fieldId] > 0
          && conditions.prohibitedBuildingTypes.includes(b.type));

      if (prohibitedBuildingExists) {
        return true;
      }

      if (conditions.type > BuildingType.Crop) {
        //u resource je jedno
        const sameTypeBuildings = normalizedBuildings.filter(b => b.type === conditions.type);

        if (conditions.isUnique) {
          // existuje nejaka budova, rozstavana alebo v queue az po tialto
          const existingBuilding = sameTypeBuildings.find(
            b => b.level.actual + b.level.ongoing + providedOffsets[b.fieldId]
              > 0);

          if (!!existingBuilding
            && existingBuilding.fieldId != queuedBuilding.fieldId) {
            return true;
          }
        } else {
          const maxLevel = buildingInfos[conditions.type].length;

          const existingBuildings = sameTypeBuildings.map(
            b => ({
              totalLevel:
                b.level.actual
                + b.level.ongoing
                + providedOffsets[b.fieldId],
              fieldId: b.fieldId,
            }))
            .filter(b => b.totalLevel > 0);


          if (existingBuildings.length > 0) {
            const isAnyCompleted =
              existingBuildings.some(b => b.totalLevel >= maxLevel);

            if (!isAnyCompleted) {
              //ked neni unikatna ani ziadna kompletna tak z tych co existuju sa aspon
              //1 musi zhodovat s tym co stavame
              const anyExists = existingBuildings.some(
                b => b.fieldId === queuedBuilding.fieldId);

              if (!anyExists) {
                return true;
              }
            }
          }
        }
      }

      if (queuedBuilding.level === 1) {
        //dolezite iba ked sa stava nove
        for (let i = 0; i < conditions.requiredBuildings.length; i++) {
          {
            const requiredBuilding = conditions.requiredBuildings[i];
            const requiredBuildingExists = normalizedBuildings.some(
              b => b.type == requiredBuilding.type
                && b.level.actual + b.level.ongoing + providedOffsets[b.fieldId]
                >= requiredBuilding.level);

            if (!requiredBuildingExists) {
              return true;
            }
          }
        }
      }

      return false;
    }
  }

  private newBuildingMeetsConditions(villageId: number, conditions: BuildingConditions): boolean {
    //TODO detect if artefacts are in village
    if (conditions.type === BuildingType.GreatGranary
      || conditions.type === BuildingType.GreatWarehouse) {
      return false;
    }

    if (conditions.playerTribe !== Tribe.None
      && conditions.playerTribe !== context.player.tribe) {
      return false;
    }

    const { isCapital } = context.villageService.currentVillage();
    if ((conditions.capital === CapitalCondition.Prohibited && isCapital)
      || (conditions.capital === CapitalCondition.Required && !isCapital)) {
      return false;
    }

    const normalizedBuildingSpots = this.normalizedBuildingSpots(villageId);

    //vsetky budovy aj v queue
    const buildings = normalizedBuildingSpots.filter(b => b.type === conditions.type);

    if (conditions.isUnique) {
      if (buildings.length) {
        return false;
      }
    }
    else {
      const completedBuildingExists = buildings.some(b => b.level.total === buildingInfos[b.type].length);

      if (buildings.length && !completedBuildingExists) {
        // neni unikatna, uz nejaka existuje ale neni max level
        return false;
      }
    }

    const hasProhibitedBuildings = normalizedBuildingSpots.some(b => conditions.prohibitedBuildingTypes.includes(b.type));

    if (hasProhibitedBuildings) {
      return false;
    }

    for (let i = 0; i < conditions.requiredBuildings.length; i++) {
      const requiredBuilding = conditions.requiredBuildings[i];
      const requiredBuildingExists = normalizedBuildingSpots.some(
        b => b.level.total >= requiredBuilding.level
          && b.type === requiredBuilding.type);

      if (!requiredBuildingExists) {
        return false;
      }
    }

    return true;
  }
}
