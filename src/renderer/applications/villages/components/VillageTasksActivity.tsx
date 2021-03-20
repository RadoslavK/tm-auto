import React from 'react';

import { NextVillageTaskExecution } from '../../../_shared/components/nextTaskExecution/NextVillageTaskExecution.js';

export const VillageTasksActivity: React.FunctionComponent = () => (
  <div>
    <h2>AutoBuild</h2>
    <NextVillageTaskExecution task="AutoBuild" />
    <h2>AutoUnits</h2>
    <NextVillageTaskExecution task="AutoUnits" />
    <h2>AutoParty</h2>
    <NextVillageTaskExecution task="AutoParty" />
  </div>
);
