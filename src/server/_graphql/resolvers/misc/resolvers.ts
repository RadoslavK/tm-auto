import { Resolvers } from '../../_types';

export default <Resolvers> {
  Resources: {
    total: res => res.getTotal(),
  },
};