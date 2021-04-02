import React from 'react';

import { NextVillageTaskExecution } from '../../_shared/components/nextTaskExecution/NextVillageTaskExecution.js';

export const Parties: React.FC = () => {
  return (
    <NextVillageTaskExecution task="AutoParty" />
  );
};

Parties.displayName = 'Parties';