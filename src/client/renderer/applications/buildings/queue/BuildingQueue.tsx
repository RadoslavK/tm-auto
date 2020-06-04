import makeStyles from '@material-ui/core/styles/makeStyles';
import React, {
  useEffect,
  useState,
} from 'react';

import {
  GetQueuedBuildingsQuery,
  useClearQueueMutation,
  useGetQueuedBuildingsQuery,
  useOnQueueUpdatedSubscription,
} from '../../../_graphql/graphqlHooks';
import { useVillageContext } from '../../villages/context/villageContext';
import {
  BuildingQueueDropArea,
  DropPosition,
} from './BuildingQueueDropArea';
import { Cost } from './Cost';
import { QueuedBuilding } from './QueuedBuilding';

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
  },
});

const useBuildingQueue = () => {
  const { villageId } = useVillageContext();

  const [buildingQueue, setBuildingQueue] = useState<GetQueuedBuildingsQuery['buildingQueue']>();

  const queryResult = useGetQueuedBuildingsQuery({ variables: { villageId } });

  useEffect(() => {
    if (!queryResult.loading && queryResult.data) {
      setBuildingQueue(queryResult.data.buildingQueue);
    }
  }, [queryResult]);

  useOnQueueUpdatedSubscription({
    onSubscriptionData: ({ subscriptionData: { data, loading } }) => {
      if (!loading && data) {
        setBuildingQueue(data.onQueueUpdated);
      }
    },
    variables: { villageId },
  });

  return buildingQueue;
};

export const BuildingQueue: React.FC<Props> = ({ className }) => {
  const classes = useStyles();

  const { villageId } = useVillageContext();
  const buildingQueue = useBuildingQueue();
  const [clearQueue] = useClearQueueMutation({ variables: { villageId } });

  if (!buildingQueue) {
    return null;
  }

  const onClear = async (): Promise<void> => {
    await clearQueue();
  };

  return (
    <div className={className}>
      <button
        className={classes.action}
        onClick={onClear}
        type="submit"
      >
        Clear queue
      </button>
      <Cost cost={buildingQueue.totalCost} />
      <div className={classes.buildings}>
        {buildingQueue.buildings.map((building, index) => (
          <BuildingQueueDropArea
            key={building.queueId}
            getBuilding={movedBuildingIndex => buildingQueue.buildings[movedBuildingIndex]}
            getDropPosition={queueIndex => queueIndex > index
              ? DropPosition.Above
              : DropPosition.Below}
            queueIndex={index}
          >
            <QueuedBuilding
              building={building}
              queueIndex={index}
            />
          </BuildingQueueDropArea>
        ))}
      </div>
    </div>
  );
};
