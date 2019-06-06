import { ClearQueue, GetBuildingSpots, GetQueuedBuildings } from '*/graphql_operations/building.graphql';
import React, { useContext } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import {
  IClearQueueMutation, IClearQueueMutationVariables,
  IGetQueuedBuildingsQuery,
  IGetQueuedBuildingsQueryVariables,
} from '../../../_types/graphql';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';
import { QueuedBuilding } from './QueuedBuilding';

const BuildingQueue: React.FunctionComponent = () => {
  const villageContext = useContext<IVillageContext>(VillageContext);
  const { data, loading } = useQuery<IGetQueuedBuildingsQuery, IGetQueuedBuildingsQueryVariables>(GetQueuedBuildings, {
    variables: {
      villageId: villageContext.villageId,
    },
    fetchPolicy: 'network-only',
  });

  const clearQueue = useMutation<IClearQueueMutation, IClearQueueMutationVariables>(ClearQueue, {
    variables: {
      input: {
        villageId: villageContext.villageId,
      },
    },
    refetchQueries: [
      { query: GetBuildingSpots, variables: { villageId: villageContext.villageId  } },
      { query: GetQueuedBuildings, variables: { villageId: villageContext.villageId  } },
    ],
  });

  if (loading) {
    return null;
  }

  const {
    queuedBuildings,
  } = data;

  return (
    <div>
      <button onClick={async e => {
        e.preventDefault();

        await clearQueue();
      }}>
        Clear queue
      </button>
      {queuedBuildings.map((building, index) => (
        <QueuedBuilding key={index} building={building}/>
      ))}
    </div>
  )
};

BuildingQueue.displayName = 'BuildingQueue';

export { BuildingQueue };
