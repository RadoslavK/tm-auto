import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  useFragment,
  useLazyLoadQuery,
  useMutation,
  useSubscription,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { BuildingQueue_buildingQueue$key } from '../../../_graphql/__generated__/BuildingQueue_buildingQueue.graphql.js';
import type { BuildingQueueBuildingTimesSplitInfoQuery } from '../../../_graphql/__generated__/BuildingQueueBuildingTimesSplitInfoQuery.graphql.js';
import type { BuildingQueueClearQueueMutation } from '../../../_graphql/__generated__/BuildingQueueClearQueueMutation.graphql.js';
import type { BuildingQueueCorrectionSubscription } from '../../../_graphql/__generated__/BuildingQueueCorrectionSubscription.graphql.js';
import type { BuildingQueueQueuedBuildingSubscription } from '../../../_graphql/__generated__/BuildingQueueQueuedBuildingSubscription.graphql.js';
import type { BuildingQueueTimesUpdatedSubscription } from '../../../_graphql/__generated__/BuildingQueueTimesUpdatedSubscription.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { tribeState } from '../../../_recoil/atoms/tribe.js';
import { modificationQueuePayloadUpdater } from '../../../_shared/cache/modificationQueuePayloadUpdater.js';
import { QueuedBuilding } from './building/QueuedBuilding.js';
import { Cost } from './Cost.js';

type Props = {
  readonly buildingQueueKey: BuildingQueue_buildingQueue$key;
  readonly className: string;
};

const useStyles = makeStyles({
  action: {
    marginBottom: '15px',
    width: '100%',
  },
  buildings: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    maxHeight: '80vh',
  },
});

const buildingQueueFragment = graphql`
  fragment BuildingQueue_buildingQueue on BuildingQueue {
      buildings {
          id
          fieldId
          ...QueuedBuilding_queuedBuilding
      }
      totalCost {
          ...Cost_resources
      }
      totalBuildingTime {
          ...Cost_duration
      }
      infrastructureBuildingTime {
          ...Cost_duration
      }
      resourcesBuildingTime {
          ...Cost_duration
      }
  }
`;

const buildingQueueBuildingTimesSplitInfoQuery = graphql`
    query BuildingQueueBuildingTimesSplitInfoQuery($villageId: ID!) {
        autoBuildSettings(villageId: $villageId) {
            dualQueue {
                allow
            }
        }
    }
`;

const buildingQueueClearQueueMutation = graphql`
  mutation BuildingQueueClearQueueMutation($villageId: ID!) {
      clearQueue(villageId: $villageId) {
          ...BuildingQueue_buildingQueue
      }
  }
`;

const correctionSubscription = graphql`
  subscription BuildingQueueCorrectionSubscription($villageId: ID!) {
      buildingQueueCorrected(villageId: $villageId) {
          ...ModificationPayload
      }
  }
`;

const timesUpdatedSubscription = graphql`
  subscription BuildingQueueTimesUpdatedSubscription($villageId: ID!) {
      buildingQueueTimesUpdated(villageId: $villageId) {
        ...BuildingQueueTimes   
      }
  }
`;

const queuedBuildingSubscription = graphql`
    subscription BuildingQueueQueuedBuildingSubscription($villageId: ID!) {
        queuedBuildingUpdated(villageId: $villageId) {
            ...ModificationPayload
        }
    }
`;

export const BuildingQueue: React.FC<Props> = ({
  buildingQueueKey,
  className,
}) => {
  const villageId = useRecoilValue(selectedVillageIdState);
  const { autoBuildSettings } = useLazyLoadQuery<BuildingQueueBuildingTimesSplitInfoQuery>(buildingQueueBuildingTimesSplitInfoQuery, { villageId }, { fetchPolicy: 'store-and-network' });
  const tribe = useRecoilValue(tribeState);
  const shouldSplitBuildingTimes = tribe === 'Romans' && autoBuildSettings.dualQueue.allow;

  const buildingQueue = useFragment(buildingQueueFragment, buildingQueueKey);

  const classes = useStyles();

  const [clearQueue] = useMutation<BuildingQueueClearQueueMutation>(buildingQueueClearQueueMutation);

  const correctionSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<BuildingQueueCorrectionSubscription> => ({
    subscription: correctionSubscription,
    variables: { villageId },
    updater: (store) => {
      const rootField = store.getRootField('buildingQueueCorrected');
      modificationQueuePayloadUpdater(store, rootField, villageId);
    },
  }), [villageId]);

  useSubscription(correctionSubscriptionConfig);

  const timesUpdatedSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<BuildingQueueTimesUpdatedSubscription> => ({
    subscription: timesUpdatedSubscription,
    variables: { villageId },
    updater: (store) => {
      const root = store.getRoot();
      const queue = root.getLinkedRecord('buildingQueue', { villageId });

      if (!queue) {
        return;
      }

      const updatedTimes = store.getRootField('buildingQueueTimesUpdated');

      queue.copyFieldsFrom(updatedTimes);
      root.setLinkedRecord(queue, 'buildingQueue', { villageId });
    },
  }), [villageId]);

  useSubscription(timesUpdatedSubscriptionConfig);

  const queuedBuildingSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<BuildingQueueQueuedBuildingSubscription> => ({
    subscription: queuedBuildingSubscription,
    variables: { villageId },
    updater: (store) => {
      const rootField = store.getRootField('queuedBuildingUpdated');
      modificationQueuePayloadUpdater(store, rootField, villageId);
    },
  }), [villageId]);

  useSubscription(queuedBuildingSubscriptionConfig);

  const onClear = (): void => {
    clearQueue({
      variables: { villageId },
      updater: (store) => {
        const newRecord = store.getRootField('clearQueue');
        store.getRoot().setLinkedRecord(newRecord, 'buildingQueue', { villageId });
      },
    });
  };

  return (
    <div className={className}>
      <button className={classes.action} onClick={onClear}>
        Clear queue
      </button>
      <Cost
        buildTime={buildingQueue.totalBuildingTime}
        infrastructureBuildTime={buildingQueue.infrastructureBuildingTime}
        resourcesBuildTime={buildingQueue.resourcesBuildingTime}
        split={shouldSplitBuildingTimes}
        resources={buildingQueue.totalCost}
      />
      <div className={classes.buildings}>
        {buildingQueue.buildings.map((building, index) => {
          const nextBuilding = buildingQueue.buildings[index + 1];
          const isMergeable = !!nextBuilding && nextBuilding.fieldId === building.fieldId;

          return (
            <QueuedBuilding
              key={building.id}
              building={building}
              index={index}
              isMergeable={isMergeable}
            />
          );
        })}
      </div>
    </div>
  );
};

BuildingQueue.displayName = 'BuildingQueue';