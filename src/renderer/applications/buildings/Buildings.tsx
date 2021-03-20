import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { NextVillageTaskExecution } from '../../_shared/components/nextTaskExecution/NextVillageTaskExecution.js';
import { BuildingsInProgress } from './inProgress/BuildingsInProgress.js';
import { BuildingQueue } from './queue/BuildingQueue.js';
import { BuildingSpots } from './spots/BuildingSpots.js';

const useStyles = makeStyles({
  buildingSpots: {
    flex: 3,
  },
  buildings: {
    display: 'flex',
  },
  ongoingAndNextExecution: {
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
      <div className={classes.ongoingAndNextExecution}>
        <NextVillageTaskExecution task={'AutoBuild'} />
        <BuildingsInProgress />
      </div>
      <BuildingQueue className={classes.queuedBuildings} />
    </div>
  );
};
