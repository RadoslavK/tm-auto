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
  IBuildingSpot,
  IBuildingsUpdatedSubscription,
  IBuildingsUpdatedSubscriptionVariables,
  IGetBuildingSpotsQuery,
  IGetBuildingSpotsQueryVariables,
  IOnQueueUpdatedSubscription,
  IOnQueueUpdatedSubscriptionVariables,
} from '../../../../_types/graphql';
import { useVillageContext } from '../../../hooks/useVillageContext';
import { BuildingSpot } from './BuildingSpot';

const useStyles = makeStyles({
  buildingType: {
    display: 'flex',
    flex: '1',
    flexWrap: 'wrap',
  },
});

interface IProps {
  readonly className: string;
}

const mapBuilding = (building: IBuildingSpot, index: number): JSX.Element => (
  <BuildingSpot
    key={index}
    building={building}
  />
);

export const BuildingSpots: React.FC<IProps> = (props) => {
  const {
    className,
  } = props;

  const classes = useStyles({});
  const { villageId } = useVillageContext();
  const { data, loading, refetch } = useQuery<IGetBuildingSpotsQuery, IGetBuildingSpotsQueryVariables>(GetBuildingSpots, {
    variables: { villageId },
  });

  useSubscription<IBuildingsUpdatedSubscription, IBuildingsUpdatedSubscriptionVariables>(BuildingsUpdated, {
    onSubscriptionData: () => {
      refetch();
    },
    variables: { villageId },
  });

  useSubscription<IOnQueueUpdatedSubscription, IOnQueueUpdatedSubscriptionVariables>(OnQueueUpdated, {
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
