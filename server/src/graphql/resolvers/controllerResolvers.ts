import { IResolvers } from '../../_types/graphql';
import { context } from '../context';

export const controllerResolvers: IResolvers = {
  Query: {
    isBotRunning: () => context.controller.isRunning(),
  },
  Mutation: {
    startBot: (_, __, context) => {
      context.controller.start();
      return true;
    },

    stopBot: (_, __, context) => {
      context.controller.stop();
      return true;
    },
  },
};
