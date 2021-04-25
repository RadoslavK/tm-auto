import {
  Dialog,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useMemo,
  useState,
} from 'react';
import { useSubscription } from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { SettingsManagementBotStateQuery } from '../../../_graphql/__generated__/SettingsManagementBotStateQuery.graphql.js';
import type { SettingsManagementBotStateSubscription } from '../../../_graphql/__generated__/SettingsManagementBotStateSubscription.graphql.js';
import type { SettingsManagementQuery } from '../../../_graphql/__generated__/SettingsManagementQuery.graphql.js';
import { useLazyLoadQuery } from '../../../_shared/hooks/useLazyLoadQuery.js';
import { imageLinks } from '../../../utils/imageLinks.js';
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

const botStateSubscription = graphql`
  subscription SettingsManagementBotStateSubscription {
      botStateChanged
  }
`;

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  export: {
    backgroundImage: `url("${imageLinks.misc.export}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '2em',
    width: '2em',
    marginRight: 4,
    cursor: 'pointer',
  },
});

export const SettingsManagement: React.FunctionComponent = () => {
  const classes = useStyles();
  const [isFormShown, setIsFormShown] = useState(false);

  const openForm = () => setIsFormShown(true);
  const closeForm = () => setIsFormShown(false);

  const { botState } = useLazyLoadQuery<SettingsManagementBotStateQuery>(botStateQuery, {}, { fetchPolicy: 'store-and-network' });
  const { generalSettings, accounts, currentAccount } = useLazyLoadQuery<SettingsManagementQuery>(query, {
    includeCurrentAccount: botState === 'Running' || botState === 'Paused',
  }, { fetchPolicy: 'store-and-network' });

  const botStateSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<SettingsManagementBotStateSubscription> => ({
    subscription: botStateSubscription,
    variables: {},
    updater: (store, data) => {
      store.getRoot().setValue(data.botStateChanged, 'botState');
    },
  }), []);

  useSubscription(botStateSubscriptionConfig);

  return (
    <>
      <div className={classes.root}>
        <Tooltip title="Export/Import settings">
          <div
            className={classes.export}
            onClick={openForm}
          />
        </Tooltip>
        <GeneralSettings settingsKey={generalSettings} />
      </div>
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