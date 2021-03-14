import buildingInfos from '../../../../../resources/building-infos.json';
import { BuildingType } from '../../../../_shared/enums/BuildingType';
import { BuildingCategory } from '../../_enums/buildingCategory';
import { BuildingConditions } from '../../_models/buildings/buildingConditions';
import { Duration } from '../../_models/duration';
import { Resources } from '../../_models/misc/resources';

export type BuildingLevelInfo = {
  readonly buildingTime: Duration;
  readonly cost: Resources;
  readonly culturePoints: number;
};

const emptyLevelInfo: BuildingLevelInfo = {
  buildingTime: new Duration(),
  cost: new Resources(),
  culturePoints: 0,
};

export type BuildingInfo = {
  readonly category: BuildingCategory;
  readonly conditions: BuildingConditions;
  readonly levelInfos: Map<number, BuildingLevelInfo>;
  readonly maxLevel: number;
  readonly name: string;
  readonly type: number;
};

class BuildingInfoService {
  private buildingInfos: Map<BuildingType, BuildingInfo> | undefined;

  public getBuildingInfo = (type: BuildingType): BuildingInfo => {
    const info = this.infos().get(type);

    if (!info) {
      throw new Error(
        `Building info for type not found: ${BuildingType[type] || type}`,
      );
    }

    return info;
  };

  public getBuildingLevelInfo = (
    type: BuildingType,
    level: number,
  ): BuildingLevelInfo => {
    if (level === 0) {
      return emptyLevelInfo;
    }

    const info = this.getBuildingInfo(type);

    const forLevel = info.levelInfos.get(level);

    if (!forLevel) {
      throw new Error(
        `Building ${BuildingType[type] || type} does not have level ${level}`,
      );
    }

    return forLevel;
  };

  private infos = (): Map<BuildingType, BuildingInfo> => {
    if (!this.buildingInfos) {
      const infosMap = new Map();

      Object.entries(buildingInfos).forEach(([type, info]) => {
        const levelInfos = Object.entries(info.levelInfos).reduce(
          (reduced, [level, levelInfo]) => {
            reduced.set(+level, {
              buildingTime: new Duration(levelInfo.buildingTime),
              cost: new Resources(levelInfo.cost),
              culturePoints: levelInfo.culturePoints,
            });

            return reduced;
          },
          new Map<number, BuildingLevelInfo>(),
        );

        const buildingInfo: BuildingInfo = {
          ...info,
          levelInfos,
        };

        infosMap.set(+type, buildingInfo);
      });

      this.buildingInfos = infosMap;
    }

    return this.buildingInfos;
  };
}

export const buildingInfoService = new BuildingInfoService();
