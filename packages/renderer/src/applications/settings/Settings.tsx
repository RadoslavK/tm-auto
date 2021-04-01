import React from 'react';

import { AccountSettings } from './AccountSettings.js';
import { AutoMentorSettings } from './AutoMentorSettings.js';

export const Settings: React.FunctionComponent = () => (
  <>
    <AccountSettings />
    <AutoMentorSettings />
  </>
);

Settings.displayName = 'Settings';