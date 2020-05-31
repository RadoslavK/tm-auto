import React from 'react';

import { HeroInformation } from '../../hero/components/HeroInformation';
import { AutoAdventureSettings } from './AutoAdventureSettings';

export const HeroSettings: React.FC = () => (
  <div>
    <h1>Hero settings</h1>
    <HeroInformation />
    <AutoAdventureSettings />
  </div>
);
