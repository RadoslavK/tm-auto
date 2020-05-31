import {
  useEffect,
  useState,
} from 'react';

import {
  TaskType,
  Timestamp,
  useNextTaskExecutionChangedSubscription,
  useNextTaskExecutionQuery,
  useResetNextTaskExecutionMutation,
  useSetNextTaskExecutionMutation,
} from '../../_graphql/graphqlHooks';
import { getSecondsUntilTimestamp } from '../../utils/getSecondsUntilTimestamp';

export const useNextTaskExecution = (task: TaskType) => {
  const [nextExecutionIn, setNextExecutionIn] = useState(0);

  const nextExecutionResult = useNextTaskExecutionQuery({ variables: { task } });

  const updateNextExecution = (nextTaskExecution: Timestamp): void => {
    const difference = getSecondsUntilTimestamp(nextTaskExecution);

    setNextExecutionIn(difference);
  };

  useEffect(() => {
    if (!nextExecutionResult.loading && nextExecutionResult.data) {
      updateNextExecution(nextExecutionResult.data.nextTaskExecution);
    }
  }, [nextExecutionResult]);

  const [setNextTaskExecution, updateResult] = useSetNextTaskExecutionMutation();

  useEffect(() => {
    if (!updateResult.loading && updateResult.data) {
      updateNextExecution(updateResult.data.setNextTaskExecution);
    }
  }, [updateResult]);

  const [resetNextTaskExecution, resetResult] = useResetNextTaskExecutionMutation();

  useEffect(() => {
    if (!resetResult.loading && resetResult.data) {
      updateNextExecution(resetResult.data.resetNextTaskExecution);
    }
  }, [resetResult]);

  useNextTaskExecutionChangedSubscription({
    onSubscriptionData: ({ subscriptionData: { data, loading } }) => {
      if (!loading && data) {
        updateNextExecution(data.nextTaskExecutionChanged);
      }
    },
    variables: { task },
  });

  return {
    nextExecutionIn,
    setNextTaskExecution,
    resetNextTaskExecution,
  };
};
