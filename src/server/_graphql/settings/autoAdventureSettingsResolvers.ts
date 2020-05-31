import { Resolvers } from '../../_types/resolvers.type';
import { accountContext } from '../../accountContext';

const getService = () => accountContext.settingsService.hero.autoAdventure;

export default <Resolvers> {
  Query: {
    autoAdventureSettings: () => getService().get(),
  },

  Mutation: {
    updateAutoAdventureSettings: (_, args) => getService().merge(args.settings),
    resetAutoAdventureSettings: () => getService().reset(),
  },
};