import { IResolvers } from '../../_types/graphql';
import { controllerService } from '../../services/controllerService';

export const controllerResolvers: IResolvers = {
  Query: {
    isBotRunning: () => controllerService.get().isRunning(),
  },
  Mutation: {
    startBot: () => {
      controllerService.get().start();
      return true;
    },

    stopBot: () => {
      controllerService.get().stop();
      return true;
    },
  },
};
