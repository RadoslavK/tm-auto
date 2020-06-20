import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import {
  BuildingSpot as BuildingSpotModel,
  useGetBuildingSpotsQuery,
  useOnActualBuildingLevelsUpdatedSubscription,
  useOnBuildingsInProgressUpdatedSubscription,
  useOnQueueUpdatedSubscription,
} from '../../../_graphql/graphqlHooks';
import { useSelectedVillageId } from '../../../hooks/villages/useSelectedVillageId';
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

const mapBuilding = (
  building: BuildingSpotModel,
  index: number,
): JSX.Element => <BuildingSpot key={index} building={building} />;

const useBuildingSpots = () => {
  const villageId = useSelectedVillageId();

  const {
    data: queryData,
    loading: queryLoading,
    refetch,
  } = useGetBuildingSpotsQuery({
    variables: { villageId },
  });

  useOnActualBuildingLevelsUpdatedSubscription({
    onSubscriptionData: () => {
      refetch();
    },
    variables: { villageId },
  });
  useOnBuildingsInProgressUpdatedSubscription({
    onSubscriptionData: () => {
      refetch();
    },
    variables: { villageId },
  });
  useOnQueueUpdatedSubscription({
    onSubscriptionData: () => {
      refetch();
    },
    variables: { villageId },
  });

  return queryLoading || !queryData ? null : queryData.buildingSpots;
};

export const BuildingSpots: React.FC<Props> = (props) => {
  const { className } = props;

  const classes = useStyles({});

  const buildingSpots = useBuildingSpots();

  if (!buildingSpots) {
    return null;
  }

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
