import { Resolvers } from '../../_types';
import { accountContext } from '../../../accountContext';

export default <Resolvers> {
  Query: {
    heroInformation: () => accountContext.hero,
  },
};