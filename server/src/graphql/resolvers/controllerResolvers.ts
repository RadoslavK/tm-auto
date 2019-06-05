import { IResolvers } from '../../_types/graphql';
import { Controller } from '../../controller';

const controller: Controller = new Controller();
let isRunning: boolean = false;

export const controllerResolvers: IResolvers = {
  Query: {
    isBotRunning: () => isRunning,
  },
  Mutation: {
    startBot: () => {
      controller.start();
      isRunning = true;
      return true;
    },

    stopBot: () => {
      controller.stop();
      isRunning = false;
      return true;
    },
  },
};
