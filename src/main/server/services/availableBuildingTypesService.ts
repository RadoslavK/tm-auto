import { BuildingType } from '../../../_shared/enums/BuildingType.js';
import { getAllEnumValues } from '../../../_shared/enumUtils.js';
import {
  BuildingConditions,
  CapitalCondition,
} from '../_models/buildings/buildingConditions.js';
import { Tribe } from '../_models/enums/tribe.js';
import { Village } from '../_models/village/village.js';
import { getAccountContext } from '../accountContext.js';
import { fieldIds } from '../constants/fieldIds.js';
import { buildingInfoService } from './info/buildingInfoService.js';

export class AvailableBuildingTypesService {
  private readonly _village: Village;

  constructor(villageId: string) {
    this._village = getAccountContext().villageService.village(villageId);
  }

  public availableBuildingTypes = (
    fieldId: number,
  ): readonly BuildingType[] => {
    const { tribe } = getAccountContext().gameInfo;

    const buildingTypes: BuildingType[] = [];

    switch (fieldId) {
      // place to build wall
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
            type = BuildingType.EarthWall;
            break;
          }

          default:
            throw new Error(`Unknown player tribe: ${tribe}`);
        }

        buildingTypes.push(type);
        break;
      }

      // rally point only
      case fieldIds.RallyPoint: {
        buildingTypes.push(BuildingType.RallyPoint);
        break;
      }

      default: {
        getAllEnumValues(BuildingType)
          .filter((type) => type !== BuildingType.None)
          .forEach((type) => {
            if (type <= BuildingType.Crop) {
              return;
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
                return;

              default:
                break;
            }

            const buildingConditions = buildingInfoService.getBuildingInfo(type)
              .conditions;
            const meetVillageConditions = this.newBuildingMeetsConditions(
              type,
              buildingConditions,
            );

            if (!meetVillageConditions) {
              return;
            }

            const normalizedBuildingSlots = this._village.buildings.spots.buildings();
            const spotsOfType = normalizedBuildingSlots.filter(
              (b) => b.type === type,
            );

            // max count = 1
            const bAlreadyExists = spotsOfType.length > 0;

            if (bAlreadyExists) {
              if (
                type !== BuildingType.Granary &&
                type !== BuildingType.Warehouse &&
                type !== BuildingType.Cranny &&
                type !== BuildingType.Trapper
              ) {
                return;
              }

              // requirements for more than 1 building of that type
              if (
                !spotsOfType.some(
                  (b) =>
                    b.level.getTotal() ===
                    buildingInfoService.getBuildingInfo(b.type).maxLevel,
                )
              ) {
                return;
              }
            }

            // requirements
            buildingTypes.push(type);
          });

        break;
      }
    }

    return buildingTypes;
  };

  private newBuildingMeetsConditions = (
    type: BuildingType,
    conditions: BuildingConditions,
  ): boolean => {
    if (
      type === BuildingType.GreatGranary ||
      type === BuildingType.GreatWarehouse
    ) {
      return false;
    }

    if (
      conditions.playerTribe !== null &&
      conditions.playerTribe !== getAccountContext().gameInfo.tribe
    ) {
      return false;
    }

    const { isCapital } = this._village;
    if (
      (conditions.capital === CapitalCondition.Prohibited && isCapital) ||
      (conditions.capital === CapitalCondition.Required && !isCapital)
    ) {
      return false;
    }

    const normalizedBuildingSpots = this._village.buildings.spots.buildings();

    // vsetky budovy aj v queue
    const buildings = normalizedBuildingSpots.filter((b) => b.type === type);

    if (conditions.isUnique) {
      if (buildings.length) {
        return false;
      }
    } else {
      const completedBuildingExists = buildings.some(
        (b) =>
          b.level.getTotal() ===
          buildingInfoService.getBuildingInfo(b.type).maxLevel,
      );

      if (buildings.length && !completedBuildingExists) {
        // neni unikatna, uz nejaka existuje ale neni max level
        return false;
      }
    }

    const hasProhibitedBuildings = normalizedBuildingSpots.some((b) =>
      conditions.prohibitedBuildingTypes.includes(b.type),
    );

    if (hasProhibitedBuildings) {
      return false;
    }

    for (let i = 0; i < conditions.requiredBuildings.length; i++) {
      const requiredBuilding = conditions.requiredBuildings[i];
      const requiredBuildingExists = normalizedBuildingSpots.some(
        (b) =>
          b.level.getTotal() >= requiredBuilding.level &&
          b.type === requiredBuilding.type,
      );

      if (!requiredBuildingExists) {
        return false;
      }
    }

    return true;
  };
}
