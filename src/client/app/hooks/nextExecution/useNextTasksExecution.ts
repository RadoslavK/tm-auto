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
} from "*/graphql_operations/nextTaskExecution.graphql";

import {
  INextTasksExecutionChangedSubscription,
  INextTasksExecutionChangedSubscriptionVariables,
  INextTasksExecutionQuery,
  INextTasksExecutionQueryVariables,
} from '../../../_types/graphql';

export const useNextTasksExecution = (): number => {
  const [nextExecutionIn, setNextExecutionIn] = useState(0);

  const nextExecutionResult = useQuery<INextTasksExecutionQuery, INextTasksExecutionQueryVariables>(NextTasksExecution);

  useEffect(() => {
    if (!nextExecutionResult.loading && nextExecutionResult.data) {
      const difference = Math.max(0, nextExecutionResult.data.nextTasksExecution.totalSeconds - Math.floor(new Date().getTime() / 1000));
      setNextExecutionIn(difference);
    }
  }, [nextExecutionResult]);

  useSubscription<INextTasksExecutionChangedSubscription, INextTasksExecutionChangedSubscriptionVariables>(NextTasksExecutionChanged, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.loading && subscriptionData.data) {
        const difference = Math.max(0, subscriptionData.data.nextTasksExecutionChanged.totalSeconds - Math.floor(new Date().getTime() / 1000));
        setNextExecutionIn(difference);
      }
    },
  });

  return nextExecutionIn;
};
