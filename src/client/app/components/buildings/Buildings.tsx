import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import { NextVillageTaskExecution } from '../_shared/NextVillageTaskExecution';
import { VillageTaskType } from '../../../_types/graphql';
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
        <NextVillageTaskExecution task={VillageTaskType.AutoBuild} />
        <BuildingsInProgress />
      </div>
      <BuildingQueue className={classes.queuedBuildings} />
    </div>
  );
};
