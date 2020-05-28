import { Resolvers } from '../../_types';
import { controllerService } from '../../../services/controllerService';

export default <Resolvers>{
  Mutation: {
    signIn: (_, args) => {
      controllerService.signIn(args);
      return true;
    },

    signOut: () => {
      controllerService.signOut();
      return true;
    },

    startBot: () => {
      controllerService.start();
      return true;
    },

    stopBot: () => {
      controllerService.stop();
      return true;
    },
  },
};