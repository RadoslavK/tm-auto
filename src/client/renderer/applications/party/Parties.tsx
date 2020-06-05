import React from 'react';

import { TaskType } from '../../_graphql/graphqlHooks';
import { NextVillageTaskExecution } from '../../_shared/components/nextTaskExecution/NextVillageTaskExecution';

export const Parties: React.FunctionComponent = () => (
  <NextVillageTaskExecution task={TaskType.AutoParty} />
);