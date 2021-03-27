import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { Suspense } from 'react';
import { useLazyLoadQuery } from 'react-relay/hooks';

import type { BuildingsSelectedVillageIdQuery } from '../../_graphql/__generated__/BuildingsSelectedVillageIdQuery.graphql.js';
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

const buildingsSelectedVillageIdQuery = graphql`
    query BuildingsSelectedVillageIdQuery {
        ... on Query { __typename }
        selectedVillageId
    }
`;

export const Buildings: React.FC = () => {
  const { selectedVillageId: villageId } = useLazyLoadQuery<BuildingsSelectedVillageIdQuery>(buildingsSelectedVillageIdQuery, {});
  const classes = useStyles({});

  return (
    <div className={classes.buildings}>
      <Suspense fallback={null}>
        <BuildingSpots
          className={classes.buildingSpots}
          villageId={villageId}
        />
      </Suspense>
      <div className={classes.ongoingAndNextExecution}>
        <NextVillageTaskExecution
          task="AutoBuild"
          villageId={villageId}
        />
        <Suspense fallback={null}>
          <BuildingsInProgress villageId={villageId} />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <BuildingQueue
          className={classes.queuedBuildings}
          villageId={villageId}
        />
      </Suspense>
    </div>
  );
};
