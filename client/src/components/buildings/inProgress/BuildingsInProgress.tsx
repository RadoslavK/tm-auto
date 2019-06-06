import { GetBuildingsInProgress } from '*/graphql_operations/building.graphql';
import React, { useContext } from 'react';
import { useQuery } from 'react-apollo-hooks';
import { IGetBuildingsInProgressQuery, IGetBuildingsInProgressQueryVariables } from '../../../_types/graphql';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';
import { BuildingInProgress } from './BuildingInProgress';

const BuildingsInProgress: React.FunctionComponent = () => {
  const villageContext = useContext<IVillageContext>(VillageContext);

  const { data, loading } = useQuery<IGetBuildingsInProgressQuery, IGetBuildingsInProgressQueryVariables>(GetBuildingsInProgress, {
    variables: {
      villageId: villageContext.villageId,
    },
    fetchPolicy: 'network-only',
  });

  if (loading) {
    return null;
  }

  return (
    <div>
      {data.buildingsInProgress.map((building, index) => (
        <BuildingInProgress key={index} building={building} />
      ))}
    </div>
  )
};

BuildingsInProgress.displayName = 'BuildingsInProgress';

export { BuildingsInProgress };
