import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import type { FetchPolicy } from 'react-relay';
import {
  useLazyLoadQuery,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';
import { BuildingType } from 'shared/enums/BuildingType.js';

import type { CrannyCapacityActualBuildingLevelSubscription } from '../../../_graphql/__generated__/CrannyCapacityActualBuildingLevelSubscription.graphql.js';
import type { CrannyCapacityBuildingQueueSubscription } from '../../../_graphql/__generated__/CrannyCapacityBuildingQueueSubscription.graphql.js';
import type { CrannyCapacityBuildingsInProgressSubscription } from '../../../_graphql/__generated__/CrannyCapacityBuildingsInProgressSubscription.graphql.js';
import type { CrannyCapacityQuery } from '../../../_graphql/__generated__/CrannyCapacityQuery.graphql.js';
import { imageLinks } from '../../../utils/imageLinks.js';

const useStyles = makeStyles({
  image: {
    backgroundImage: `url("${imageLinks.getBuilding(BuildingType.Cranny)}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: 24,
    width: 24,
  },
  root: {
    display: 'flex',
  },
});

const crannyCapacityQuery = graphql`
    query CrannyCapacityQuery($villageId: ID!) {
        crannyCapacity(villageId: $villageId) {
            actual
            ongoing
            total
        }
    }
`;

const actualBuildingLevelSubscription = graphql`
    subscription CrannyCapacityActualBuildingLevelSubscription($villageId: ID!) {
        actualBuildingLevelsUpdated(villageId: $villageId)
    }
`;

const buildingsInProgressSubscription = graphql`
    subscription CrannyCapacityBuildingsInProgressSubscription($villageId: ID!) {
        buildingsInProgressUpdated(villageId: $villageId) {
            ...BuildingInProgress
        }
    }
`;

const buildingQueueSubscription = graphql`
    subscription CrannyCapacityBuildingQueueSubscription($villageId: ID!) {
        queueUpdated(villageId: $villageId) {
            ...BuildingQueue
        }
    }
`;

type Props = {
  readonly villageId: string;
};

export const CrannyCapacity: React.FC<Props> = ({ villageId }) => {
  const classes = useStyles();

  const [refreshedQueryOptions, setRefreshedQueryOptions] = useState<{
    readonly fetchKey?: number;
    readonly fetchPolicy?: FetchPolicy;
  }>({});

  const refresh = useCallback(() => {
    setRefreshedQueryOptions(prev => ({
      fetchKey: (prev?.fetchKey ?? 0) + 1,
      fetchPolicy: 'network-only',
    }));
  }, []);

  const { crannyCapacity } = useLazyLoadQuery<CrannyCapacityQuery>(crannyCapacityQuery, { villageId }, refreshedQueryOptions);

  const actualBuildingLevelSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<CrannyCapacityActualBuildingLevelSubscription> => ({
    subscription: actualBuildingLevelSubscription,
    variables: { villageId },
    onNext: () => refresh(),
  }), [villageId, refresh]);

  useSubscription(actualBuildingLevelSubscriptionConfig);

  const buildingsInProgressSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<CrannyCapacityBuildingsInProgressSubscription> => ({
    subscription: buildingsInProgressSubscription,
    variables: { villageId },
    onNext: () => refresh(),
  }), [villageId, refresh]);

  useSubscription(buildingsInProgressSubscriptionConfig);

  const buildingQueueSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<CrannyCapacityBuildingQueueSubscription> => ({
    subscription: buildingQueueSubscription,
    variables: { villageId },
    onNext: () => refresh(),
  }), [villageId, refresh]);

  useSubscription(buildingQueueSubscriptionConfig);

  return (
    <div className={classes.root}>
      <div className={classes.image} />
      <div>
        {crannyCapacity.actual} /{crannyCapacity.ongoing} /{crannyCapacity.total}
      </div>
    </div>
  );
};
