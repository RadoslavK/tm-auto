import makeStyles from '@material-ui/core/styles/makeStyles';
import React, {
  useEffect,
  useState,
} from 'react';

import {
  BuildingSpot as BuildingSpotModel,
  GetBuildingSpotsQuery,
  useBuildingSpotsUpdatedSubscription,
  useGetBuildingSpotsQuery,
} from '../../../_graphql/graphqlHooks';
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

const useBuildingSpots = () => {
  const { villageId } = useVillageContext();

  const [buildingSpots, setBuildingSpots] = useState<GetBuildingSpotsQuery['buildingSpots']>();

  const queryResult = useGetBuildingSpotsQuery({ variables: { villageId } });

  useEffect(() => {
    if (!queryResult.loading && queryResult.data) {
      setBuildingSpots(queryResult.data.buildingSpots);
    }
  }, [queryResult]);

  useBuildingSpotsUpdatedSubscription({
    onSubscriptionData: ({ subscriptionData: { data, loading } }) => {
      if (!loading && data) {
        setBuildingSpots(data.buildingSpotsUpdated);
      }
    },
    variables: { villageId },
  });

  return buildingSpots;
};

export const BuildingSpots: React.FC<Props> = (props) => {
  const {
    className,
  } = props;

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
