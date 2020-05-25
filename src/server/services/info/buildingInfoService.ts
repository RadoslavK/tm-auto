import fs from 'fs';
import path from 'path';

import { BuildingCategory } from '../../_enums/buildingCategory';
import { BuildingConditions } from '../../_models/buildings/buildingConditions';
import { Cost } from '../../_models/misc/cost';
import { mapRecord } from '../../../_shared/objectUtils';
import { BuildingType } from '../../../_shared/types/buildingType';

const buildingsInfoPath = path.join(__dirname, '..', '..', '..', '..', 'resources', 'building-infos.json');

type BuildingInfo = {
  readonly category: BuildingCategory;
  readonly conditions: BuildingConditions;
  readonly costs: Record<string, Cost>;
  readonly maxLevel: number;
  readonly name: string;
  readonly type: number;
};

class BuildingInfoService {
  private buildingInfos: Map<BuildingType, BuildingInfo> | undefined;

  public getBuildingInfo = (type: BuildingType): BuildingInfo => {
    const info = this.infos().get(type);

    if (!info) {
      throw new Error(`Building info for type not found: ${BuildingType[type]}`);
    }

    return info;
  };

  private infos = (): Map<BuildingType, BuildingInfo> => {
    if (!this.buildingInfos) {
      const buildingInfos = new Map();

      const loadedBuildingInfos = JSON.parse(fs.readFileSync(buildingsInfoPath).toString()) as Record<string, BuildingInfo>;

      Object
        .entries(loadedBuildingInfos)
        .forEach(([key, value]) => {
          //  correct classes
          const buildingInfo: BuildingInfo = {
            ...value,
            costs: mapRecord(value.costs, c => new Cost(c)),
          };

          buildingInfos.set(+key, buildingInfo);
        });

      this.buildingInfos = buildingInfos;
    }

    return this.buildingInfos;
  };
}

export const buildingInfoService = new BuildingInfoService();
