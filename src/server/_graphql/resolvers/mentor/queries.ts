import { Resolvers } from '../../_types';
import { accountContext } from '../../../accountContext';

export default <Resolvers> {
  Query: {
    mentorTasks: () => accountContext.mentorTasks,
  },
};