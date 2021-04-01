import React from 'react';

import { AutoAdventureSettings } from '../../settings/hero/AutoAdventureSettings.js';
import { HeroLevelUpSettings } from '../../settings/hero/HeroLevelUpSettings.js';
import { HeroInformation } from './HeroInformation.js';

export const Hero: React.FC = () => (
  <div>
    <h1>Hero settings</h1>
    <HeroInformation />
    <AutoAdventureSettings />
    <HeroLevelUpSettings />
  </div>
);

Hero.displayName = 'Hero';