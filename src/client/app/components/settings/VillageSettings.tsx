import React from 'react';
import { AutoBuildSettings } from './village/AutoBuildSettings';
import { GeneralVillageSettings } from './village/GeneralVillageSettings';
import { AutoUnitsSettings } from './village/AutoUnitsSettings';

export const VillageSettings: React.FC = () => {
  return (
    <div>
      <div>
        <h1>Village settings</h1>
        <GeneralVillageSettings />
        <AutoBuildSettings />
        <AutoUnitsSettings />
      </div>
    </div>
  );
};