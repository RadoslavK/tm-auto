import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useRecoilValue } from 'recoil';

import type { VillageTasksActivityQuery } from '../../../_graphql/__generated__/VillageTasksActivityQuery.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { NextVillageTaskExecution } from '../../../_shared/components/nextTaskExecution/NextVillageTaskExecution.js';
import { useLazyLoadQuery } from '../../../_shared/hooks/useLazyLoadQuery.js';

const query = graphql`
  query VillageTasksActivityQuery($villageId: ID!) {
      nextVillageTaskExecutions(villageId: $villageId) {
          label
          task
          timestamp {
              ...NextVillageTaskExecution_timestamp
          }
      }
  }
`;

export const VillageTasksActivity: React.FC = () => {
  const villageId = useRecoilValue(selectedVillageIdState);
  const { nextVillageTaskExecutions } = useLazyLoadQuery<VillageTasksActivityQuery>(query, { villageId });

  return (
    <div>
      {nextVillageTaskExecutions.map(r => (
        <React.Fragment key={r.task}>
          <h2>{r.label}</h2>
          <NextVillageTaskExecution
            task={r.task}
            timestamp={r.timestamp}
          />
        </React.Fragment>
      ))}
    </div>
  );
};

VillageTasksActivity.displayName = 'VillageTasksActivity';