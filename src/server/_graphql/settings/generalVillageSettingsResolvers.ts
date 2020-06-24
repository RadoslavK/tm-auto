import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';

const getService = (villageId: string) =>
  getAccountContext().settingsService.village(villageId).general;

export default <Resolvers>{
  Query: {
    generalVillageSettings: (_, args) => getService(args.villageId).get(),
  },

  Mutation: {
    updateGeneralVillageSettings: (_, args) =>
      getService(args.villageId).merge(args.settings),
    resetGeneralVillageSettings: (_, args) =>
      getService(args.villageId).reset(),
  },

  Subscription: {
    generalVillageSettingsUpdated: subscribeToEvent(
      BotEvent.GeneralVillageSettingsUpdated,
      {
        filter: (p, args) => p.villageId === args.villageId,
        resolve: (p) => p.settings,
      },
    ),
  },
};
