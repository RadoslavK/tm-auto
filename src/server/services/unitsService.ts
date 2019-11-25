//  TODO unit infos a loading presunut sem a spravit podobne aj building info servisu

import { BuildingType } from '../_enums/BuildingType';
import { accountContext } from '../accountContext';
import {
  IUnitInfo,
  unitInfos,
} from '../bootstrap/loadInfo';

class UnitsService {
  public getUnitBuildingType = (index: number): BuildingType => {
    const unitInfo = this.getUnitInfo(index);

    return unitInfo.buildingType;
  };

  public getUnitInfo = (index: number): IUnitInfo => {
    const { tribe } = accountContext.gameInfo;

    const unitInfo = unitInfos[((tribe - 1) * 10) + index];

    if (!unitInfo) {
      throw new Error(`Unit info for unit index ${index} not found, tribe: ${tribe}`);
    }

    return unitInfo;
  };
}

export const unitsService = new UnitsService();