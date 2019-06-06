import { GetBuildingSpots } from '*/graphql_operations/building.graphql';
import React, { useContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import {
  IGetBuildingSpotsQuery,
  IGetBuildingSpotsQueryVariables,
} from '../../../_types/graphql';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';
import { BuildingSpot } from './BuildingSpot';

const BuildingSpots: React.FunctionComponent = () => {
  const villageContext = useContext<IVillageContext>(VillageContext);
  const { data, loading } = useQuery<IGetBuildingSpotsQuery, IGetBuildingSpotsQueryVariables>(GetBuildingSpots, {
    variables: {
      villageId: villageContext.villageId,
    },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return null;
  }

  const { buildingSpots } = data;

  return (
    <div>
      {buildingSpots.map((building, index) => (
        <BuildingSpot key={index} building={building} />
      ))}
    </div>
  );
};

BuildingSpots.displayName = 'BuildingSpots';

export { BuildingSpots };
