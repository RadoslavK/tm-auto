import {
  useMutation,
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import { BuildingsUpdated } from '*/graphql_operations/building.graphql';
import {
  ClearQueue,
  GetQueuedBuildings,
  OnQueueUpdated,
} from '*/graphql_operations/queuedBuilding.graphql';

import {
  IBuildingsUpdatedSubscription,
  IBuildingsUpdatedSubscriptionVariables,
  IClearQueueMutation,
  IClearQueueMutationVariables,
  IGetQueuedBuildingsQuery,
  IGetQueuedBuildingsQueryVariables,
  IOnQueueUpdatedSubscription,
  IOnQueueUpdatedSubscriptionVariables,
} from '../../../_types/graphql';
import { useVillageContext } from '../../../hooks/useVillageContext';
import { Cost } from './Cost';
import { QueuedBuilding } from './QueuedBuilding';

interface IProps {
  readonly className: string;
}

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

export const BuildingQueue: React.FC<IProps> = (props) => {
  const {
    className,
  } = props;

  const classes = useStyles();

  const { villageId } = useVillageContext();
  const { data, loading, refetch } = useQuery<IGetQueuedBuildingsQuery, IGetQueuedBuildingsQueryVariables>(GetQueuedBuildings, {
    variables: { villageId },
  });

  useSubscription<IBuildingsUpdatedSubscription, IBuildingsUpdatedSubscriptionVariables>(BuildingsUpdated, {
    onSubscriptionData: () => {
      refetch();
    },
    variables: { villageId },
  });

  useSubscription<IOnQueueUpdatedSubscription, IOnQueueUpdatedSubscriptionVariables>(OnQueueUpdated, {
    onSubscriptionData: () => refetch(),
    variables: { villageId },
  });

  const [clearQueue] = useMutation<IClearQueueMutation, IClearQueueMutationVariables>(ClearQueue, {
    variables: { villageId },
  });

  if (loading || !data) {
    return null;
  }

  const {
    buildingQueue,
  } = data;

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
        {buildingQueue.buildings.map((building) => (
          <QueuedBuilding
            key={building.queueId}
            building={building}
          />
        ))}
      </div>
    </div>
  );
};
