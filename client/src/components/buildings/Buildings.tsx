import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { BuildingQueue } from './queue/BuildingQueue';
import { BuildingSpots } from './spots/BuildingSpots';
import { BuildingsInProgress } from './inProgress/BuildingsInProgress';

const useStyles = makeStyles({
  buildings: {
    display: 'flex',
  },
  buildingSpots: {
    flex: 3,
  },
  queuedBuildings: {
    flex: 1,
  },
  buildingsOngoing: {
    flex: 1,
  },
});

const Buildings: React.FunctionComponent = () => {
  const classes = useStyles({});

  return (
    <div className={classes.buildings}>
      <BuildingSpots className={classes.buildingSpots} />
      <BuildingsInProgress className={classes.buildingsOngoing} />
      <BuildingQueue className={classes.queuedBuildings} />
    </div>
  );
};

Buildings.displayName = 'Buildings';

export { Buildings };


