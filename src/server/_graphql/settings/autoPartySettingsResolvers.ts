import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';

const getService = (villageId: string) =>
  getAccountContext().settingsService.village(villageId).autoParty;

export default <Resolvers>{
  Query: {
    autoPartySettings: (_, args) => getService(args.villageId).get(),
  },

  Mutation: {
    updateAutoPartySettings: (_, args) =>
      getService(args.villageId).merge(args.settings),
    resetAutoPartySettings: (_, args) => getService(args.villageId).reset(),
  },

  Subscription: {
    autoPartySettingsUpdated: subscribeToEvent(
      BotEvent.AutoPartySettingsUpdated,
      {
        filter: (p, args) => p.villageId === args.villageId,
        resolve: (p) => p.settings,
      },
    ),
  },
};
