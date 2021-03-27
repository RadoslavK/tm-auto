import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';

import type { VillageTasksActivityQuery } from '../../../_graphql/__generated__/VillageTasksActivityQuery.graphql.js';
import { NextVillageTaskExecution } from '../../../_shared/components/nextTaskExecution/NextVillageTaskExecution.js';

const villageTasksActivityQuery = graphql`
    query VillageTasksActivityQuery {
        ... on Query { __typename }
        selectedVillageId
    }
`;

export const VillageTasksActivity: React.FC = () => {
  const { selectedVillageId: villageId } = useLazyLoadQuery<VillageTasksActivityQuery>(villageTasksActivityQuery, {});

  return (
    <div>
      <h2>AutoBuild</h2>
      <NextVillageTaskExecution
        task="AutoBuild"
        villageId={villageId}
      />
      <h2>AutoUnits</h2>
      <NextVillageTaskExecution
        task="AutoUnits"
        villageId={villageId}
      />
      <h2>AutoParty</h2>
      <NextVillageTaskExecution
        task="AutoParty"
        villageId={villageId}
      />
    </div>
  );
};
