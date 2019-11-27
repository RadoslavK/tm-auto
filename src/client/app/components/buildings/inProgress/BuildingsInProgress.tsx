import { useQuery, useSubscription } from '@apollo/react-hooks';
import React from 'react';
import { BuildingsUpdated } from "*/graphql_operations/building.graphql";
import { GetBuildingsInProgress } from '*/graphql_operations/buildingInProgress.graphql';
import {
  IBuildingsUpdatedSubscription, IBuildingsUpdatedSubscriptionVariables,
  IGetBuildingsInProgressQuery,
  IGetBuildingsInProgressQueryVariables,
} from '../../../../_types/graphql';
import { BuildingInProgress } from './BuildingInProgress';
import { useVillageContext } from '../../../hooks/useVillageContext';

interface IProps {
  readonly className: string;
}

export const BuildingsInProgress: React.FC<IProps> = (props) => {
  const {
    className,
  } = props;

  const { villageId } = useVillageContext();

  const { data, loading, refetch } = useQuery<IGetBuildingsInProgressQuery, IGetBuildingsInProgressQueryVariables>(GetBuildingsInProgress, {
    variables: { villageId },
  });

  useSubscription<IBuildingsUpdatedSubscription, IBuildingsUpdatedSubscriptionVariables>(BuildingsUpdated, {
    variables: { villageId },
    onSubscriptionData: () => refetch(),
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
  );
};