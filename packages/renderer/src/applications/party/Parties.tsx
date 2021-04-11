import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { PartiesQuery } from '../../_graphql/__generated__/PartiesQuery.graphql.js';
import { selectedVillageIdState } from '../../_recoil/atoms/selectedVillageId.js';
import { NextVillageTaskExecution } from '../../_shared/components/nextTaskExecution/NextVillageTaskExecution.js';

const query = graphql`
  query PartiesQuery($villageId: ID!) {
      nextVillageTaskExecution(task: AutoParty, villageId: $villageId) {
          ...NextVillageTaskExecution_timestamp
      }
  }
`;

export const Parties: React.FC = () => {
  const villageId = useRecoilValue(selectedVillageIdState);
  const { nextVillageTaskExecution } = useLazyLoadQuery<PartiesQuery>(query, { villageId });

  return (
    <NextVillageTaskExecution
      task="AutoParty"
      timestamp={nextVillageTaskExecution}
    />
  );
};

Parties.displayName = 'Parties';