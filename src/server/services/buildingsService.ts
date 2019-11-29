import { BuildingType } from '../../_shared/types/buildingType';
import {
  buildingInfos,
  IBuildingInfo,
} from '../bootstrap/loadInfo';

class BuildingsService {
  public getBuildingInfo = (type: BuildingType): IBuildingInfo => {
    const info = buildingInfos.get(type);

    if (!info) {
      throw new Error(`Building info for type not found: ${BuildingType[type]}`);
    }

    return info;
  }
}

export const buildingsService = new BuildingsService();
