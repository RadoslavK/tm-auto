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
            fieldId
            level
            ...BuildingInProgress_buildingInProgress
        }
    }
`;

export const BuildingsInProgress: React.FC<Props> = ({ className, villageId }) => {
  const { buildingsInProgress } = useLazyLoadQuery<BuildingsInProgressQuery>(buildingsInProgressQuery, { villageId });

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<BuildingsInProgressSubscription> => ({
    subscription: buildingsInProgressSubscription,
    variables: { villageId },
    //   TODO make these have normal id so we can insert linked records
    // updater: (store, data) => {
    //   const root = store.getRoot();
    //   const newBuildings = data.buildingsInProgressUpdated.reduce(
    //     (records, building) => {
    //       const record = store.get(building.fieldId as any);
    //       return record ? [...records, record] : records;
    //     },
    //     [] as RecordProxy[],
    //   );
    //
    //   root.setLinkedRecords(newBuildings, 'buildingsInProgress');
    // },
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
