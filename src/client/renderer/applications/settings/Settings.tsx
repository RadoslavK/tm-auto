import React from 'react';

import { AutoMentorSettings } from './AutoMentorSettings';
import { GeneralSettings } from './GeneralSettings';

export const Settings: React.FunctionComponent = () => (
  <>
    <GeneralSettings />
    <AutoMentorSettings />
  </>
);