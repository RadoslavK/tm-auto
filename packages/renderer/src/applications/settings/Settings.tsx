import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  PreloadedQuery,
  usePreloadedQuery,
} from 'react-relay/hooks';

import type { SettingsQuery } from '../../_graphql/__generated__/SettingsQuery.graphql.js';
import { AccountSettings } from './AccountSettings.js';
import { AutoMentorSettings } from './AutoMentorSettings.js';

export const settingsQuery = graphql`
  query SettingsQuery {
      accountSettings {
          ...AccountSettings_accountSettings
      }
      autoMentorSettings {
          ...AutoMentorSettings_autoMentorSettings
      }
  }
`;

type Props = {
  readonly queryRef: PreloadedQuery<SettingsQuery>;
};

export const Settings: React.FC<Props> = ({ queryRef }) => {
  const { accountSettings, autoMentorSettings } = usePreloadedQuery(settingsQuery, queryRef);

  return (
    <>
      <AccountSettings settingsKey={accountSettings}/>
      <AutoMentorSettings settingsKey={autoMentorSettings}/>
    </>
  );
};

Settings.displayName = 'Settings';