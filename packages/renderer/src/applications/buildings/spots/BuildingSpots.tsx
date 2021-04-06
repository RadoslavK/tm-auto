import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  Suspense,
  useMemo,
} from 'react';
import {
  useFragment,
  useSubscription,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { BuildingSpots_buildingSpots$key } from '../../../_graphql/__generated__/BuildingSpots_buildingSpots.graphql.js';
import type { BuildingSpotsSubscription } from '../../../_graphql/__generated__/BuildingSpotsSubscription.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { BuildingSpot } from './BuildingSpot.js';

const buildingSpotsFragment = graphql`
  fragment BuildingSpots_buildingSpots on BuildingSpots {
      infrastructure {
          id
          ...BuildingSpot_buildingSpot
      }
      resources {
          wood {
              id
              ...BuildingSpot_buildingSpot
          }
          clay {
              id
              ...BuildingSpot_buildingSpot
          }
          iron {
              id
              ...BuildingSpot_buildingSpot
          }
          crop {
              id
              ...BuildingSpot_buildingSpot
          }
      }
  }
`;

const subscription = graphql`
    subscription BuildingSpotsSubscription($villageId: ID!) {
        onBuildingSpotUpdated(villageId: $villageId) {
            ...BuildingSpot_buildingSpot
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
};

export const BuildingSpots: React.FC<Props> = ({
  buildingSpotsKey,
  className,
}) => {
  const classes = useStyles({});
  const buildingSpots = useFragment(buildingSpotsFragment, buildingSpotsKey);
  const villageId = useRecoilValue(selectedVillageIdState);

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<BuildingSpotsSubscription> => ({
    subscription,
    variables: {
      villageId,
    },
  }), [villageId]);

  useSubscription(subscriptionConfig);

  return (
    <div className={className}>
      <div className={classes.buildingType}>
        {buildingSpots.resources.wood.map((building) => (
          <Suspense key={building.id} fallback={null}>
            <BuildingSpot building={building} />
          </Suspense>
        ))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.clay.map((building) => (
          <Suspense key={building.id} fallback={null}>
            <BuildingSpot building={building} />
          </Suspense>
        ))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.iron.map((building) => (
          <Suspense key={building.id} fallback={null}>
            <BuildingSpot building={building} />
          </Suspense>
        ))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.crop.map((building) => (
          <Suspense key={building.id} fallback={null}>
            <BuildingSpot building={building} />
          </Suspense>
        ))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.infrastructure.map((building) => (
          <Suspense key={building.id} fallback={null}>
            <BuildingSpot building={building} />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

BuildingSpots.displayName = 'BuildingSpots';