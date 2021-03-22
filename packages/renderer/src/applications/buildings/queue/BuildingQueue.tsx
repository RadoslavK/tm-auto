import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useCallback } from 'react';
import {
  useLazyLoadQuery,
  useMutation,
} from 'react-relay/hooks';

import type { BuildingQueueBuildingTimesSplitInfoQuery } from '../../../_graphql/__generated__/BuildingQueueBuildingTimesSplitInfoQuery.graphql.js';
import type { BuildingQueueClearQueueMutation } from '../../../_graphql/__generated__/BuildingQueueClearQueueMutation.graphql.js';
import type { BuildingQueueQuery } from '../../../_graphql/__generated__/BuildingQueueQuery.graphql.js';
import { QueuedBuilding } from './building/QueuedBuilding.js';
import { Cost } from './Cost.js';
import { QueuedBuildingRange } from './range/QueuedBuildingRange.js';

type Props = {
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

const buildingQueueQuery = graphql`
  query BuildingQueueQuery($villageId: ID!) {
      buildingQueue(villageId: $villageId) {
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

export const BuildingQueue: React.FC<Props> = ({ className }) => {
  const villageId = '';

  const { gameInfo, autoBuildSettings } = useLazyLoadQuery<BuildingQueueBuildingTimesSplitInfoQuery>(buildingQueueBuildingTimesSplitInfoQuery, { villageId });
  const shouldSplitBuildingTimes = gameInfo.tribe === 'Romans' && autoBuildSettings.dualQueue.allow;

  const { buildingQueue } = useLazyLoadQuery<BuildingQueueQuery>(buildingQueueQuery, { villageId });

  const classes = useStyles();

  const [clearQueue] = useMutation<BuildingQueueClearQueueMutation>(buildingQueueClearQueueMutation);
  const collapsedRangeIds = [] as any[];
  //  TODO
  // useGetCollapsedBuildingQueueRangesQuery({
  //   variables: {
  //     villageId,
  //   },
  // }).data?.collapsedBuildingQueueRanges || [];

  const setAllCollapsed = useCallback(() => {
    if (buildingQueue?.buildingRanges) {
      //  TODO
      // updateCollapsedBuildingQueueRangeIds(
      //   villageId,
      //   buildingQueue.buildingRanges.reduce(
      //     (all, r) => (r.buildings.length > 1 ? [...all, r.id] : all),
      //     [] as string[],
      //   ),
      // );
    }
  }, [buildingQueue?.buildingRanges, villageId]);

  if (!buildingQueue) {
    return null;
  }

  const onRangeCollapse = (rangeId: string) => {
    console.log(rangeId);
    // TODO
    // updateCollapsedBuildingQueueRangeIds(
    //   villageId,
    //   collapsedRangeIds.concat([rangeId]),
    // );
  };

  const onRangeExpand = (rangeId: string) => {
    console.log(rangeId);
    // TODO
    // updateCollapsedBuildingQueueRangeIds(
    //   villageId,
    //   collapsedRangeIds.filter((id) => id !== rangeId),
    // );
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
                />
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
