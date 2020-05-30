import { Resolvers } from '../../_types';
import { BotEvent } from '../../../events/botEvent';
import { subscribeToEvent } from '../../pubSub';

export default <Resolvers> {
  Subscription: {
    onMentorTasksUpdated: subscribeToEvent(BotEvent.MentorTasksUpdated, {
      resolve: payload => payload.tasks,
    }),
  },
};