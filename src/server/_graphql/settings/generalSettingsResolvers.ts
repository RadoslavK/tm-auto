import { Resolvers } from '../../_types/resolvers.type';
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
};
