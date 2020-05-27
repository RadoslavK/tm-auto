import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import {
  BuildingsUpdated,
  GetBuildingSpots,
} from '*/graphql_operations/building.graphql';
import { OnQueueUpdated } from '*/graphql_operations/queuedBuilding.graphql';

import {
  BuildingSpot as BuildingSpotModel,
  BuildingsUpdatedSubscription,
  BuildingsUpdatedSubscriptionVariables,
  GetBuildingSpotsQuery,
  GetBuildingSpotsQueryVariables,
  OnQueueUpdatedSubscription,
  OnQueueUpdatedSubscriptionVariables,
} from '../../../_types/graphql';
import { useVillageContext } from '../../villages/context/villageContext';
import { BuildingSpot } from './BuildingSpot';

const useStyles = makeStyles({
  buildingType: {
    display: 'flex',
    flex: '1',
    flexWrap: 'wrap',
  },
});

type Props = {
  readonly className: string;
};

const mapBuilding = (building: BuildingSpotModel, index: number): JSX.Element => (
  <BuildingSpot
    key={index}
    building={building}
  />
);

export const BuildingSpots: React.FC<Props> = (props) => {
  const {
    className,
  } = props;

  const classes = useStyles({});
  const { villageId } = useVillageContext();
  const { data, loading, refetch } = useQuery<GetBuildingSpotsQuery, GetBuildingSpotsQueryVariables>(GetBuildingSpots, {
    variables: { villageId },
  });

  useSubscription<BuildingsUpdatedSubscription, BuildingsUpdatedSubscriptionVariables>(BuildingsUpdated, {
    onSubscriptionData: () => {
      refetch();
    },
    variables: { villageId },
  });

  useSubscription<OnQueueUpdatedSubscription, OnQueueUpdatedSubscriptionVariables>(OnQueueUpdated, {
    onSubscriptionData: () => {
      refetch();
    },
    variables: { villageId },
  });

  if (loading || !data) {
    return null;
  }

  const { buildingSpots } = data;

  return (
    <div className={className}>
      <div className={classes.buildingType}>
        {buildingSpots.resources.wood.map((x, i) => mapBuilding(x, i))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.clay.map((x, i) => mapBuilding(x, i))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.iron.map((x, i) => mapBuilding(x, i))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.crop.map((x, i) => mapBuilding(x, i))}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.infrastructure.map((x, i) => mapBuilding(x, i))}
      </div>
    </div>
  );
};
