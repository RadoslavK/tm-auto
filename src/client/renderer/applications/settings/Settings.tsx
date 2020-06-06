import React from 'react';

import { AccountSettings } from './AccountSettings';
import { AutoMentorSettings } from './AutoMentorSettings';

export const Settings: React.FunctionComponent = () => (
  <>
    <AccountSettings />
    <AutoMentorSettings />
  </>
);