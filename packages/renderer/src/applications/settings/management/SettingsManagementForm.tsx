import graphql from 'babel-plugin-relay/macro';
import React, {
  useEffect,
  useState, 
} from 'react';
import {
  useLazyLoadQuery,
  useMutation,
} from 'react-relay/hooks';

import type { SettingsManagementFormBotStateQuery } from '../../../_graphql/__generated__/SettingsManagementFormBotStateQuery.graphql.js';
import type { SettingsManagementFormExportAccountSettingsMutation } from '../../../_graphql/__generated__/SettingsManagementFormExportAccountSettingsMutation.graphql.js';
import type { SettingsManagementFormExportAccountsMutation } from '../../../_graphql/__generated__/SettingsManagementFormExportAccountsMutation.graphql.js';
import type { SettingsManagementFormExportGeneralSettingsMutation } from '../../../_graphql/__generated__/SettingsManagementFormExportGeneralSettingsMutation.graphql.js';
import type { SettingsManagementFormImportAccountSettingsMutation } from '../../../_graphql/__generated__/SettingsManagementFormImportAccountSettingsMutation.graphql.js';
import type { SettingsManagementFormImportAccountsMutation } from '../../../_graphql/__generated__/SettingsManagementFormImportAccountsMutation.graphql.js';
import type { SettingsManagementFormImportGeneralSettingsMutation } from '../../../_graphql/__generated__/SettingsManagementFormImportGeneralSettingsMutation.graphql.js';
import type { SettingsManagementFormQuery } from '../../../_graphql/__generated__/SettingsManagementFormQuery.graphql.js';
import { getServerShortcut } from '../../../utils/getServerShortcut.js';

const settingsManagementFormBotStateQuery = graphql`
  query SettingsManagementFormBotStateQuery {
      botState
  }
`;

const settingsManagementFormQuery = graphql`
  query SettingsManagementFormQuery($includeCurrentAccount: Boolean!) {
      accounts {
          id
          server
          username
      }
      currentAccount @include(if: $includeCurrentAccount) {
          id
          server
          username
      }
  }
`;

const mutations = {
  exportAccountSettings: graphql`
    mutation SettingsManagementFormExportAccountSettingsMutation($accountId: ID!, $path: String!) {
        exportAccountSettings(accountId: $accountId, path: $path)
    }
  `,
  exportGeneralSettings: graphql`
      mutation SettingsManagementFormExportGeneralSettingsMutation($path: String!) {
          exportGeneralSettings(path: $path)
      }
  `,
  exportAccounts: graphql`
    mutation SettingsManagementFormExportAccountsMutation($path: String!) {
        exportAccounts(path: $path)
    }
  `,

  importAccountSettings: graphql`
      mutation SettingsManagementFormImportAccountSettingsMutation($accountId: ID!, $path: String!) {
          importAccountSettings(accountId: $accountId, path: $path)
      }
  `,
  importGeneralSettings: graphql`
      mutation SettingsManagementFormImportGeneralSettingsMutation($path: String!) {
          importGeneralSettings(path: $path)
      }
  `,
  importAccounts: graphql`
      mutation SettingsManagementFormImportAccountsMutation($path: String!) {
          importAccounts(path: $path)
      }
  `,
};

export const SettingsManagementForm: React.FC = () => {
  const { botState } = useLazyLoadQuery<SettingsManagementFormBotStateQuery>(settingsManagementFormBotStateQuery, {});
  const { accounts, currentAccount } = useLazyLoadQuery<SettingsManagementFormQuery>(settingsManagementFormQuery, {
    includeCurrentAccount: botState === 'Running' || botState === 'Paused',
  });

  const [selectedAccountId, setSelectedAccountId] = useState('');

  useEffect(() => {
    if (selectedAccountId) {
      return;
    }

    if (currentAccount) {
      setSelectedAccountId(currentAccount.id);

      return;
    }

    if (accounts.length > 0) {
      setSelectedAccountId(accounts[0].id);

      return;
    }
  }, [currentAccount, accounts, selectedAccountId]);

  const [exportAccountSettings] = useMutation<SettingsManagementFormExportAccountSettingsMutation>(mutations.exportAccountSettings);
  const [exportGeneralSettings] = useMutation<SettingsManagementFormExportGeneralSettingsMutation>(mutations.exportGeneralSettings);
  const [exportAccounts] = useMutation<SettingsManagementFormExportAccountsMutation>(mutations.exportAccounts);

  const [importAccountSettings] = useMutation<SettingsManagementFormImportAccountSettingsMutation>(mutations.importAccountSettings);
  const [importGeneralSettings] = useMutation<SettingsManagementFormImportGeneralSettingsMutation>(mutations.importGeneralSettings);
  const [importAccounts] = useMutation<SettingsManagementFormImportAccountsMutation>(mutations.importAccounts);

  const saveAccountSettings = () => {
    if (!selectedAccountId) {
      return;
    }

    const acc = accounts.find((x) => x.id === selectedAccountId);

    if (!acc) {
      throw new Error(`Account with id ${selectedAccountId} was not loaded`);
    }

    const fileName = window.api.openSaveFileDialog(
      `account-settings-${acc.username}@${getServerShortcut(acc.server)}`,
    );

    if (!fileName) {
      return;
    }

    exportAccountSettings({
      variables: { path: fileName, accountId: selectedAccountId },
    });
  };

  const loadAccountSettings = () => {
    if (!selectedAccountId) {
      return;
    }

    const fileName = window.api.openLoadFileDialog();

    if (!fileName) {
      return;
    }

    importAccountSettings({
      variables: { path: fileName, accountId: selectedAccountId },
    });
  };

  const saveGeneralSettings = () => {
    const fileName = window.api.openSaveFileDialog('general-settings');

    if (!fileName) {
      return;
    }

    exportGeneralSettings({
      variables: { path: fileName },
    });
  };

  const loadGeneralSettings = () => {
    const fileName = window.api.openLoadFileDialog();

    if (!fileName) {
      return;
    }

    importGeneralSettings({ variables: { path: fileName } });
  };

  const saveAccounts = () => {
    const fileName = window.api.openSaveFileDialog('accounts');

    if (!fileName) {
      return;
    }

    exportAccounts({ variables: { path: fileName } });
  };

  const loadAccounts = () => {
    const fileName = window.api.openLoadFileDialog();

    if (!fileName) {
      return;
    }

    importAccounts({
      variables: { path: fileName },
    });
  };

  const changeAccountId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedAccountId(value);
  };

  return (
    <div>
      <label>Account</label>
      <select value={selectedAccountId} onChange={changeAccountId}>
        {accounts.map((account) => (
          <option
            key={account.id}
            value={account.id}
            label={`${account.username} @ ${getServerShortcut(account.server)}`}
          />
        ))}
      </select>
      <button onClick={saveAccountSettings}>Export account settings</button>
      <button onClick={loadAccountSettings}>Import account settings</button>
      <button onClick={saveGeneralSettings}>Export general settings</button>
      <button onClick={loadGeneralSettings}>Import general settings</button>
      <button onClick={saveAccounts}>Export accounts</button>
      <button onClick={loadAccounts}>Import accounts</button>
    </div>
  );
};
