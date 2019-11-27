import { accountContext } from '../../accountContext';
import { Resolvers } from './_types';

export const playerResolvers: Resolvers = {
  Query: {
    gameInfo: () => accountContext.gameInfo,
  },
};