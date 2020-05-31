import { Resolvers } from '../../_types/resolvers.type';
import { accountContext } from '../../accountContext';

const getService = () => accountContext.settingsService.autoMentor;

export default <Resolvers> {
  Query: {
    autoMentorSettings: () => getService().get(),
  },

  Mutation: {
    updateAutoMentorSettings: (_, args) => getService().merge(args.settings),
    resetAutoMentorSettings: () => getService().reset(),
  },
};