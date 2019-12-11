import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import {
  useEffect,
  useState,
} from 'react';

import {
  NextVillageTaskExecution,
  NextVillageTaskExecutionChanged,
} from "*/graphql_operations/nextTaskExecution.graphql";

import {
  INextVillageTaskExecutionChangedSubscription,
  INextVillageTaskExecutionChangedSubscriptionVariables,
  INextVillageTaskExecutionQuery,
  INextVillageTaskExecutionQueryVariables,
  VillageTaskType,
} from '../../_types/graphql';

export const useNextVillageTaskExecution = (villageId: number, task: VillageTaskType): number => {
  const [nextExecutionIn, setNextExecutionIn] = useState(0);

  const variables = { villageId, task };

  const nextExecutionResult = useQuery<INextVillageTaskExecutionQuery, INextVillageTaskExecutionQueryVariables>(NextVillageTaskExecution, {
    variables,
  });

  useEffect(() => {
    if (!nextExecutionResult.loading && nextExecutionResult.data) {
      const difference = Math.max(0, nextExecutionResult.data.nextVillageTaskExecution.totalSeconds - Math.floor(new Date().getTime() / 1000));
      setNextExecutionIn(difference);
    }
  }, [nextExecutionResult]);

  useSubscription<INextVillageTaskExecutionChangedSubscription, INextVillageTaskExecutionChangedSubscriptionVariables>(NextVillageTaskExecutionChanged, {
    variables,
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.loading && subscriptionData.data) {
        const difference = Math.max(0, subscriptionData.data.nextVillageTaskExecutionChanged.totalSeconds - Math.floor(new Date().getTime() / 1000));
        setNextExecutionIn(difference);
      }
    },
  });

  return nextExecutionIn;
};
