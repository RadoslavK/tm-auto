import { BuildingType } from 'shared/enums/BuildingType.js';
import { Tribe } from 'shared/enums/Tribe.js';
import { getAllEnumValues } from 'shared/utils/enumUtils.js';

import {
  BuildingConditions,
  CapitalCondition,
} from '../_models/buildings/buildingConditions.js';
import type { Village } from '../_models/village/village.js';
import { fieldIds } from '../constants/fieldIds.js';
import { buildingInfoService } from './info/buildingInfoService.js';

export class AvailableBuildingTypesService {
  public availableBuildingTypes = (
    village: Village,
    fieldId: number,
  ): readonly BuildingType[] => {
    const { tribe } = village;

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
              village,
              type,
              buildingConditions,
              tribe,
            );

            if (!meetVillageConditions) {
              return;
            }

            const normalizedBuildingSlots = village.buildings.spots.buildings();
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
    village: Village,
    type: BuildingType,
    conditions: BuildingConditions,
    tribe: Tribe,
  ): boolean => {
    if (
      type === BuildingType.GreatGranary ||
      type === BuildingType.GreatWarehouse
    ) {
      return false;
    }

    if (
      conditions.playerTribe !== null &&
      conditions.playerTribe !== tribe
    ) {
      return false;
    }

    const { isCapital } = village;
    if (
      (conditions.capital === CapitalCondition.Prohibited && isCapital) ||
      (conditions.capital === CapitalCondition.Required && !isCapital)
    ) {
      return false;
    }

    const normalizedBuildingSpots = village.buildings.spots.buildings();

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
