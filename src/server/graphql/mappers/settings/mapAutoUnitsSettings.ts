import { AutoUnitsSettings } from '../../../_models/settings/tasks/AutoUnitsSettings';
import {
  IAutoUnitsBuildingSettings,
  IAutoUnitsSettings,
} from '../../../_types/graphql';
import { BuildingType } from '../../../_enums/BuildingType';
import { unitsService } from '../../../services/unitsService';

export const mapAutoUnitsSettings = (settings: AutoUnitsSettings): IAutoUnitsSettings => {
  const createForBuilding = (type: BuildingType): IAutoUnitsBuildingSettings => {
    const lSettings = settings.buildings[type];

    if (!lSettings) {
      throw new Error(`Auto units settings for building ${BuildingType[type]} not found`);
    }

    return {
      allow: lSettings.allow,
      maxBuildTime: lSettings.maxBuildTime,
      units: settings.units.filter(x => unitsService.getUnitBuildingType(x.index) === type),
    };
  };

  return {
    allow: settings.allow,
    coolDown: settings.coolDown,
    minCrop: settings.minCrop,
    barracks: createForBuilding(BuildingType.Barracks),
    stable: createForBuilding(BuildingType.Stable),
    workshop: createForBuilding(BuildingType.Workshop),
    residence: createForBuilding(BuildingType.Residence),
  };
};