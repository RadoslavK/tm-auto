import React from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';

import type { BuildingsInProgressQuery } from '../../../_graphql/__generated__/BuildingsInProgressQuery.graphql.js';

import { BuildingInProgress } from './BuildingInProgress.js';

type Props = {
  readonly className?: string;
};

const buildingsInProgressQuery = graphql`
  query BuildingsInProgressQuery($villageId: ID!) {
      buildingsInProgress(villageId: $villageId) {
          fieldId
          level
          ...BuildingInProgress_buildingInProgress
      }
  }
`;

export const BuildingsInProgress: React.FC<Props> = ({ className }) => {
  const villageId = '';

  const { buildingsInProgress } = useLazyLoadQuery<BuildingsInProgressQuery>(buildingsInProgressQuery, { villageId });

  return (
    <div className={className}>
      {buildingsInProgress.map((building) => (
        <BuildingInProgress
          key={`${building.fieldId}|${building.level}`}
          building={building}
        />
      ))}
    </div>
  );
};
