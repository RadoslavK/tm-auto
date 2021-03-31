import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {
  useFragment,
  useLazyLoadQuery,
  useMutation,
  useRelayEnvironment,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';
import {
  commitLocalUpdate,
  createOperationDescriptor,
  getRequest,
} from 'relay-runtime';

import type { BuildingQueue_buildingQueue$key } from '../../../_graphql/__generated__/BuildingQueue_buildingQueue.graphql.js';
import type { BuildingQueueBuildingTimesSplitInfoQuery } from '../../../_graphql/__generated__/BuildingQueueBuildingTimesSplitInfoQuery.graphql.js';
import type { BuildingQueueClearQueueMutation } from '../../../_graphql/__generated__/BuildingQueueClearQueueMutation.graphql.js';
import type { BuildingQueueCollapsedBuildingRangesQuery } from '../../../_graphql/__generated__/BuildingQueueCollapsedBuildingRangesQuery.graphql.js';
import type { BuildingQueueSubscription } from '../../../_graphql/__generated__/BuildingQueueSubscription.graphql.js';
import { QueuedBuilding } from './building/QueuedBuilding.js';
import { Cost } from './Cost.js';
import { QueuedBuildingRange } from './range/QueuedBuildingRange.js';

type Props = {
  readonly buildingQueueKey: BuildingQueue_buildingQueue$key;
  readonly className: string;
  readonly villageId: string;
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
      buildingRanges {
          id
          buildings {
              queueId
              ...QueuedBuilding_queuedBuilding
          }
          ...QueuedBuildingRange_queuedBuildingRange
      }
  }
`;

const buildingQueueSubscription = graphql`
  subscription BuildingQueueSubscription($villageId: ID!) {
      queueUpdated(villageId: $villageId) {
         ...BuildingQueue_buildingQueue
      }
  }
`;

const buildingQueueBuildingTimesSplitInfoQuery = graphql`
    query BuildingQueueBuildingTimesSplitInfoQuery($villageId: ID!) {
        gameInfo {
            tribe
        }
        autoBuildSettings(villageId: $villageId) {
            dualQueue {
                allow
            }
        }
    }
`;

const buildingQueueClearQueueMutation = graphql`
  mutation BuildingQueueClearQueueMutation($villageId: ID!) {
      clearQueue(villageId: $villageId)
  }
`;

const collapsedBuildingRangesQuery = graphql`
  query BuildingQueueCollapsedBuildingRangesQuery($villageId: ID!) {
      ... on Query { __typename }
      collapsedBuildingQueueRanges(villageId: $villageId)
  }
`;

export const BuildingQueue: React.FC<Props> = ({
  buildingQueueKey,
  className,
  villageId,
}) => {
  const { gameInfo, autoBuildSettings } = useLazyLoadQuery<BuildingQueueBuildingTimesSplitInfoQuery>(buildingQueueBuildingTimesSplitInfoQuery, { villageId });
  const shouldSplitBuildingTimes = gameInfo.tribe === 'Romans' && autoBuildSettings.dualQueue.allow;

  const buildingQueue = useFragment(buildingQueueFragment, buildingQueueKey);

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<BuildingQueueSubscription> => ({
    subscription: buildingQueueSubscription,
    variables: { villageId },
    updater: (store) => {
      const newRecord = store.getRootField('queueUpdated');
      store.getRoot().setLinkedRecord(newRecord, 'buildingQueue', { villageId });
    },
  }), [villageId]);

  useSubscription(subscriptionConfig);

  const classes = useStyles();

  const [clearQueue] = useMutation<BuildingQueueClearQueueMutation>(buildingQueueClearQueueMutation);


  const relayEnvironment = useRelayEnvironment();

  useEffect(() => {
    const request = getRequest(collapsedBuildingRangesQuery);
    const operation = createOperationDescriptor(request, { villageId });
    relayEnvironment.retain(operation);
  }, [relayEnvironment, villageId]);

  const { collapsedBuildingQueueRanges } = useLazyLoadQuery<BuildingQueueCollapsedBuildingRangesQuery>(collapsedBuildingRangesQuery, {
    villageId,
  });

  const collapsedRangeIds = collapsedBuildingQueueRanges || [];

  const updateCollapsedBuildingQueueRangeIds = useCallback((rangeIds: string[]) => {
    commitLocalUpdate(relayEnvironment, store => {
      store.getRoot().setValue(rangeIds, 'collapsedBuildingQueueRanges', { villageId });
    });
  }, [relayEnvironment, villageId]);

  const setAllCollapsed = useCallback(() => {
    if (buildingQueue.buildingRanges) {
      updateCollapsedBuildingQueueRangeIds(buildingQueue.buildingRanges.reduce(
        (all, r) => (r.buildings.length > 1 ? [...all, r.id] : all),
        [] as string[],
      ));
    }
  }, [buildingQueue.buildingRanges, updateCollapsedBuildingQueueRangeIds]);

  const onRangeCollapse = (rangeId: string) => {
    updateCollapsedBuildingQueueRangeIds(collapsedRangeIds.concat([rangeId]));
  };

  const onRangeExpand = (rangeId: string) => {
    updateCollapsedBuildingQueueRangeIds(collapsedRangeIds.filter((id) => id !== rangeId));
  };

  const onClear = async (): Promise<void> => {
    clearQueue({
      variables: { villageId },
    });
  };

  return (
    <div className={className}>
      <button className={classes.action} onClick={onClear}>
        Clear queue
      </button>
      <button className={classes.action} onClick={setAllCollapsed}>
        Collapse all
      </button>
      <Cost
        buildTime={buildingQueue.totalBuildingTime}
        infrastructureBuildTime={buildingQueue.infrastructureBuildingTime}
        resourcesBuildTime={buildingQueue.resourcesBuildingTime}
        split={shouldSplitBuildingTimes}
        resources={buildingQueue.totalCost}
      />
      <div className={classes.buildings}>
        {buildingQueue.buildingRanges.map((range) => {
          const [topBuilding] = range.buildings;
          const botBuilding = range.buildings[range.buildings.length - 1];
          const canBeCollapsed = topBuilding !== botBuilding;
          const isCollapsed = collapsedRangeIds.includes(range.id);

          if (isCollapsed) {
            return (
              <QueuedBuildingRange
                key={range.id}
                onExpand={() => onRangeExpand(range.id)}
                range={range}
                villageId={villageId}
              />
            );
          }

          return (
            <React.Fragment key={range.id}>
              {range.buildings.map((building) => (
                <QueuedBuilding
                  key={building.queueId}
                  building={building}
                  onCollapse={
                    canBeCollapsed ? () => onRangeCollapse(range.id) : undefined
                  }
                  villageId={villageId}
                />
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
