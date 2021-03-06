import type { BuildingType } from 'shared/enums/BuildingType.js';
import type { Tribe } from 'shared/enums/Tribe.js';

import unitInfos from '../../_info/unit-infos.json';
import { Duration } from '../../_models/duration.js';
import { Resources } from '../../_models/misc/resources.js';

type UnitInfo = {
  readonly buildingType: BuildingType;
  readonly buildingTime: Duration;
  readonly cost: Resources;
  readonly index: number;
  readonly name: string;
  readonly tribe: Tribe;
};

export class UnitInfoService {
  private unitInfos: Map<number, UnitInfo> | undefined;

  public getAllInfos = (): readonly UnitInfo[] => [...this.infos().values()];

  public getUnitInfo = (unitIndex: number): UnitInfo => {
    const unitInfo = this.infos().get(unitIndex);

    if (!unitInfo) {
      throw new Error(`Unit info for unit index ${unitIndex} not found`);
    }

    return unitInfo;
  };

  private infos = (): Map<number, UnitInfo> => {
    if (!this.unitInfos) {
      const infosMap = new Map();

      Object.entries(unitInfos).forEach(([key, value]) => {
        //  internally there are not classes so we need to create them
        const correctValue: UnitInfo = {
          ...value,
          buildingTime: new Duration(value.buildingTime),
          cost: new Resources(value.cost),
        };

        infosMap.set(+key, correctValue);
      });

      this.unitInfos = infosMap;
    }

    return this.unitInfos;
  };
}

export const unitInfoService = new UnitInfoService();
