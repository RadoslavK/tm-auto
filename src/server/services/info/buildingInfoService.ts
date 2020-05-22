import fs from 'fs';
import path from 'path';

import { BuildingCategory } from '../../_enums/buildingCategory';
import { IBuildingConditions } from '../../_models/buildings/buildingConditions';
import { Cost } from '../../_models/misc/cost';
import { mapRecord } from '../../../_shared/objectUtils';
import { BuildingType } from '../../../_shared/types/buildingType';

const buildingsInfoPath = path.join(__dirname, '..', '..', '..', '..', 'resources', 'building-infos.json');

interface IBuildingInfo {
  readonly category: BuildingCategory;
  readonly conditions: IBuildingConditions;
  readonly costs: Record<string, Cost>;
  readonly maxLevel: number;
  readonly name: string;
  readonly type: number;
}

class BuildingInfoService {
  private buildingInfos: Map<BuildingType, IBuildingInfo> | undefined;

  public getBuildingInfo = (type: BuildingType): IBuildingInfo => {
    const info = this.infos().get(type);

    if (!info) {
      throw new Error(`Building info for type not found: ${BuildingType[type]}`);
    }

    return info;
  };

  private infos = (): Map<BuildingType, IBuildingInfo> => {
    if (!this.buildingInfos) {
      const buildingInfos = new Map();

      const loadedBuildingInfos = JSON.parse(fs.readFileSync(buildingsInfoPath).toString()) as Record<string, IBuildingInfo>;

      Object
        .entries(loadedBuildingInfos)
        .forEach(([key, value]) => {
          //  correct classes
          const buildingInfo: IBuildingInfo = {
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
