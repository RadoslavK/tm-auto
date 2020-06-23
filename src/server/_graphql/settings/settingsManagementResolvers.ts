import { Resolvers } from '../../_types/resolvers.type';
import { settingsManagementService } from '../../services/settingsManagementService';

export default <Resolvers>{
  Mutation: {
    exportSettings: (_, { path }) => settingsManagementService.export(path),
    importSettings: (_, { path }) => settingsManagementService.import(path),
  },
};
