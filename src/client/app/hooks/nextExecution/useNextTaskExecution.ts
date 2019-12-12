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
} from "*/graphql_operations/nextTaskExecution.graphql";

import {
  INextTaskExecutionChangedSubscription,
  INextTaskExecutionChangedSubscriptionVariables,
  INextTaskExecutionQuery,
  INextTaskExecutionQueryVariables,
  TaskType,
} from '../../../_types/graphql';

export const useNextTaskExecution = (task: TaskType): number => {
  const [nextExecutionIn, setNextExecutionIn] = useState(0);

  const variables = { task };

  const nextExecutionResult = useQuery<INextTaskExecutionQuery, INextTaskExecutionQueryVariables>(NextTaskExecution, {
    variables,
  });

  useEffect(() => {
    if (!nextExecutionResult.loading && nextExecutionResult.data) {
      const difference = Math.max(0, nextExecutionResult.data.nextTaskExecution.totalSeconds - Math.floor(new Date().getTime() / 1000));
      setNextExecutionIn(difference);
    }
  }, [nextExecutionResult]);

  useSubscription<INextTaskExecutionChangedSubscription, INextTaskExecutionChangedSubscriptionVariables>(NextTaskExecutionChanged, {
    variables,
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.loading && subscriptionData.data) {
        const difference = Math.max(0, subscriptionData.data.nextTaskExecutionChanged.totalSeconds - Math.floor(new Date().getTime() / 1000));
        setNextExecutionIn(difference);
      }
    },
  });

  return nextExecutionIn;
};
