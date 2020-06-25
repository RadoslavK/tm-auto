import { Resolvers } from '../../_types/resolvers.type';
import { settingsManagementService } from '../../services/settingsManagementService';

export default <Resolvers>{
  Mutation: {
    exportAccountSettings: (_, { accountId, path }) =>
      settingsManagementService.exportAccountSettings(accountId, path),
    exportGeneralSettings: (_, { path }) =>
      settingsManagementService.exportGeneralSettings(path),
    exportAccounts: (_, { path }) =>
      settingsManagementService.exportAccounts(path),
    importAccountSettings: (_, { accountId, path }) =>
      settingsManagementService.importAccountSettings(accountId, path),
    importGeneralSettings: (_, { path }) =>
      settingsManagementService.importGeneralSettings(path),
    importAccounts: (_, { path }) =>
      settingsManagementService.importAccounts(path),
  },
};
