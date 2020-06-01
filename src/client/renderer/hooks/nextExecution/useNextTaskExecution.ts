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

  const { data: queryData, loading: queryLoading } = useNextTaskExecutionQuery({ variables: { task } });

  const updateNextExecution = (nextTaskExecution: Timestamp): void => {
    const difference = getSecondsUntilTimestamp(nextTaskExecution);

    setNextExecutionIn(difference);
  };

  useEffect(() => {
    if (!queryLoading && queryData) {
      updateNextExecution(queryData.nextTaskExecution);
    }
  }, [queryData, queryLoading]);

  const [setNextTaskExecution, { data: updateData, loading: updateLoading }] = useSetNextTaskExecutionMutation();

  useEffect(() => {
    if (!updateLoading && updateData) {
      updateNextExecution(updateData.setNextTaskExecution);
    }
  }, [updateData, updateLoading]);

  const [resetNextTaskExecution, { data: resetData, loading: resetLoading }] = useResetNextTaskExecutionMutation();

  useEffect(() => {
    if (!resetLoading && resetData) {
      updateNextExecution(resetData.resetNextTaskExecution);
    }
  }, [resetData, resetLoading]);

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
