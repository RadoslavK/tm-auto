import React, { useEffect, useState } from 'react';

import {
  BotState,
  useExportAccountSettingsMutation,
  useExportAccountsMutation,
  useExportGeneralSettingsMutation,
  useGetCurrentAccountLazyQuery,
  useImportAccountSettingsMutation,
  useImportAccountsMutation,
  useImportGeneralSettingsMutation,
} from '../../../_graphql/graphqlHooks';
import { useBotState } from '../../../hooks/useBotState';
import { getServerShortcut } from '../../../utils/getServerShortcut';
import { useAccounts } from '../../signIn/components/Accounts';

export const SettingsManagementForm: React.FC = () => {
  const botState = useBotState();
  const accounts = useAccounts();
  const [
    getCurrentAccount,
    { data: accountData, loading: accountLoading },
  ] = useGetCurrentAccountLazyQuery();

  useEffect(() => {
    if (botState === BotState.Running || botState === BotState.Paused) {
      getCurrentAccount();
    }
  }, [botState, getCurrentAccount]);

  const [selectedAccountId, setSelectedAccountId] = useState('');

  useEffect(() => {
    if (selectedAccountId || accountLoading) {
      return;
    }

    if (accountData) {
      setSelectedAccountId(accountData.currentAccount.id);

      return;
    }

    if (accounts.length > 0) {
      setSelectedAccountId(accounts[0].id);

      return;
    }
  }, [accountData, accountLoading, accounts, selectedAccountId]);

  const [exportAccountSettings] = useExportAccountSettingsMutation();
  const [exportGeneralSettings] = useExportGeneralSettingsMutation();
  const [exportAccounts] = useExportAccountsMutation();

  const [importAccountSettings] = useImportAccountSettingsMutation();
  const [importGeneralSettings] = useImportGeneralSettingsMutation();
  const [importAccounts] = useImportAccountsMutation();

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
