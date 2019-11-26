import { allBuildingTypes, BuildingType } from '../_enums/BuildingType';
import { BuildingConditions, CapitalCondition } from '../_models/buildings/buildingConditions';
import { Village } from '../_models/village/village';
import { fieldIds } from '../constants/fieldIds';
import { buildingInfos } from '../bootstrap/loadInfo';
import { accountContext } from '../accountContext';
import { ITribe } from '../_types/graphql';
import { getTribeFromIndex } from '../../_shared/tribeIndex';

export class AvailableBuildingTypesService {
  private readonly m_village: Village;

  constructor(villageId: number) {
    this.m_village = accountContext.villageService.village(villageId);
  }

  public availableBuildingTypes = (fieldId: number): readonly BuildingType[] => {
    const { tribe } = accountContext.gameInfo;

    const buildingTypes: BuildingType[] = [];

    switch (fieldId) {
      // place to build wall
      case fieldIds.Wall: {
        let type: BuildingType;

        switch (tribe) {
          case ITribe.Egyptians: {
            type = BuildingType.StoneWall;
            break;
          }

          case ITribe.Gauls: {
            type = BuildingType.Palisade;
            break;
          }

          case ITribe.Huns: {
            type = BuildingType.MakeshiftWall;
            break;
          }

          case ITribe.Romans: {
            type = BuildingType.CityWall;
            break;
          }

          case ITribe.Teutons: {
            type = BuildingType.EarthWall;
            break;
          }

          default:
            throw new Error(`Unknown player tribe: ${ITribe[tribe]}`);
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
        allBuildingTypes.forEach(type => {
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

          const buildingConditions = buildingInfos[type].conditions;
          const meetVillageConditions = this.newBuildingMeetsConditions(buildingConditions);

          if (!meetVillageConditions) {
            return;
          }

          const normalizedBuildingSlots = this.m_village.buildings.normalizedBuildingSpots();
          const spotsOfType = normalizedBuildingSlots.filter(b => b.type === type);

          // max count = 1
          const bAlreadyExists = spotsOfType.length > 0;

          if (bAlreadyExists) {
            if (type !== BuildingType.Granary
              && type !== BuildingType.Warehouse
              && type !== BuildingType.Cranny
              && type !== BuildingType.Trapper) {
              return;
            }

            // requirements for more than 1 building of that type
            if (!spotsOfType.some(b => b.level.total === buildingInfos[b.type].maxLevel)) {
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

  private newBuildingMeetsConditions = (conditions: BuildingConditions): boolean => {
    // TODO detect if artefacts are in village
    if (conditions.type === BuildingType.GreatGranary
      || conditions.type === BuildingType.GreatWarehouse) {
      return false;
    }

    if (conditions.playerTribe !== 0
      && getTribeFromIndex(conditions.playerTribe) !== accountContext.gameInfo.tribe) {
      return false;
    }

    const { isCapital } = this.m_village;
    if ((conditions.capital === CapitalCondition.Prohibited && isCapital)
      || (conditions.capital === CapitalCondition.Required && !isCapital)) {
      return false;
    }

    const normalizedBuildingSpots = this.m_village.buildings.normalizedBuildingSpots();

    // vsetky budovy aj v queue
    const buildings = normalizedBuildingSpots.filter(b => b.type === conditions.type);

    if (conditions.isUnique) {
      if (buildings.length) {
        return false;
      }
    }
    else {
      const completedBuildingExists = buildings.some(b => b.level.total === buildingInfos[b.type].maxLevel);

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
  };
}
