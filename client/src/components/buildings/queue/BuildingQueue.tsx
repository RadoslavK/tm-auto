import { GetVillageBuildingQueue } from '*/graphql_operations/building.graphql';
import React, { useContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { IGetVillageBuildingQueueQuery, IGetVillageBuildingQueueQueryVariables } from '../../../_types/graphql';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';
import { QueuedBuilding } from './QueuedBuilding';

const BuildingQueue: React.FunctionComponent = () => {
  const villageContext = useContext<IVillageContext>(VillageContext);
  const { data, loading } = useQuery<IGetVillageBuildingQueueQuery, IGetVillageBuildingQueueQueryVariables>(GetVillageBuildingQueue, {
    variables: {
      villageId: villageContext.villageId,
    },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return null;
  }

  const {
    buildingQueue,
  } = data;

  return (
    <div>
      {buildingQueue.map((queuedBuilding, index) => (
        <QueuedBuilding key={index} queuedBuilding={queuedBuilding}/>
      ))}
    </div>
  )
};

BuildingQueue.displayName = 'BuildingQueue';

export { BuildingQueue };
