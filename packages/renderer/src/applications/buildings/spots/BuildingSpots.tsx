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

import type { BuildingSpot_buildingSpot$key } from '../../../_graphql/__generated__/BuildingSpot_buildingSpot.graphql.js';
import type { BuildingSpotsQuery } from '../../../_graphql/__generated__/BuildingSpotsQuery.graphql.js';
import { BuildingSpot } from './BuildingSpot.js';

const useStyles = makeStyles({
  buildingType: {
    display: 'flex',
    flex: '1',
    flexWrap: 'wrap',
  },
});

type Props = {
  readonly className: string;
  readonly villageId: string;
};

const mapBuilding = (
  building: BuildingSpot_buildingSpot$key,
  index: number,
  villageId: string,
): JSX.Element => <BuildingSpot key={index} building={building} villageId={villageId} />;

const buildingSpotsQuery = graphql`
  query BuildingSpotsQuery($villageId: ID!) {
      buildingSpots(villageId: $villageId) {
          infrastructure {
              ...BuildingSpot_buildingSpot
          }
          resources {
              wood {
                  ...BuildingSpot_buildingSpot
              }
              clay {
                  ...BuildingSpot_buildingSpot
              }
              iron {
                  ...BuildingSpot_buildingSpot
              }
              crop {
                  ...BuildingSpot_buildingSpot
              }
          }
      }
  }
`;

const buildingSpotsSubscription = graphql`
    subscription BuildingSpotsSubscription($villageId: ID!) {
        actualBuildingLevelsUpdated(villageId: $villageId)
        buildingsInProgressUpdated(villageId: $villageId) {
            ...BuildingInProgress
        }
        queueUpdated(villageId: $villageId) {
            ...BuildingQueue
        }
    }
`;

export const BuildingSpots: React.FC<Props> = ({ className, villageId }) => {
  const classes = useStyles({});

  const [refreshedQueryOptions, setRefreshedQueryOptions] = useState<{
    readonly fetchKey?: number;
    readonly fetchPolicy?: FetchPolicy;
  }>({});

  const { buildingSpots } = useLazyLoadQuery<BuildingSpotsQuery>(buildingSpotsQuery, { villageId }, refreshedQueryOptions);

  const refresh = useCallback(() => {
    setRefreshedQueryOptions(prev => ({
      fetchKey: (prev?.fetchKey ?? 0) + 1,
      fetchPolicy: 'network-only',
    }));
  }, []);

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<any> => ({
    subscription: buildingSpotsSubscription,
    variables: { villageId },
    onCompleted: () => refresh(),
  }), [villageId, refresh]);

  useSubscription(subscriptionConfig);

  return (
    <div className={className}>
      <div className={classes.buildingType}>
        {buildingSpots.resources.wood.map((x, i) => mapBuilding(x, i, villageId))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.clay.map((x, i) => mapBuilding(x, i, villageId))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.iron.map((x, i) => mapBuilding(x, i, villageId))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.crop.map((x, i) => mapBuilding(x, i, villageId))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.infrastructure.map((x, i) => mapBuilding(x, i, villageId))}
      </div>
    </div>
  );
};
