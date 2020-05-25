import fs from 'fs';
import path from 'path';

import { Cost } from '../../_models/misc/cost';
import { BuildingType } from '../../../_shared/types/buildingType';
import { Tribe } from '../../../_shared/types/tribe';

const unitsInfoPath = path.join(__dirname, '..', '..', '..', '..', 'resources', 'unit-infos.json');

type UnitInfo = {
  readonly buildingType: BuildingType;
  readonly cost: Cost;
  readonly index: number;
  readonly name: string;
  readonly tribe: Tribe;
};

class UnitInfoService {
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
      const loadedIUnitInfos = JSON.parse(fs.readFileSync(unitsInfoPath).toString()) as Record<string, UnitInfo>;
      const unitInfos = new Map();

      Object
        .entries(loadedIUnitInfos)
        .forEach(([key, value]) => {
          //  internally there are not classes so we need to create them
          const correctValue: UnitInfo = {
            ...value,
            cost: new Cost(value.cost),
          };

          unitInfos.set(+key, correctValue);
        });

      this.unitInfos = unitInfos;
    }

    return this.unitInfos;
  };
}

export const unitInfoService = new UnitInfoService();
