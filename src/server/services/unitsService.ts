//  TODO unit infos a loading presunut sem a spravit podobne aj building info servisu

import {
  IUnitInfo,
  unitInfos,
} from '../bootstrap/loadInfo';

class UnitsService {
  public getUnitInfo = (unitIndex: number): IUnitInfo => {
    const unitInfo = unitInfos.get(unitIndex);

    if (!unitInfo) {
      throw new Error(`Unit info for unit index ${unitIndex} not found`);
    }

    return unitInfo;
  };
}

export const unitsService = new UnitsService();