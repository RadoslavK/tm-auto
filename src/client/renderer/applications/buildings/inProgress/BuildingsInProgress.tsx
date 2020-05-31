import React, {
  useEffect,
  useState,
} from 'react';

import {
  GetBuildingsInProgressQuery,
  useBuildingsInProgressUpdatedSubscription,
  useGetBuildingsInProgressQuery,
} from '../../../_graphql/graphqlHooks';
import { useVillageContext } from '../../villages/context/villageContext';
import { BuildingInProgress } from './BuildingInProgress';

type Props = {
  readonly className?: string;
};

const useBuildingsInProgress = () => {
  const { villageId } = useVillageContext();

  const [buildingsInProgress, setBuildingsInProgress] = useState<GetBuildingsInProgressQuery['buildingsInProgress']>();

  const queryResult = useGetBuildingsInProgressQuery({ variables: { villageId } });

  useEffect(() => {
    if (!queryResult.loading && queryResult.data) {
      setBuildingsInProgress(queryResult.data.buildingsInProgress);
    }
  }, [queryResult]);

  useBuildingsInProgressUpdatedSubscription({
    onSubscriptionData: ({ subscriptionData: { data, loading } }) => {
      if (data && !loading) {
        setBuildingsInProgress(data.buildingsInProgressUpdated);
      }
    },
    variables: { villageId },
  });

  return buildingsInProgress;
};

export const BuildingsInProgress: React.FC<Props> = ({ className }) => {
  const buildingsInProgress = useBuildingsInProgress();

  if (!buildingsInProgress) {
    return null;
  }

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
