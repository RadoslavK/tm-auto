import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import {
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay/hooks';

import type { PartiesQuery } from '../../_graphql/__generated__/PartiesQuery.graphql.js';
import { NextVillageTaskExecution } from '../../_shared/components/nextTaskExecution/NextVillageTaskExecution.js';

const query = graphql`
  query PartiesQuery($villageId: ID!) {
      nextVillageTaskExecution(task: AutoParty, villageId: $villageId) {
          ...NextVillageTaskExecution_timestamp
      }
  }
`;

export const usePartiesQuery = () => {
  const [partiesQueryRef, loadPartiesQuery] = useQueryLoader<PartiesQuery>(query);

  const reloadPartiesQuery = useCallback((villageId: string) => {
    loadPartiesQuery({ villageId }, { fetchPolicy: 'store-and-network' });
  }, [loadPartiesQuery]);

  return { partiesQueryRef, reloadPartiesQuery };
};

type Props = {
  readonly queryRef: PreloadedQuery<PartiesQuery>;
};

export const Parties: React.FC<Props> = ({ queryRef }) => {
  const { nextVillageTaskExecution } = usePreloadedQuery(query, queryRef);

  return (
    <NextVillageTaskExecution
      task="AutoParty"
      timestamp={nextVillageTaskExecution}
    />
  );
};

Parties.displayName = 'Parties';