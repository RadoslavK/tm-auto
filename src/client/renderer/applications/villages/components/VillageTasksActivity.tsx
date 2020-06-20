import React from 'react';

import { TaskType } from '../../../_graphql/graphqlHooks';
import { NextVillageTaskExecution } from '../../../_shared/components/nextTaskExecution/NextVillageTaskExecution';

export const VillageTasksActivity: React.FunctionComponent = () => (
  <div>
    <h2>
      AutoBuild
    </h2>
    <NextVillageTaskExecution task={TaskType.AutoBuild} />
    <h2>
      AutoUnits
    </h2>
    <NextVillageTaskExecution task={TaskType.AutoUnits} />
    <h2>
      AutoParty
    </h2>
    <NextVillageTaskExecution task={TaskType.AutoParty} />
  </div>
);