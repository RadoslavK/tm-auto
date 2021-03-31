import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  useFragment,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { BuildingSpot_buildingSpot$key } from '../../../_graphql/__generated__/BuildingSpot_buildingSpot.graphql.js';
import type { BuildingSpots_buildingSpots$key } from '../../../_graphql/__generated__/BuildingSpots_buildingSpots.graphql.js';
import type { BuildingSpotsActualBuildingLevelSubscription } from '../../../_graphql/__generated__/BuildingSpotsActualBuildingLevelSubscription.graphql.js';
import type { BuildingSpotsBuildingQueueSubscription } from '../../../_graphql/__generated__/BuildingSpotsBuildingQueueSubscription.graphql.js';
import type { BuildingSpotsBuildingsInProgressSubscription } from '../../../_graphql/__generated__/BuildingSpotsBuildingsInProgressSubscription.graphql.js';
import { BuildingSpot } from './BuildingSpot.js';

const mapBuilding = (
  building: BuildingSpot_buildingSpot$key,
  index: number,
  villageId: string,
): JSX.Element => <BuildingSpot key={index} building={building} villageId={villageId} />;

const buildingSpotsFragment = graphql`
  fragment BuildingSpots_buildingSpots on BuildingSpots {
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
`;

const buildingSpotsActualBuildingLevelSubscription = graphql`
    subscription BuildingSpotsActualBuildingLevelSubscription($villageId: ID!) {
        actualBuildingLevelsUpdated(villageId: $villageId)
    }
`;

const buildingSpotsBuildingsInProgressSubscription = graphql`
    subscription BuildingSpotsBuildingsInProgressSubscription($villageId: ID!) { 
        buildingsInProgressUpdated(villageId: $villageId) {
            ...BuildingInProgress
        }
    }
`;

const buildingSpotsBuildingQueueSubscription = graphql`
    subscription BuildingSpotsBuildingQueueSubscription($villageId: ID!) {
        queueUpdated(villageId: $villageId) {
            ...BuildingQueue
        }
    }
`;

const useStyles = makeStyles({
  buildingType: {
    display: 'flex',
    flex: '1',
    flexWrap: 'wrap',
  },
});

type Props = {
  readonly buildingSpotsKey: BuildingSpots_buildingSpots$key;
  readonly className: string;
  readonly refresh: () => void;
  readonly villageId: string;
};

export const BuildingSpots: React.FC<Props> = ({
  buildingSpotsKey,
  className,
  refresh,
  villageId,
}) => {
  const classes = useStyles({});

  const buildingSpots = useFragment(buildingSpotsFragment, buildingSpotsKey);

  const buildingSpotsActualBuildingLevelSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<BuildingSpotsActualBuildingLevelSubscription> => ({
    subscription: buildingSpotsActualBuildingLevelSubscription,
    variables: { villageId },
    onNext: () => refresh(),
  }), [villageId, refresh]);

  useSubscription(buildingSpotsActualBuildingLevelSubscriptionConfig);

  const buildingSpotsBuildingsInProgressSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<BuildingSpotsBuildingsInProgressSubscription> => ({
    subscription: buildingSpotsBuildingsInProgressSubscription,
    variables: { villageId },
    onNext: () => refresh(),
  }), [villageId, refresh]);

  useSubscription(buildingSpotsBuildingsInProgressSubscriptionConfig);

  const buildingSpotsBuildingQueueSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<BuildingSpotsBuildingQueueSubscription> => ({
    subscription: buildingSpotsBuildingQueueSubscription,
    variables: { villageId },
    onNext: () => refresh(),
  }), [villageId, refresh]);

  useSubscription(buildingSpotsBuildingQueueSubscriptionConfig);

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
