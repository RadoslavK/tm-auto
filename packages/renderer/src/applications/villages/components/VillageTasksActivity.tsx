import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import {
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay/hooks';

import type { VillageTasksActivityQuery } from '../../../_graphql/__generated__/VillageTasksActivityQuery.graphql.js';
import { NextVillageTaskExecution } from '../../../_shared/components/nextTaskExecution/NextVillageTaskExecution.js';

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

export const useVillageTasksActivityQuery = () => {
  const [villageTasksActivityQueryRef, loadVillageTasksActivityQuery] = useQueryLoader<VillageTasksActivityQuery>(query);

  const reloadVillageTasksActivityQuery = useCallback((villageId: string) => {
    loadVillageTasksActivityQuery({ villageId }, { fetchPolicy: 'store-and-network' } );
  }, [loadVillageTasksActivityQuery]);

  return {
    villageTasksActivityQueryRef,
    reloadVillageTasksActivityQuery,
  };
};

type Props = {
  readonly queryRef: PreloadedQuery<VillageTasksActivityQuery>;
};

export const VillageTasksActivity: React.FC<Props> = ({ queryRef }) => {
  const { nextVillageTaskExecutions } = usePreloadedQuery(query, queryRef);

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