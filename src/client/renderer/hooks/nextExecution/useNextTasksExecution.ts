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

  const queryResult = useNextTasksExecutionQuery();

  useEffect(() => {
    if (!queryResult.loading && queryResult.data) {
      updateNextExecution(queryResult.data.nextTasksExecution);
    }
  }, [queryResult]);

  const [setNextTasksExecution, updateResult] = useSetNextTasksExecutionMutation();

  useEffect(() => {
    if (!updateResult.loading && updateResult.data) {
      updateNextExecution(updateResult.data.setNextTasksExecution);
    }
  }, [updateResult]);

  const [resetNextTasksExecution, resetResult] = useResetNextTasksExecutionMutation();

  useEffect(() => {
    if (!resetResult.loading && resetResult.data) {
      updateNextExecution(resetResult.data.resetNextTasksExecution);
    }
  }, [resetResult]);

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