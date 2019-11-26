import { Resolvers } from './_types';
import { accountContext } from '../../accountContext';

export const playerResolvers: Resolvers = {
  Query: {
    gameInfo: () => accountContext.gameInfo,
  },
};