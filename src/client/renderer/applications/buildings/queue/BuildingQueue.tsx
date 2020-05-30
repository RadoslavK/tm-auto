import {
  useMutation,
  useQuery,
  useSubscription,
} from '@apollo/client';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import { BuildingsUpdated } from '*/graphql_operations/building.graphql';
import {
  ClearQueue,
  GetQueuedBuildings,
  OnQueueUpdated,
} from '*/graphql_operations/queuedBuilding.graphql';

import {
  BuildingsUpdatedSubscription,
  BuildingsUpdatedSubscriptionVariables,
  ClearQueueMutation,
  ClearQueueMutationVariables,
  GetQueuedBuildingsQuery,
  GetQueuedBuildingsQueryVariables,
  OnQueueUpdatedSubscription,
  OnQueueUpdatedSubscriptionVariables,
} from '../../../_graphql/types/graphql.type';
import { useVillageContext } from '../../villages/context/villageContext';
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

export const BuildingQueue: React.FC<Props> = (props) => {
  const {
    className,
  } = props;

  const classes = useStyles();

  const { villageId } = useVillageContext();
  const { data, loading, refetch } = useQuery<GetQueuedBuildingsQuery, GetQueuedBuildingsQueryVariables>(GetQueuedBuildings, {
    variables: { villageId },
  });

  useSubscription<BuildingsUpdatedSubscription, BuildingsUpdatedSubscriptionVariables>(BuildingsUpdated, {
    onSubscriptionData: () => {
      refetch();
    },
    variables: { villageId },
  });

  useSubscription<OnQueueUpdatedSubscription, OnQueueUpdatedSubscriptionVariables>(OnQueueUpdated, {
    onSubscriptionData: () => refetch(),
    variables: { villageId },
  });

  const [clearQueue] = useMutation<ClearQueueMutation, ClearQueueMutationVariables>(ClearQueue, {
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
