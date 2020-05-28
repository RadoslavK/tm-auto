import { Resolvers } from '../../_types';
import { controllerService } from '../../../services/controllerService';

export default <Resolvers>{
  Query: {
    botState: () => controllerService.state(),
  },
};