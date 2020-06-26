import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useCallback, useEffect } from 'react';

import { updateCollapsedBuildingQueueRangeIds } from '../../../_graphql/cache/cache';
import {
  OnQueueUpdatedDocument,
  OnQueueUpdatedSubscription,
  OnQueueUpdatedSubscriptionVariables,
  Tribe,
  useClearQueueMutation,
  useGetCollapsedBuildingQueueRangesQuery,
  useGetQueuedBuildingsQuery,
} from '../../../_graphql/graphqlHooks';
import { useGameInfo } from '../../../hooks/useGameInfp';
import { useSelectedVillageId } from '../../../hooks/villages/useSelectedVillageId';
import { useAutoBuildSettings } from '../../settings/village/AutoBuildSettings';
import { QueuedBuilding } from './building/QueuedBuilding';
import { Cost } from './Cost';
import { QueuedBuildingRange } from './range/QueuedBuildingRange';

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

const useBuildingQueue = () => {
  const villageId = useSelectedVillageId();

  const {
    data: queryData,
    loading: queryLoading,
    subscribeToMore,
  } = useGetQueuedBuildingsQuery({
    variables: { villageId },
  });

  useEffect(() => {
    subscribeToMore<
      OnQueueUpdatedSubscription,
      OnQueueUpdatedSubscriptionVariables
    >({
      document: OnQueueUpdatedDocument,
      variables: { villageId },
      updateQuery: (_prev, { subscriptionData: { data } }) => ({
        buildingQueue: data.queueUpdated,
      }),
    });
  }, [subscribeToMore, villageId]);

  return queryLoading || !queryData ? null : queryData.buildingQueue;
};

const useShouldSplitBuildingTimes = (): boolean => {
  const villageId = useSelectedVillageId();

  const { tribe } = useGameInfo() || {};
  const { settings } = useAutoBuildSettings(villageId);

  return tribe === Tribe.Romans && !!settings && settings.dualQueue.allow;
};

export const BuildingQueue: React.FC<Props> = ({ className }) => {
  const classes = useStyles();

  const splitBuildingTimes = useShouldSplitBuildingTimes();

  const villageId = useSelectedVillageId();
  const buildingQueue = useBuildingQueue();
  const [clearQueue] = useClearQueueMutation({ variables: { villageId } });
  const collapsedRangeIds =
    useGetCollapsedBuildingQueueRangesQuery({
      variables: {
        villageId,
      },
    }).data?.collapsedBuildingQueueRanges || [];

  const setAllCollapsed = useCallback(() => {
    if (buildingQueue?.buildingRanges) {
      updateCollapsedBuildingQueueRangeIds(
        villageId,
        buildingQueue.buildingRanges.reduce(
          (all, r) => (r.buildings.length > 1 ? [...all, r.id] : all),
          [] as string[],
        ),
      );
    }
  }, [buildingQueue?.buildingRanges, villageId]);

  if (!buildingQueue) {
    return null;
  }

  const onRangeCollapse = (rangeId: string) => {
    updateCollapsedBuildingQueueRangeIds(
      villageId,
      collapsedRangeIds.concat([rangeId]),
    );
  };

  const onRangeExpand = (rangeId: string) => {
    updateCollapsedBuildingQueueRangeIds(
      villageId,
      collapsedRangeIds.filter((id) => id !== rangeId),
    );
  };

  const onClear = async (): Promise<void> => {
    await clearQueue();
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
        split={splitBuildingTimes}
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
