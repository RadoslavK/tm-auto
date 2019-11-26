import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext } from 'react';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import { BuildingsUpdated, GetBuildingSpots } from '*/graphql_operations/building.graphql';
import {
  IBuildingSpotFragmentFragment,
  IBuildingsUpdatedSubscription,
  IBuildingsUpdatedSubscriptionVariables,
  IGetBuildingSpotsQuery,
  IGetBuildingSpotsQueryVariables,
  IOnQueueUpdatedSubscription,
  IOnQueueUpdatedSubscriptionVariables,
} from '../../../../_types/graphql';
import { BuildingSpot } from './BuildingSpot';
import { OnQueueUpdated } from '*/graphql_operations/queuedBuilding.graphql';
import { useVillageContext } from '../../../hooks/useVillageContext';

const useStyles = makeStyles({
  buildingType: {
    flex: '1',
    flexWrap: 'wrap',
    display: 'flex',
  },
});

interface IProps {
  readonly className: string;
}

const mapBuilding = (building: IBuildingSpotFragmentFragment, index: number): JSX.Element => (
  <BuildingSpot key={index} building={building} />
);

export const BuildingSpots: React.FC<IProps> = (props) => {
  const {
    className,
  } = props;

  const classes = useStyles({});
  const { villageId } = useVillageContext()
  const { data, loading, refetch } = useQuery<IGetBuildingSpotsQuery, IGetBuildingSpotsQueryVariables>(GetBuildingSpots, {
    variables: { villageId },
  });

  useSubscription<IBuildingsUpdatedSubscription, IBuildingsUpdatedSubscriptionVariables>(BuildingsUpdated, {
    variables: { villageId },
    onSubscriptionData: () => {
      refetch();
    },
  });

  useSubscription<IOnQueueUpdatedSubscription, IOnQueueUpdatedSubscriptionVariables>(OnQueueUpdated, {
    variables: { villageId },
    onSubscriptionData: () => {
      refetch();
    },
  });

  if (loading || !data) {
    return null;
  }

  const { buildingSpots } = data;

  return (
    <div className={className}>
      <div className={classes.buildingType}>
        {buildingSpots.resources.wood.map(mapBuilding)}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.clay.map(mapBuilding)}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.iron.map(mapBuilding)}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.resources.crop.map(mapBuilding)}
      </div>
      <div className={classes.buildingType}>
        {buildingSpots.infrastructure.map(mapBuilding)}
      </div>
    </div>
  );
};