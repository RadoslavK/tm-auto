import React from 'react';

import { AutoAdventureSettings } from '../../settings/hero/AutoAdventureSettings';
import { HeroLevelUpSettings } from '../../settings/hero/HeroLevelUpSettings';
import { HeroInformation } from './HeroInformation';

export const Hero: React.FC = () => (
  <div>
    <h1>Hero settings</h1>
    <HeroInformation />
    <AutoAdventureSettings />
    <HeroLevelUpSettings />
  </div>
);
