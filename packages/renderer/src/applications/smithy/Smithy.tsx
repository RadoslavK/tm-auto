import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import {
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay/hooks';

import type { SmithyQuery } from '../../_graphql/__generated__/SmithyQuery.graphql.js';
import { NextVillageTaskExecution } from '../../_shared/components/nextTaskExecution/NextVillageTaskExecution.js';

const query = graphql`
    query SmithyQuery($villageId: ID!) {
        nextVillageTaskExecution(task: AutoSmithy, villageId: $villageId) {
            ...NextVillageTaskExecution_timestamp
        }
    }
`;

export const useSmithyQuery = () => {
  const [smithyQueryRef, loadSmithyQuery] = useQueryLoader<SmithyQuery>(query);

  const reloadSmithyQuery = useCallback((villageId: string) => {
    loadSmithyQuery({ villageId }, { fetchPolicy: 'store-and-network' });
  }, [loadSmithyQuery]);

  return { smithyQueryRef, reloadSmithyQuery };
};

type Props = {
  readonly queryRef: PreloadedQuery<SmithyQuery>;
};

export const Smithy: React.FC<Props> = ({ queryRef }) => {
  const { nextVillageTaskExecution } = usePreloadedQuery(query, queryRef);

  return (
    <NextVillageTaskExecution
      task="AutoSmithy"
      timestamp={nextVillageTaskExecution}
    />
  );
};

Smithy.displayName = 'Smithy';