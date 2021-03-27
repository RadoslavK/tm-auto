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

import type { CrannyCapacityQuery } from '../../../_graphql/__generated__/CrannyCapacityQuery.graphql.js';
import type { CrannyCapacitySubscription } from '../../../_graphql/__generated__/CrannyCapacitySubscription.graphql.js';
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

const crannyCapacitySubscription = graphql`
  subscription CrannyCapacitySubscription($villageId: ID!) {
      actualBuildingLevelsUpdated(villageId: $villageId)
      buildingsInProgressUpdated(villageId: $villageId) {
          type
      }
      queueUpdated(villageId: $villageId) {
          infrastructureBuildingTime {
              days
          }
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
  
  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<CrannyCapacitySubscription> => ({
    subscription: crannyCapacitySubscription,
    variables: { villageId },
    onCompleted: () => refresh(),
  }), [villageId, refresh]);

  useSubscription(subscriptionConfig);

  return (
    <div className={classes.root}>
      <div className={classes.image} />
      <div>
        {crannyCapacity.actual} /{crannyCapacity.ongoing} /{crannyCapacity.total}
      </div>
    </div>
  );
};
