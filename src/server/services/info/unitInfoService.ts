import fs from 'fs';
import path from 'path';

import { Cost } from '../../_models/misc/cost';
import { BuildingType } from '../../../_shared/types/buildingType';
import { Tribe } from '../../../_shared/types/tribe';

const unitsInfoPath = path.join(__dirname, '..', '..', '..', 'resources', 'unit-infos.json');

interface IUnitInfo {
  readonly buildingType: BuildingType;
  readonly cost: Cost;
  readonly name: string;
  readonly tribe: Tribe;
  readonly index: number;
}

class UnitInfoService {
  private unitInfos: Map<number, IUnitInfo> | undefined;

  public getAllInfos = (): readonly IUnitInfo[] => [...this.infos().values()];

  public getUnitInfo = (unitIndex: number): IUnitInfo => {
    const unitInfo = this.infos().get(unitIndex);

    if (!unitInfo) {
      throw new Error(`Unit info for unit index ${unitIndex} not found`);
    }

    return unitInfo;
  };

  private infos = (): Map<number, IUnitInfo> => {
    if (!this.unitInfos) {
      const loadedIUnitInfos = JSON.parse(fs.readFileSync(unitsInfoPath).toString()) as Record<string, IUnitInfo>;
      const unitInfos = new Map();

      Object
        .entries(loadedIUnitInfos)
        .forEach(([key, value]) => {
          //  internally there are not classes so we need to create them
          const correctValue: IUnitInfo = {
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
