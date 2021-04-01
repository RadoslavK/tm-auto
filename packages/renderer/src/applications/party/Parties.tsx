import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';

import type { PartiesQuery } from '../../_graphql/__generated__/PartiesQuery.graphql.js';
import { NextVillageTaskExecution } from '../../_shared/components/nextTaskExecution/NextVillageTaskExecution.js';

const partiesQuery = graphql`
  query PartiesQuery {
      ... on Query { __typename }
      selectedVillageId
  }
`;

export const Parties: React.FC = () => {
  const { selectedVillageId: villageId } = useLazyLoadQuery<PartiesQuery>(partiesQuery, {});

  return (
    <NextVillageTaskExecution task="AutoParty" villageId={villageId}/>
  );
};

Parties.displayName = 'Parties';