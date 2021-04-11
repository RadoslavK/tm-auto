import { Dialog } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useState } from 'react';

import type { SettingsManagementBotStateQuery } from '../../../_graphql/__generated__/SettingsManagementBotStateQuery.graphql.js';
import type { SettingsManagementQuery } from '../../../_graphql/__generated__/SettingsManagementQuery.graphql.js';
import { useLazyLoadQuery } from '../../../_shared/hooks/useLazyLoadQuery.js';
import { GeneralSettings } from '../GeneralSettings.js';
import { SettingsManagementForm } from './SettingsManagementForm.js';

const botStateQuery = graphql`
    query SettingsManagementBotStateQuery {
        botState
    }
`;

const query = graphql`
    query SettingsManagementQuery($includeCurrentAccount: Boolean!) {
        generalSettings {
            ...GeneralSettingsForm_generalSettings
        }
        accounts {
            ...SettingsManagementForm_userAccounts
        }
        currentAccount @include(if: $includeCurrentAccount) {
            ...SettingsManagementForm_currentAccount
        }
    }
`;

export const SettingsManagement: React.FunctionComponent = () => {
  const [isFormShown, setIsFormShown] = useState(false);

  const openForm = () => setIsFormShown(true);
  const closeForm = () => setIsFormShown(false);

  const { botState } = useLazyLoadQuery<SettingsManagementBotStateQuery>(botStateQuery, {}, { fetchPolicy: 'store-and-network' });
  const { generalSettings, accounts, currentAccount } = useLazyLoadQuery<SettingsManagementQuery>(query, {
    includeCurrentAccount: botState === 'Running' || botState === 'Paused',
  }, { fetchPolicy: 'store-and-network' });

  return (
    <>
      <GeneralSettings settingsKey={generalSettings} />
      <button onClick={openForm}>Export/Import settings</button>
      <Dialog onClose={closeForm} open={isFormShown}>
        <SettingsManagementForm
          accountsKey={accounts}
          currentAccountKey={currentAccount || null}
        />
      </Dialog>
    </>
  );
};

SettingsManagement.displayName = 'SettingsManagement';