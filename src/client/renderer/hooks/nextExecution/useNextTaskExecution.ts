import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import {
  useEffect,
  useState,
} from 'react';

import {
  NextTaskExecution,
  NextTaskExecutionChanged,
} from '*/graphql_operations/nextTaskExecution.graphql';

import {
  NextTaskExecutionChangedSubscription,
  NextTaskExecutionChangedSubscriptionVariables,
  NextTaskExecutionQuery,
  NextTaskExecutionQueryVariables,
  TaskType,
  Timestamp,
} from '../../_graphql/types/graphql.type';
import { getSecondsUntilTimestamp } from '../../utils/getSecondsUntilTimestamp';

export const useNextTaskExecution = (task: TaskType): number => {
  const [nextExecutionIn, setNextExecutionIn] = useState(0);

  const variables = { task };

  const nextExecutionResult = useQuery<NextTaskExecutionQuery, NextTaskExecutionQueryVariables>(
    NextTaskExecution,
    { variables },
  );

  const updateNextExecution = (nextTaskExecution: Timestamp): void => {
    const difference = getSecondsUntilTimestamp(nextTaskExecution);

    setNextExecutionIn(difference);
  };

  useEffect(() => {
    const { data, loading } = nextExecutionResult;

    if (!loading && data) {
      updateNextExecution(data.nextTaskExecution);
    }
  }, [nextExecutionResult]);

  useSubscription<NextTaskExecutionChangedSubscription, NextTaskExecutionChangedSubscriptionVariables>(
    NextTaskExecutionChanged,
    {
      onSubscriptionData: ({ subscriptionData: { data, loading } }) => {
        if (!loading && data) {
          updateNextExecution(data.nextTaskExecutionChanged);
        }
      },
      variables,
    },
  );

  return nextExecutionIn;
};
