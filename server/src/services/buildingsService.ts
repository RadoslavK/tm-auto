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
  IDequeueBuildingInput,
  IEnqueueBuildingInput,
  INewBuildingInfo,
} from '../_types/graphql';
import { buildingNames } from '../constants/buildingNames';
import { context } from '../graphql/context';
import { buildingInfos, buildingsConditions } from '../index';

const fieldIds = Object.freeze({
  RallyPoint: 39,
  Wall: 40,
});

export class BuildingsService {
  private readonly _buildingSpots: Record<number, readonly BuildingSpot[]> = {};
  private readonly _buildingsInProgress: Record<number, BuildingInProgress[]> = {};
  private readonly _buildingQueues: Record<number, BuildingQueue> = {};

  public getBuildingSpots(villageId: number): readonly BuildingSpot[] {
    return this._buildingSpots[villageId] || [];
  }

  public setBuildingSpots(villageId: number, buildings: Iterable<BuildingSpot>) {
    this._buildingSpots[villageId] = [...buildings];
  }

  public getBuildingQueue(villageId: number): BuildingQueue {
    let queue = this._buildingQueues[villageId];

    if (!queue) {
      queue = new BuildingQueue();
      this._buildingQueues[villageId] = queue;
    }

    return queue;
  }

  public getBuildingsInProgress(villageId: number): readonly BuildingInProgress[] {
    return this._buildingsInProgress[villageId] || [];
  }

  public setBuildingsInProgress(villageId: number, buildings: Iterable<BuildingInProgress>): void {
    this._buildingsInProgress[villageId] = [...buildings];
  }

  public clearQueue(villageId: number): void {
    const queue = this.getBuildingQueue(villageId);
    queue.clear();
  }

  public enqueueBuilding(input: IEnqueueBuildingInput): void {
    const {
      type,
      fieldId,
      villageId,
    } = input;

    const totalLevel = this.normalizedBuildingSpots(villageId).find(spot => spot.fieldId === fieldId).level.total;
    const queue = this.getBuildingQueue(villageId);
    const level = totalLevel + 1;
    const maxLevel = buildingInfos[type].length;

    if (level > maxLevel) {
      return;
    }

    const building: QueuedBuilding = new QueuedBuilding({
      fieldId,
      level,
      type,
    });

    queue.enqueue(building);
  }

  public dequeueBuilding(input: IDequeueBuildingInput): void {
    const {
      queueIndex,
      villageId,
    } = input;

    const queue = this.getBuildingQueue(villageId);
    queue.dequeueAt(queueIndex);

    this.correctBuildingQueue(villageId);
  }

  public normalizedBuildingSpots(villageId: number): readonly IBuildingSpot[] {
    const spots = this.getBuildingSpots(villageId);

    const queue = this.getBuildingQueue(villageId);
    const inProgress = this.getBuildingsInProgress(villageId);

    return spots.map((b): IBuildingSpot => {
      const queued = queue.buildings().filter(bb => bb.fieldId === b.fieldId);
      const ongoing = inProgress.filter(bb => bb.fieldId === b.fieldId);
      const usedType = b.type || (ongoing.length > 0 ? ongoing[0].type : (queued.length > 0 ? queued[0].type : b.type));
      const level = {
        actual: b.level,
        inProgress: inProgress.filter(bb => bb.fieldId === b.fieldId).length,
        queued: queued.length,
      };

      return {
        type: usedType,
        fieldId: b.fieldId,
        level: {
          ...level,
          ongoing: level.inProgress,
          total: level.actual + level.inProgress + level.queued,
          max: buildingInfos[usedType].length,
        },
        name: buildingNames[usedType],
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

          //max count = 1
          const bAlreadyExists = normalizedBuildingSlots.filter(b => b.type === type).length > 0;

          if (bAlreadyExists) {
            if (type != BuildingType.Granary
              && type != BuildingType.Warehouse
              && type != BuildingType.Cranny
              && type != BuildingType.Trapper) {
              continue;
            }

            //requirements for more than 1 building of that type

            if (normalizedBuildingSlots.filter(b => b.type === type && b.level.total === buildingInfos[b.type].length).length == 0) {
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
    const queue = this.getBuildingQueue(villageId);
    const queuedBuildings = queue.buildings();
    const offsets: Record<number, number> = {};

    this.getBuildingSpots(villageId).forEach(spot => {
      offsets[spot.fieldId] = 0;
    });

    queuedBuildings.forEach(qBuilding => {
      const shouldBeRemoved = this.shouldRemoveBuildingFromQueue(villageId, qBuilding, offsets);

      if (shouldBeRemoved) {
        const index = queuedBuildings.indexOf(qBuilding);
        queue.removeAt(index);
      } else {
        offsets[qBuilding.fieldId]++;
      }
    });
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
      && b.fieldId == queuedBuilding.fieldId
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
                b => b.fieldId == queuedBuilding.fieldId);

              if (!anyExists) {
                return true;
              }
            }
          }
        }
      }

      if (queuedBuilding.level == 1) {
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
    if (conditions.type == BuildingType.GreatGranary
      || conditions.type == BuildingType.GreatWarehouse) {
      return false;
    }

    if (conditions.playerTribe != Tribe.None
      && conditions.playerTribe != context.player.tribe) {
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
      if (buildings.some(b => b)) {
        return false;
      }
    }
    else {
      const completedBuildingExists = buildings.some(b => b.level.total === buildingInfos[b.type].length);

      if (buildings.some(b => b)
        && !completedBuildingExists) {
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
