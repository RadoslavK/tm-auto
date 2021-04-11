import graphql from 'babel-plugin-relay/macro';
import React from 'react';

import type { SettingsQuery } from '../../_graphql/__generated__/SettingsQuery.graphql.js';
import { useLazyLoadQuery } from '../../_shared/hooks/useLazyLoadQuery.js';
import { AccountSettings } from './AccountSettings.js';
import { AutoMentorSettings } from './AutoMentorSettings.js';

const query = graphql`
  query SettingsQuery {
      accountSettings {
          ...AccountSettings_accountSettings
      }
      autoMentorSettings {
          ...AutoMentorSettings_autoMentorSettings
      }
  }
`;

export const Settings: React.FunctionComponent = () => {
  const { accountSettings, autoMentorSettings } = useLazyLoadQuery<SettingsQuery>(query, {}, { fetchPolicy: 'store-and-network' });

  return (
    <>
      <AccountSettings settingsKey={accountSettings}/>
      <AutoMentorSettings settingsKey={autoMentorSettings}/>
    </>
  );
};

Settings.displayName = 'Settings';