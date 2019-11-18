import { useQuery, useSubscription } from '@apollo/react-hooks';
import React, { useContext } from 'react';
import { BuildingsUpdated } from "*/graphql_operations/building.graphql";
import { GetBuildingsInProgress } from '*/graphql_operations/buildingInProgress.graphql';
import {
  IBuildingsUpdatedSubscription, IBuildingsUpdatedSubscriptionVariables,
  IGetBuildingsInProgressQuery,
  IGetBuildingsInProgressQueryVariables,
} from '../../../../_types/graphql';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';
import { BuildingInProgress } from './BuildingInProgress';

interface IProps {
  readonly className: string;
}

const BuildingsInProgress: React.FunctionComponent<IProps> = (props) => {
  const {
    className,
  } = props;

  const { villageId }= useContext<IVillageContext>(VillageContext);

  const { data, loading, refetch } = useQuery<IGetBuildingsInProgressQuery, IGetBuildingsInProgressQueryVariables>(GetBuildingsInProgress, {
    variables: { villageId },
    fetchPolicy: 'network-only',
  });

  useSubscription<IBuildingsUpdatedSubscription, IBuildingsUpdatedSubscriptionVariables>(BuildingsUpdated, {
    variables: { villageId },
    fetchPolicy: 'network-only',
    onSubscriptionData: () => refetch({ villageId }),
  });

  if (loading || !data) {
    return null;
  }

  return (
    <div className={className}>
      {data.buildingsInProgress.map((building, index) => (
        <BuildingInProgress key={index} building={building} />
      ))}
    </div>
  )
};

BuildingsInProgress.displayName = 'BuildingsInProgress';

export { BuildingsInProgress };
