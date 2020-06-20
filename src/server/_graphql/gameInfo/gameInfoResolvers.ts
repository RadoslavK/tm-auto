import { Resolvers } from '../../_types/resolvers.type';
import { getAccountContext } from '../../accountContext';

export default <Resolvers>{
  Query: {
    gameInfo: () => getAccountContext().gameInfo,
  },
};
