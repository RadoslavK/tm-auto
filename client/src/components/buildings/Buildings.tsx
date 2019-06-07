import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { BuildingQueue } from './queue/BuildingQueue';
import { BuildingSpots } from './spots/BuildingSpots';
import { BuildingsInProgress } from './inProgress/BuildingsInProgress';

const useStyles = makeStyles({
  buildings: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const Buildings: React.FunctionComponent = () => {
  const classes = useStyles({});

  return (
    <div className={classes.buildings}>
      <BuildingSpots />
      <BuildingsInProgress />
      <BuildingQueue />
    </div>
  );
};

Buildings.displayName = 'Buildings';

export { Buildings };


