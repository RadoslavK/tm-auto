import { IResolvers } from '../../_types/graphql';

export const controllerResolvers: IResolvers = {
  Query: {
    isBotRunning: (_,__,_context) => _context.controllerService.isRunning,
  },
  Mutation: {
    startBot: (_, __, context) => {
      context.controllerService.start();
      return true;
    },

    stopBot: (_, __, context) => {
      context.controllerService.stop();
      return true;
    },
  },
};
