import { BuildingCategory } from '../../_enums/buildingCategory';
import { BuildingConditions } from '../../_models/buildings/buildingConditions';
import { Cost } from '../../_models/misc/cost';
import { mapRecord } from '../../../_shared/objectUtils';
import { BuildingType } from '../../../_shared/types/buildingType';
import { Fields } from '../../../_shared/types/fields.type';
import buildingInfos from '../../../../resources/building-infos.json';

type BuildingInfo = {
  readonly category: BuildingCategory;
  readonly conditions: BuildingConditions;
  readonly costs: Record<string, Cost>;
  readonly culturePoints: Record<string, number>;
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
      const infosMap = new Map();

      Object
        .entries(buildingInfos)
        .forEach(([key, value]) => {
          const bInfo: BuildingInfo = value as any;

          const costs = mapRecord(bInfo.costs as Record<string, Fields<Cost>>, c => new Cost(c));

          const buildingInfo: BuildingInfo = {
            ...bInfo,
            costs,
          };

          infosMap.set(+key, buildingInfo);
        });

      this.buildingInfos = infosMap;
    }

    return this.buildingInfos;
  };
}

export const buildingInfoService = new BuildingInfoService();
