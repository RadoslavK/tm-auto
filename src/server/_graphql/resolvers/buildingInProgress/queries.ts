import { Resolvers } from '../../_types';
import { accountContext } from '../../../accountContext';
import { mapBuildingInProgress } from '../../mappers/mapBuildingInProgress';

export default <Resolvers> {
  Query: {
    buildingsInProgress: (_, args) => accountContext.villageService.village(args.villageId).buildings.ongoing.buildings().map(x => mapBuildingInProgress(x)),
  },
};