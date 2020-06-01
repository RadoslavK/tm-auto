import {
  useEffect,
  useState,
} from 'react';

import {
  Timestamp,
  useNextTasksExecutionChangedSubscription,
  useNextTasksExecutionQuery,
  useResetNextTasksExecutionMutation,
  useSetNextTasksExecutionMutation,
} from '../../_graphql/graphqlHooks';
import { getSecondsUntilTimestamp } from '../../utils/getSecondsUntilTimestamp';

export const useNextTasksExecution = () => {
  const [nextExecutionIn, setNextExecutionIn] = useState(0);

  const updateNextExecution = (nextTasksExecution: Timestamp): void => {
    const difference = getSecondsUntilTimestamp(nextTasksExecution);

    setNextExecutionIn(difference);
  };

  const { data: queryData, loading: queryLoading } = useNextTasksExecutionQuery();

  useEffect(() => {
    if (!queryLoading && queryData) {
      updateNextExecution(queryData.nextTasksExecution);
    }
  }, [queryData, queryLoading]);

  const [setNextTasksExecution, { data: updateData, loading: updateLoading }] = useSetNextTasksExecutionMutation();

  useEffect(() => {
    if (!updateLoading && updateData) {
      updateNextExecution(updateData.setNextTasksExecution);
    }
  }, [updateData, updateLoading]);

  const [resetNextTasksExecution, { data: resetData, loading: resetLoading }] = useResetNextTasksExecutionMutation();

  useEffect(() => {
    if (!resetLoading && resetData) {
      updateNextExecution(resetData.resetNextTasksExecution);
    }
  }, [resetData, resetLoading]);

  useNextTasksExecutionChangedSubscription({
    onSubscriptionData: ({ subscriptionData: { data, loading } }) => {
      if (!loading && data) {
        updateNextExecution(data.nextTasksExecutionChanged);
      }
    },
  });

  return {
    nextExecutionIn,
    setNextTasksExecution,
    resetNextTasksExecution,
  };
};