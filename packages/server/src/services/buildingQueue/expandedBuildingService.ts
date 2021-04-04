import { BuildingType } from 'shared/enums/BuildingType.js';

import type { ExpandedBuilding } from '../../_models/buildings/queue/expandedBuilding.js';
import type { QueuedBuilding } from '../../_models/buildings/queue/queuedBuilding.js';
import { AccountContext } from '../../accountContext.js';
import { getActualBuildingBuildTime } from '../../utils/buildTimeUtils.js';
import { buildingInfoService } from '../info/buildingInfoService.js';

export class ExpandedBuildingService {
  public getFor = (qBuilding: QueuedBuilding): ReadonlyArray<ExpandedBuilding> => {
    const accContext = AccountContext.getContext();
    const { speed } = accContext.gameInfo;
    const mbLevels = accContext.buildingQueueService.for(qBuilding.villageId).getMainBuildingLevels();
    let mbLevel = mbLevels.get(qBuilding.id) ?? 0;

    return [...new Array(qBuilding.targetLevel - qBuilding.startingLevel + 1).keys()]
      .map((i): ExpandedBuilding => {
        const level = i + qBuilding.startingLevel;
        const cost = buildingInfoService.getBuildingLevelInfo(qBuilding.type, level).cost;

        const levelBuildingTime = buildingInfoService.getBuildingLevelInfo(qBuilding.type, level).buildingTime;

        const actualBuildTime = getActualBuildingBuildTime(
          levelBuildingTime,
          speed,
          mbLevel,
          qBuilding.type,
        );

        //  increase mbLevel because mbLevels contains info about mb level prior to this queued building with multiple levels
        //  and if this q building is MB with multiple levels we need to update the level prior to each following level
        if (qBuilding.type === BuildingType.MainBuilding) {
          mbLevel++;
        }

        return {
          buildingTime: actualBuildTime,
          cost,
          level,
        };
      });
  };
}