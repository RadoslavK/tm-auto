import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';

const getService = (villageId: string) =>
  getAccountContext().settingsService.village(villageId).autoBuild;

export default <Resolvers>{
  Query: {
    autoBuildSettings: (_, args) => getService(args.villageId).get(),
  },

  Mutation: {
    updateAutoBuildSettings: (_, args) =>
      getService(args.villageId).merge(args.settings),
    resetAutoBuildSettings: (_, args) => getService(args.villageId).reset(),
  },

  Subscription: {
    autoBuildSettingsUpdated: subscribeToEvent(
      BotEvent.AutoBuildSettingsUpdated,
      {
        filter: (p, args) => p.villageId === args.villageId,
        resolve: (p) => p.settings,
      },
    ),
  },
};
