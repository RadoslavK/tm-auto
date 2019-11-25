import { Resolvers } from './_types';
import { accountContext } from '../../accountContext';

export const playerResolvers: Resolvers = {
  Query: {
    playerInfo: () => {
      return {
        tribe: accountContext.gameInfo.tribe,
      };
    },
  },
};