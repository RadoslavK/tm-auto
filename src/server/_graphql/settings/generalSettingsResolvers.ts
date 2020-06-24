import { Resolvers } from '../../_types/resolvers.type';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';
import { getGeneralSettingsService } from '../../services/settings/general';

export default <Resolvers>{
  Query: {
    generalSettings: () => getGeneralSettingsService().get(),
  },

  Mutation: {
    updateGeneralSettings: (_, { settings }) =>
      getGeneralSettingsService().merge({
        ...settings,
        chromePath: settings.chromePath || undefined,
      }),
    resetGeneralSettings: () => getGeneralSettingsService().reset(),
  },

  Subscription: {
    generalSettingsUpdated: subscribeToEvent(BotEvent.GeneralSettingsUpdated, {
      resolve: (p) => p.settings,
    }),
  },
};
