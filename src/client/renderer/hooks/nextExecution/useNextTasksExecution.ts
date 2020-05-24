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
  INextTasksExecutionChangedSubscription,
  INextTasksExecutionChangedSubscriptionVariables,
  INextTasksExecutionQuery,
  INextTasksExecutionQueryVariables,
  ITimestamp,
} from '../../_types/graphql';
import { getSecondsUntilTimestamp } from '../../utils/getSecondsUntilTimestamp';

export const useNextTasksExecution = (): number => {
  const [nextExecutionIn, setNextExecutionIn] = useState(0);

  const nextExecutionResult = useQuery<INextTasksExecutionQuery, INextTasksExecutionQueryVariables>(
    NextTasksExecution,
  );

  const updateNextExecution = (nextTasksExecution: ITimestamp): void => {
    const difference = getSecondsUntilTimestamp(nextTasksExecution);

    setNextExecutionIn(difference);
  };

  useEffect(() => {
    const { data, loading } = nextExecutionResult;

    if (!loading && data) {
      updateNextExecution(data.nextTasksExecution);
    }
  }, [nextExecutionResult]);

  useSubscription<INextTasksExecutionChangedSubscription, INextTasksExecutionChangedSubscriptionVariables>(
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