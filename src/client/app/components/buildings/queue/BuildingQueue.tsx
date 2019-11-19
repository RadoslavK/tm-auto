import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useContext } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/react-hooks';
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
} from '../../../../_types/graphql';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';
import { Cost } from './Cost';
import { QueuedBuilding } from './QueuedBuilding';

interface IProps {
  readonly className: string;
}

const useStyles = makeStyles({
  action: {
    width: '100%',
    marginBottom: '15px',
  },
  buildings: {
    display: 'flex',
    flexDirection: 'column',
  },
});

export const BuildingQueue: React.FC<IProps> = (props) => {
  const {
    className
  } = props;

  const classes = useStyles({});

  const { villageId } = useContext<IVillageContext>(VillageContext);
  const { data, loading, refetch } = useQuery<IGetQueuedBuildingsQuery, IGetQueuedBuildingsQueryVariables>(GetQueuedBuildings, {
    variables: { villageId },
  });

  useSubscription<IBuildingsUpdatedSubscription, IBuildingsUpdatedSubscriptionVariables>(BuildingsUpdated, {
    variables: { villageId },
    onSubscriptionData: () => {
      refetch();
    },
  });

  useSubscription<IOnQueueUpdatedSubscription, IOnQueueUpdatedSubscriptionVariables>(OnQueueUpdated, {
    variables: { villageId },
    onSubscriptionData: () => refetch(),
  });

  const [clearQueue] = useMutation<IClearQueueMutation, IClearQueueMutationVariables>(ClearQueue, {
    variables: {villageId },
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
      <button type="submit" onClick={onClear} className={classes.action}>
        Clear queue
      </button>
      <Cost cost={buildingQueue.totalCost} />
      <div className={classes.buildings}>
        {buildingQueue.buildings.map((building, index) => (
          <QueuedBuilding key={index} building={building}/>
        ))}
      </div>
    </div>
  )
};
