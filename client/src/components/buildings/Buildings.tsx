import React from 'react';
import { BuildingQueue } from './queue/BuildingQueue';
import { BuildingSpots } from './spots/BuildingSpots';
import { BuildingsInProgress } from './BuildingsInProgress';

const Buildings: React.FunctionComponent = () => {
  return (
    <>
      <BuildingSpots />
      <BuildingsInProgress />
      <BuildingQueue />
    </>
  );
};

Buildings.displayName = 'Buildings';

export { Buildings };


