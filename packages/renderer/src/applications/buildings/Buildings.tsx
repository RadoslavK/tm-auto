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
  buildings: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buildingSpots: {
    flex: 2,
    maxWidth: '40%',
  },
  ongoing: {
    flex: 1,
    maxWidth: '20%',
  },
  queue: {
    flex: 2,
    maxWidth: '40%',
  },
  coolDown: {
    marginBottom: 16,
  },
});

const buildingsQuery = graphql`
  query BuildingsQuery($villageId: ID!) {
      buildingQueue(villageId: $villageId) {
          ...BuildingQueue_buildingQueue
      }
      buildingsInProgress(villageId: $villageId) {
          ...BuildingsInProgress_buildingsInProgress
      }
      nextVillageTaskExecution(villageId: $villageId, task: AutoBuild) {
          ...NextVillageTaskExecution_timestamp
      }
      autoBuildSettings(villageId: $villageId) {
          ...BuildingQueue_autoBuildSettings
      }
  }
`;

export const useBuildingsQuery = () => {
  const [buildingsQueryRef, loadBuildingsQuery] = useQueryLoader<BuildingsQuery>(buildingsQuery);

  const reloadBuildingsQuery = useCallback((villageId: string) => {
    loadBuildingsQuery({ villageId }, { fetchPolicy: 'store-and-network' });
  }, [loadBuildingsQuery]);

  return {
    buildingsQueryRef,
    reloadBuildingsQuery,
  };
};

type Props = {
  readonly buildingsQueryRef: PreloadedQuery<BuildingsQuery>;
};

export const Buildings: React.FC<Props> = ({
  buildingsQueryRef,
}) => {
  const classes = useStyles({});

  const {
    autoBuildSettings,
    buildingQueue,
    buildingsInProgress,
    nextVillageTaskExecution,
  } = usePreloadedQuery(buildingsQuery, buildingsQueryRef);

  return (
    <div className={classes.buildings}>
      <Suspense fallback={null}>
        <BuildingSpots className={classes.buildingSpots}/>
      </Suspense>
      <div className={classes.ongoing}>
        <Suspense fallback={null}>
          <BuildingsInProgress buildingsInProgressKey={buildingsInProgress} />
        </Suspense>
      </div>
      <div className={classes.queue}>
        <NextVillageTaskExecution className={classes.coolDown} task="AutoBuild" timestamp={nextVillageTaskExecution} />
        <Suspense fallback={null}>
          <BuildingQueue
            autoBuildSettingsKey={autoBuildSettings}
            buildingQueueKey={buildingQueue}
          />
        </Suspense>
      </div>
    </div>
  );
};

Buildings.displayName = 'Buildings';