import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import {
  useEffect,
  useState,
} from 'react';

import {
  NextTasksExecution,
  NextTasksExecutionChanged,
} from '*/graphql_operations/nextTaskExecution.graphql';

import {
  NextTasksExecutionChangedSubscription,
  NextTasksExecutionChangedSubscriptionVariables,
  NextTasksExecutionQuery,
  NextTasksExecutionQueryVariables,
  Timestamp,
} from '../../_graphql/types/graphql.type';
import { getSecondsUntilTimestamp } from '../../utils/getSecondsUntilTimestamp';

export const useNextTasksExecution = (): number => {
  const [nextExecutionIn, setNextExecutionIn] = useState(0);

  const nextExecutionResult = useQuery<NextTasksExecutionQuery, NextTasksExecutionQueryVariables>(
    NextTasksExecution,
  );

  const updateNextExecution = (nextTasksExecution: Timestamp): void => {
    const difference = getSecondsUntilTimestamp(nextTasksExecution);

    setNextExecutionIn(difference);
  };

  useEffect(() => {
    const { data, loading } = nextExecutionResult;

    if (!loading && data) {
      updateNextExecution(data.nextTasksExecution);
    }
  }, [nextExecutionResult]);

  useSubscription<NextTasksExecutionChangedSubscription, NextTasksExecutionChangedSubscriptionVariables>(
    NextTasksExecutionChanged,
    {
      onSubscriptionData: ({ subscriptionData: { data, loading } }) => {
        if (!loading && data) {
          updateNextExecution(data.nextTasksExecutionChanged);
        }
      },
    },
  );

  return nextExecutionIn;
};