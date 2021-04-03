import { mutationField } from 'nexus';

export const ExportAccountSettingsMutation = mutationField(t => {
  t.nullable.boolean('exportAccountSettings', {
    args: {
      accountId: 'ID',
      path: 'String',
    },
    resolve(_, { accountId, path }, ctx) {
      ctx.settingsManagementService.exportAccountSettings(accountId, path);

      return null;
    },
  });
});

export const ExportGeneralSettingsMutation = mutationField(t => {
  t.nullable.boolean('exportGeneralSettings', {
    args: {
      path: 'String',
    },
    resolve(_, { path }, ctx) {
      ctx.settingsManagementService.exportGeneralSettings(path);

      return null;
    },
  });
});

export const ExportAccountsMutation = mutationField(t => {
  t.nullable.boolean('exportAccounts', {
    args: {
      path: 'String',
    },
    resolve(_, { path }, ctx) {
      ctx.settingsManagementService.exportAccounts(path);

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
    resolve(_, { accountId, path }, ctx) {
      ctx.settingsManagementService.importAccountSettings(accountId, path);

      return null;
    },
  });
});

export const ImportGeneralSettingsMutation = mutationField(t => {
  t.nullable.boolean('importGeneralSettings', {
    args: {
      path: 'String',
    },
    resolve(_, { path }, ctx) {
      ctx.settingsManagementService.importGeneralSettings(path);

      return null;
    },
  });
});

export const ImportAccountsMutation = mutationField(t => {
  t.nullable.boolean('importAccounts', {
    args: {
      path: 'String',
    },
    resolve(_, { path }, ctx) {
      ctx.settingsManagementService.importAccounts(path);

      return null;
    },
  });
});