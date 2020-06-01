import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';

const getService = () => getAccountContext().settingsService.hero.autoAdventure;

export default <Resolvers> {
  Query: {
    autoAdventureSettings: () => getService().get(),
  },

  Mutation: {
    updateAutoAdventureSettings: (_, args) => getService().merge(args.settings),
    resetAutoAdventureSettings: () => getService().reset(),
  },
};