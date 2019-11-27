import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import { BuildingsInProgress } from './inProgress/BuildingsInProgress';
import { BuildingQueue } from './queue/BuildingQueue';
import { BuildingSpots } from './spots/BuildingSpots';

const useStyles = makeStyles({
  buildings: {
    display: 'flex',
  },
  buildingSpots: {
    flex: 3,
  },
  buildingsOngoing: {
    flex: 1,
  },
  queuedBuildings: {
    flex: 2,
  },
});

export const Buildings: React.FC = () => {
  const classes = useStyles({});

  return (
    <div className={classes.buildings}>
      <BuildingSpots className={classes.buildingSpots} />
      <BuildingsInProgress className={classes.buildingsOngoing} />
      <BuildingQueue className={classes.queuedBuildings} />
    </div>
  );
};