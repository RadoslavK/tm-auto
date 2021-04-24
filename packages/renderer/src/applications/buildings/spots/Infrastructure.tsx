import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  PreloadedQuery,
  usePreloadedQuery,
} from 'react-relay/hooks';

import type { InfrastructureQuery } from '../../../_graphql/__generated__/InfrastructureQuery.graphql.js';
import { BuildingsSpotsList } from './BuildingsSpotsList.js';

export const infrastructureQuery = graphql`
    query InfrastructureQuery($villageId: ID!) {
        infrastructure(villageId: $villageId) {
            ...BuildingsSpotsList_buildingSpots
        }
    }
`;

type Props = {
  readonly queryRef: PreloadedQuery<InfrastructureQuery>;
};

export const Infrastructure: React.FC<Props> = ({ queryRef }) => {
  const { infrastructure } = usePreloadedQuery(infrastructureQuery, queryRef);

  return <BuildingsSpotsList buildingsKey={infrastructure} />;
};

Infrastructure.displayName = 'Infrastructure';