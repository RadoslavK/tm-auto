import { mutationField } from 'nexus';
import { settingsManagementService } from '../../../services/settingsManagementService';

export const ExportAccountSettingsMutation = mutationField(t => {
  t.nullable.boolean('exportAccountSettings', {
    args: {
      accountId: 'ID',
      path: 'String',
    },
    resolve(_, { accountId, path }) {
      settingsManagementService.exportAccountSettings(accountId, path);

      return null;
    },
  });
});

export const ExportGeneralSettingsMutation = mutationField(t => {
  t.nullable.boolean('exportGeneralSettings', {
    args: {
      path: 'String',
    },
    resolve(_, { path }) {
      settingsManagementService.exportGeneralSettings(path);

      return null;
    },
  });
});

export const ExportAccountsMutation = mutationField(t => {
  t.nullable.boolean('exportAccounts', {
    args: {
      path: 'String',
    },
    resolve(_, { path }) {
      settingsManagementService.exportAccounts(path);

      return null;
    },
  });
});

export const ImportAccountSettingsMutation = mutationField(t => {
  t.nullable.boolean('importAccountSettings', {
    args: {
      accountId: 'ID',
      path: 'String',
    },
    resolve(_, { accountId, path }) {
      settingsManagementService.importAccountSettings(accountId, path);

      return null;
    },
  });
});

export const ImportGeneralSettingsMutation = mutationField(t => {
  t.nullable.boolean('importGeneralSettings', {
    args: {
      path: 'String',
    },
    resolve(_, { path }) {
      settingsManagementService.importGeneralSettings(path);

      return null;
    },
  });
});

export const ImportAccountsMutation = mutationField(t => {
  t.nullable.boolean('importAccounts', {
    args: {
      path: 'String',
    },
    resolve(_, { path }) {
      settingsManagementService.importAccounts(path);

      return null;
    },
  });
});