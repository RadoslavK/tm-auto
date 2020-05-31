import { Resolvers } from '../../_types/resolvers.type';

export default <Resolvers> {
  Resources: {
    total: res => res.getTotal(),
  },
};