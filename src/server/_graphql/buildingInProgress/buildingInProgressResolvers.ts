import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';

export default <Resolvers> {
  BuildingInProgress: {
    finishedAt: b => ({
      totalSeconds: Math.floor(b.finishedAt.valueOf() / 1000),
    }),
  },

  Query: {
    buildingsInProgress: (_, args) => getAccountContext().villageService.village(args.villageId).buildings.ongoing.buildings(),
  },

  Subscription: {
    buildingsInProgressUpdated: subscribeToEvent(BotEvent.BuildingsInProgressUpdated, {
      filter: (payload, args) => payload.villageId === args.villageId,
      resolve: p => getAccountContext().villageService.village(p.villageId).buildings.ongoing.buildings(),
    }),
  },
};