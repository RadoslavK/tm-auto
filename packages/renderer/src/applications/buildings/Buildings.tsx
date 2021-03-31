import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  Suspense,
  useCallback,
} from 'react';
import {
  PreloadedQuery,
  usePreloadedQuery,
  useQueryLoader,
} from 'react-relay/hooks';

import type { BuildingsQuery } from '../../_graphql/__generated__/BuildingsQuery.graphql.js';
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

const buildingsQuery = graphql`
  query BuildingsQuery($villageId: ID!) {
      buildingSpots(villageId: $villageId) {
        ...BuildingSpots_buildingSpots
      }
      buildingQueue(villageId: $villageId) {
          ...BuildingQueue_buildingQueue
      }
      buildingsInProgress(villageId: $villageId) {
          ...BuildingsInProgress_buildingsInProgress
      }
  }
`;

export const useBuildingsQuery = () => {
  const [buildingsQueryRef, loadBuildingsQuery] = useQueryLoader<BuildingsQuery>(buildingsQuery);

  const refreshBuildingSpots = useCallback((vId: string) => {
    loadBuildingsQuery({ villageId: vId }, { fetchPolicy: 'network-only' });
  }, [loadBuildingsQuery]);

  return {
    buildingsQueryRef,
    refreshBuildingSpots,
  };
};

type Props = {
  readonly buildingsQueryRef: PreloadedQuery<BuildingsQuery>;
  readonly refreshBuildingSpots: (villageId: string) => void;
  readonly villageId: string;
  readonly tribe: string;
};

export const Buildings: React.FC<Props> = ({
  buildingsQueryRef,
  refreshBuildingSpots,
  villageId,
  tribe,
}) => {
  const classes = useStyles({});

  const { buildingSpots, buildingQueue, buildingsInProgress } = usePreloadedQuery(buildingsQuery, buildingsQueryRef);

  return (
    <div className={classes.buildings}>
      <Suspense fallback={null}>
        <BuildingSpots
          buildingSpotsKey={buildingSpots}
          className={classes.buildingSpots}
          refresh={() => refreshBuildingSpots(villageId)}
          villageId={villageId}
          tribe={tribe}
        />
      </Suspense>
      <div className={classes.ongoingAndNextExecution}>
        <NextVillageTaskExecution
          task="AutoBuild"
          villageId={villageId}
        />
        <Suspense fallback={null}>
          <BuildingsInProgress
            buildingsInProgressKey={buildingsInProgress}
            villageId={villageId}
            tribe={tribe}
          />
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <BuildingQueue
          buildingQueueKey={buildingQueue}
          className={classes.queuedBuildings}
          villageId={villageId}
        />
      </Suspense>
    </div>
  );
};
