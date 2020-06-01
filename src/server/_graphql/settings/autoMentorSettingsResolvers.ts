import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';

const getService = () => getAccountContext().settingsService.autoMentor;

export default <Resolvers> {
  Query: {
    autoMentorSettings: () => getService().get(),
  },

  Mutation: {
    updateAutoMentorSettings: (_, args) => getService().merge(args.settings),
    resetAutoMentorSettings: () => getService().reset(),
  },
};