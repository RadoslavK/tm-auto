import React from 'react';

import { NextVillageTaskExecution } from '../../../_shared/components/nextTaskExecution/NextVillageTaskExecution';
import { TaskType } from '../../../../../_shared/types/taskType';

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