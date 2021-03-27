import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  useLazyLoadQuery,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { BuildingsInProgressQuery } from '../../../_graphql/__generated__/BuildingsInProgressQuery.graphql.js';
import type { BuildingsInProgressSubscription } from '../../../_graphql/__generated__/BuildingsInProgressSubscription.graphql.js';
import { BuildingInProgress } from './BuildingInProgress.js';

type Props = {
  readonly className?: string;
  readonly villageId: string;
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

const buildingsInProgressSubscription = graphql`
    subscription BuildingsInProgressSubscription($villageId: ID!) {
        buildingsInProgressUpdated(villageId: $villageId) {
            ...BuildingInProgress
        }
    }
`;

export const BuildingsInProgress: React.FC<Props> = ({ className, villageId }) => {
  const { buildingsInProgress } = useLazyLoadQuery<BuildingsInProgressQuery>(buildingsInProgressQuery, { villageId });

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<BuildingsInProgressSubscription> => ({
    subscription: buildingsInProgressSubscription,
    variables: { villageId },
    updater: (store) => {
      const newRecords = store.getPluralRootField('buildingsInProgressUpdated');
      store.getRoot().setLinkedRecords(newRecords, 'buildingsInProgress', { villageId });
    },
  }), [villageId]);

  useSubscription(subscriptionConfig);

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
