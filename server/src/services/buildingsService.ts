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

    const buildings = this.getBuildingSpots(villageId);
    const queue = this.getBuildingQueue(villageId);
    const queued = queue.buildings().filter(b => b.fieldId === fieldId).length;
    const level = buildings.find(b => b.fieldId === fieldId).level + queued + 1;

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
  }

  public normalizedBuildingSpots(villageId: number): readonly IBuildingSpot[] {
    const spots = this.getBuildingSpots(villageId);

    const queue = this.getBuildingQueue(villageId);
    const inProgress = this.getBuildingsInProgress(villageId);

    return spots.map((b): IBuildingSpot => {
      const queued = queue.buildings().filter(bb => bb.fieldId === b.fieldId);
      const usedType = b.type || (queued.length > 0 ? queued[0].type : b.type);
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
          total: level.actual + level.inProgress + level.queued,
        },
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
    if (conditions.capital === CapitalCondition.Prohibited && isCapital
      || conditions.capital === CapitalCondition.Required && !isCapital) {
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

    const hasProhibitedBuildings =normalizedBuildingSpots .some(b => conditions.prohibitedBuildingTypes.includes(b.type));

    if (hasProhibitedBuildings) {
      return false;
    }

    for (let i = 0; i < conditions.requiredBuildings.length; i++) {
      const requiredBuilding = conditions.requiredBuildings[i];
      const requiredBuildingExists =normalizedBuildingSpots.some(
        b => b.level.total >= requiredBuilding.level
          && b.type === requiredBuilding.type);

      if (!requiredBuildingExists) {
        return false;
      }
    }

    return true;
  }
}
