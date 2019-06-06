import { GetVillageBuildings } from '*/graphql_operations/building.graphql';
import React, { useContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import {
  IGetVillageBuildingsQuery,
  IGetVillageBuildingsQueryVariables,
} from '../../../_types/graphql';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';
import { BuildingSpot } from './BuildingSpot';

const BuildingSpots: React.FunctionComponent = () => {
  const villageContext = useContext<IVillageContext>(VillageContext);
  const { data, loading } = useQuery<IGetVillageBuildingsQuery, IGetVillageBuildingsQueryVariables>(GetVillageBuildings, {
    variables: {
      villageId: villageContext.villageId,
    },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return null;
  }

  const { buildings } = data;

  return (
    <div>
      {buildings.map((building, index) => (
        <BuildingSpot key={index} building={building} />
      ))}
    </div>
  );
};

BuildingSpots.displayName = 'BuildingSpots';

export { BuildingSpots };
