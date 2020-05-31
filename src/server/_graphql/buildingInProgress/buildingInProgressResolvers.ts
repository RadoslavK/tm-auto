import { Resolvers } from '../../_types/resolvers.type';
import { accountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';
import { buildingInfoService } from '../../services/info/buildingInfoService';

export default <Resolvers> {
  BuildingInProgress: {
    finishedAt: b => ({
      totalSeconds: Math.floor(b.finishedAt.valueOf() / 1000),
    }),
    name: b => buildingInfoService.getBuildingInfo(b.type).name,
  },

  Query: {
    buildingsInProgress: (_, args) => accountContext.villageService.village(args.villageId).buildings.ongoing.buildings(),
  },

  Subscription: {
    buildingsInProgressUpdated: subscribeToEvent(BotEvent.BuildingsInProgressUpdated, {
      filter: (payload, args) => payload.villageId === args.villageId,
      resolve: p => accountContext.villageService.village(p.villageId).buildings.ongoing.buildings(),
    }),
  },
};