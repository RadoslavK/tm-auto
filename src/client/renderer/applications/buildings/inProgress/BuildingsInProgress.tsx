import React, { useEffect } from 'react';

import {
  OnBuildingsInProgressUpdatedDocument,
  OnBuildingsInProgressUpdatedSubscription,
  OnBuildingsInProgressUpdatedSubscriptionVariables,
  useGetBuildingsInProgressQuery,
} from '../../../_graphql/graphqlHooks';
import { useSelectedVillageId } from '../../../hooks/villages/useSelectedVillageId';
import { BuildingInProgress } from './BuildingInProgress';

type Props = {
  readonly className?: string;
};

const useBuildingsInProgress = () => {
  const villageId = useSelectedVillageId();

  const {
    data: queryData,
    loading: queryLoading,
    subscribeToMore,
  } = useGetBuildingsInProgressQuery({
    variables: { villageId },
  });

  useEffect(() => {
    subscribeToMore<
      OnBuildingsInProgressUpdatedSubscription,
      OnBuildingsInProgressUpdatedSubscriptionVariables
    >({
      document: OnBuildingsInProgressUpdatedDocument,
      variables: { villageId },
      updateQuery: (_prev, { subscriptionData: { data } }) => ({
        buildingsInProgress: data.buildingsInProgressUpdated,
      }),
    });
  }, [subscribeToMore, villageId]);

  return queryLoading || !queryData ? [] : queryData.buildingsInProgress;
};

export const BuildingsInProgress: React.FC<Props> = ({ className }) => {
  const buildingsInProgress = useBuildingsInProgress();

  return (
    <div className={className}>
      {buildingsInProgress.map((building) => (
        <BuildingInProgress
          key={`${building.fieldId}|${building.level}`}
          building={building}
        />
      ))}
    </div>
  );
};
