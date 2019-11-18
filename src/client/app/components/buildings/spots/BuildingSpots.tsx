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
} from '../../../../_types/graphql';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';
import { BuildingSpot } from './BuildingSpot';

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

const BuildingSpots: React.FunctionComponent<IProps> = (props) => {
  const {
    className,
  } = props;

  const classes = useStyles({});
  const { villageId } = useContext<IVillageContext>(VillageContext);
  const { data, loading, refetch } = useQuery<IGetBuildingSpotsQuery, IGetBuildingSpotsQueryVariables>(GetBuildingSpots, {
    variables: { villageId },
    fetchPolicy: 'network-only',
  });

  useSubscription<IBuildingsUpdatedSubscription, IBuildingsUpdatedSubscriptionVariables>(BuildingsUpdated, {
    variables: { villageId },
    fetchPolicy: 'network-only',
    onSubscriptionData: () => refetch({ villageId }),
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

BuildingSpots.displayName = 'BuildingSpots';

export { BuildingSpots };
