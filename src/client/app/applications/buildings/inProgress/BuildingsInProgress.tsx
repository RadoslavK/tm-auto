import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import React from 'react';

import { BuildingsUpdated } from '*/graphql_operations/building.graphql';
import { GetBuildingsInProgress } from '*/graphql_operations/buildingInProgress.graphql';

import {
  IBuildingsUpdatedSubscription,
  IBuildingsUpdatedSubscriptionVariables,
  IGetBuildingsInProgressQuery,
  IGetBuildingsInProgressQueryVariables,
} from '../../../../_types/graphql';
import { useVillageContext } from '../../../hooks/useVillageContext';
import { BuildingInProgress } from './BuildingInProgress';

interface IProps {
  readonly className?: string;
}

export const BuildingsInProgress: React.FC<IProps> = (props) => {
  const {
    className,
  } = props;

  const { villageId } = useVillageContext();

  const { data, loading, refetch } = useQuery<IGetBuildingsInProgressQuery, IGetBuildingsInProgressQueryVariables>(GetBuildingsInProgress, { variables: { villageId } });

  useSubscription<IBuildingsUpdatedSubscription, IBuildingsUpdatedSubscriptionVariables>(BuildingsUpdated, {
    onSubscriptionData: () => refetch(),
    variables: { villageId },
  });

  if (loading || !data) {
    return null;
  }

  return (
    <div className={className}>
      {data.buildingsInProgress.map((building) => (
        <BuildingInProgress
          key={`${building.fieldId}|${building.level}`}
          building={building}
        />
      ))}
    </div>
  );
};
