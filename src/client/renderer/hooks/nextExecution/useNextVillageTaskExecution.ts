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
} from '*/graphql_operations/nextTaskExecution.graphql';

import {
  NextVillageTaskExecutionChangedSubscription,
  NextVillageTaskExecutionChangedSubscriptionVariables,
  NextVillageTaskExecutionQuery,
  NextVillageTaskExecutionQueryVariables,
  Timestamp,
  VillageTaskType,
} from '../../_graphql/types/graphql.type';
import { getSecondsUntilTimestamp } from '../../utils/getSecondsUntilTimestamp';

export const useNextVillageTaskExecution = (villageId: number, task: VillageTaskType): number => {
  const [nextExecutionIn, setNextExecutionIn] = useState(0);

  const variables = { task, villageId };

  const nextExecutionResult = useQuery<NextVillageTaskExecutionQuery, NextVillageTaskExecutionQueryVariables>(
    NextVillageTaskExecution,
    { variables },
  );

  const updateNextExecution = (timestamp: Timestamp): void => {
    const difference = getSecondsUntilTimestamp(timestamp);

    setNextExecutionIn(difference);
  };

  useEffect(() => {
    const { data, loading } = nextExecutionResult;

    if (!loading && data) {
      updateNextExecution(data.nextVillageTaskExecution);
    }
  }, [nextExecutionResult]);

  useSubscription<NextVillageTaskExecutionChangedSubscription, NextVillageTaskExecutionChangedSubscriptionVariables>(
    NextVillageTaskExecutionChanged,
    {
      onSubscriptionData: ({ subscriptionData: { data, loading } }) => {
        if (!loading && data) {
          updateNextExecution(data.nextVillageTaskExecutionChanged);
        }
      },
      variables,
    },
  );

  return nextExecutionIn;
};
