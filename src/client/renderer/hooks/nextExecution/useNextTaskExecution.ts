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
  INextTaskExecutionChangedSubscription,
  INextTaskExecutionChangedSubscriptionVariables,
  INextTaskExecutionQuery,
  INextTaskExecutionQueryVariables,
  ITimestamp,
  TaskType,
} from '../../_types/graphql';
import { getSecondsUntilTimestamp } from '../../utils/getSecondsUntilTimestamp';

export const useNextTaskExecution = (task: TaskType): number => {
  const [nextExecutionIn, setNextExecutionIn] = useState(0);

  const variables = { task };

  const nextExecutionResult = useQuery<INextTaskExecutionQuery, INextTaskExecutionQueryVariables>(
    NextTaskExecution,
    { variables },
  );

  const updateNextExecution = (nextTaskExecution: ITimestamp): void => {
    const difference = getSecondsUntilTimestamp(nextTaskExecution);

    setNextExecutionIn(difference);
  };

  useEffect(() => {
    const { data, loading } = nextExecutionResult;

    if (!loading && data) {
      updateNextExecution(data.nextTaskExecution);
    }
  }, [nextExecutionResult]);

  useSubscription<INextTaskExecutionChangedSubscription, INextTaskExecutionChangedSubscriptionVariables>(
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
