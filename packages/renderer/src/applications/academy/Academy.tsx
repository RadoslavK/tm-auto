import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import {
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay/hooks';

import type { AcademyQuery } from '../../_graphql/__generated__/AcademyQuery.graphql.js';
import { NextVillageTaskExecution } from '../../_shared/components/nextTaskExecution/NextVillageTaskExecution.js';

const query = graphql`
    query AcademyQuery($villageId: ID!) {
        nextVillageTaskExecution(task: AutoAcademy, villageId: $villageId) {
            ...NextVillageTaskExecution_timestamp
        }
    }
`;

export const useAcademyQuery = () => {
  const [academyQueryRef, loadAcademyQuery] = useQueryLoader<AcademyQuery>(query);

  const reloadAcademyQuery = useCallback((villageId: string) => {
    loadAcademyQuery({ villageId }, { fetchPolicy: 'store-and-network' });
  }, [loadAcademyQuery]);

  return { academyQueryRef, reloadAcademyQuery };
};

type Props = {
  readonly queryRef: PreloadedQuery<AcademyQuery>;
};

export const Academy: React.FC<Props> = ({ queryRef }) => {
  const { nextVillageTaskExecution } = usePreloadedQuery(query, queryRef);

  return (
    <NextVillageTaskExecution
      task="AutoSmithy"
      timestamp={nextVillageTaskExecution}
    />
  );
};

Academy.displayName = 'Academy';