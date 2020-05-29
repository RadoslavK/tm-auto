import { Resolvers } from '../../_types';
import { accountContext } from '../../../accountContext';

export default <Resolvers> {
  Query: {
    buildingsInProgress: (_, args) => accountContext.villageService.village(args.villageId).buildings.ongoing.buildings(),
  },
};