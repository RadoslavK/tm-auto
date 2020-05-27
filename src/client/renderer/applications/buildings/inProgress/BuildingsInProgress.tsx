import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import React from 'react';

import { BuildingsUpdated } from '*/graphql_operations/building.graphql';
import { GetBuildingsInProgress } from '*/graphql_operations/buildingInProgress.graphql';

import {
  BuildingsUpdatedSubscription,
  BuildingsUpdatedSubscriptionVariables,
  GetBuildingsInProgressQuery,
  GetBuildingsInProgressQueryVariables,
} from '../../../_types/graphql';
import { useVillageContext } from '../../villages/context/villageContext';
import { BuildingInProgress } from './BuildingInProgress';

type Props = {
  readonly className?: string;
};

export const BuildingsInProgress: React.FC<Props> = (props) => {
  const {
    className,
  } = props;

  const { villageId } = useVillageContext();

  const { data, loading, refetch } = useQuery<GetBuildingsInProgressQuery, GetBuildingsInProgressQueryVariables>(GetBuildingsInProgress, { variables: { villageId } });

  useSubscription<BuildingsUpdatedSubscription, BuildingsUpdatedSubscriptionVariables>(BuildingsUpdated, {
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
