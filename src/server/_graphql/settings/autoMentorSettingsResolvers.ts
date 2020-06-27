import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';
import { completeTaskIds } from '../../constants/completeTaskIds';
import { BotEvent } from '../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';

const getService = () => getAccountContext().settingsService.autoMentor;

export default <Resolvers>{
  CompleteTasksSettings: {
    taskIds: () => completeTaskIds,
  },
  Query: {
    autoMentorSettings: () => getService().get(),
  },

  Mutation: {
    updateAutoMentorSettings: (_, args) => getService().merge(args.settings),
    resetAutoMentorSettings: () => getService().reset(),
  },

  Subscription: {
    autoMentorSettingsUpdated: subscribeToEvent(
      BotEvent.AutoMentorSettingsUpdated,
      {
        resolve: (p) => p.settings,
      },
    ),
  },
};
