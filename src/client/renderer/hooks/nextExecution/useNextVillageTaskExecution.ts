import {
  useEffect,
  useState,
} from 'react';

import {
  TaskType,
  Timestamp,
  useNextVillageTaskExecutionChangedSubscription,
  useNextVillageTaskExecutionQuery,
  useResetNextVillageTaskExecutionMutation,
  useSetNextVillageTaskExecutionMutation,
} from '../../_graphql/graphqlHooks';
import { getSecondsUntilTimestamp } from '../../utils/getSecondsUntilTimestamp';

export const useNextVillageTaskExecution = (villageId: number, task: TaskType) => {
  const [nextExecutionIn, setNextExecutionIn] = useState(0);

  const updateNextExecution = (timestamp: Timestamp): void => {
    const difference = getSecondsUntilTimestamp(timestamp);

    setNextExecutionIn(difference);
  };

  const { data: queryData, loading: queryLoading } = useNextVillageTaskExecutionQuery({ variables: { task, villageId } });

  useEffect(() => {
    if (!queryLoading && queryData) {
      updateNextExecution(queryData.nextVillageTaskExecution);
    }
  }, [queryData, queryLoading]);

  const [setNextVillageTaskExecution, { data: updateData, loading: updateLoading }] = useSetNextVillageTaskExecutionMutation();

  useEffect(() => {
    if (!updateLoading && updateData) {
      updateNextExecution(updateData.setNextVillageTaskExecution);
    }
  }, [updateData, updateLoading]);

  const [resetNextVillageTaskExecution, { data: resetData, loading: resetLoading }] = useResetNextVillageTaskExecutionMutation();

  useEffect(() => {
    if (!resetLoading && resetData) {
      updateNextExecution(resetData.resetNextVillageTaskExecution);
    }
  }, [resetData, resetLoading]);

  useNextVillageTaskExecutionChangedSubscription({
    onSubscriptionData: ({ subscriptionData: { data, loading } }) => {
      if (!loading && data) {
        updateNextExecution(data.nextVillageTaskExecutionChanged);
      }
    },
    variables: { task, villageId },
  });

  return {
    nextExecutionIn,
    setNextVillageTaskExecution,
    resetNextVillageTaskExecution,
  };
};
