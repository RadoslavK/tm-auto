import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';

export default <Resolvers>{
  Query: {
    accountSettings: () => getAccountContext().settingsService.account.get(),
  },

  Mutation: {
    updateAccountSettings: (_, args) =>
      getAccountContext().settingsService.account.merge(args.settings),
    resetAccountSettings: () =>
      getAccountContext().settingsService.account.reset(),
  },

  Subscription: {
    accountSettingsUpdated: subscribeToEvent(BotEvent.AccountSettingsUpdated, {
      resolve: (p) => p.settings,
    }),
  },
};
