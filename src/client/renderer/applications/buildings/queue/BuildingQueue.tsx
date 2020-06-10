import makeStyles from '@material-ui/core/styles/makeStyles';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  OnQueueUpdatedDocument,
  OnQueueUpdatedSubscription,
  OnQueueUpdatedSubscriptionVariables,
  useClearQueueMutation,
  useGetQueuedBuildingsQuery,
} from '../../../_graphql/graphqlHooks';
import { useVillageContext } from '../../villages/context/villageContext';
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
  const { villageId } = useVillageContext();

  const { data: queryData, loading: queryLoading, subscribeToMore } = useGetQueuedBuildingsQuery({ variables: { villageId } });

  useEffect(() => {
    subscribeToMore<OnQueueUpdatedSubscription, OnQueueUpdatedSubscriptionVariables>({
      document: OnQueueUpdatedDocument,
      variables: { villageId },
      updateQuery: (_prev, { subscriptionData: { data } }) => ({ buildingQueue: data.queueUpdated }),
    });
  }, [subscribeToMore, villageId]);

  return queryLoading || !queryData
    ? null
    : queryData.buildingQueue;
};

export const BuildingQueue: React.FC<Props> = ({ className }) => {
  const classes = useStyles();
  // TODO store in graphql cache/local state
  const [collapsedRanges, setCollapsedRanges] = useState<readonly string[]>([]);

  const { villageId } = useVillageContext();
  const buildingQueue = useBuildingQueue();
  const [clearQueue] = useClearQueueMutation({ variables: { villageId } });

  const setAllCollapsed = useCallback(() => {
    if (buildingQueue?.buildingRanges) {
      setCollapsedRanges(buildingQueue.buildingRanges.reduce(
        (all, r) => [...all, r.id],
        [] as string[],
      ));
    }
  }, [buildingQueue?.buildingRanges]);

  if (!buildingQueue) {
    return null;
  }

  const onRangeCollapse = (rangeId: string) => {
    setCollapsedRanges(prevRanges => prevRanges.concat([rangeId]));
  };

  const onRangeExpand = (rangeId: string) => {
    setCollapsedRanges(prevRanges => prevRanges.filter(id => id !== rangeId));
  };

  const onClear = async (): Promise<void> => {
    await clearQueue();
  };

  return (
    <div className={className}>
      <button
        className={classes.action}
        onClick={onClear}
      >
        Clear queue
      </button>
      <button
        className={classes.action}
        onClick={setAllCollapsed}
      >
        Collapse all
      </button>
      <Cost cost={buildingQueue.totalCost} />
      <div className={classes.buildings}>
        {buildingQueue.buildingRanges.map((range) => {
          const topBuilding = range.buildings[0];
          const botBuilding = range.buildings[range.buildings.length - 1];
          const canBeCollapsed = topBuilding !== botBuilding;
          const isCollapsed = collapsedRanges.includes(range.id);

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
              {range.buildings.map(building => (
                <QueuedBuilding
                  key={building.queueId}
                  building={building}
                  onCollapse={canBeCollapsed ? () => onRangeCollapse(range.id) : undefined}
                />
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
