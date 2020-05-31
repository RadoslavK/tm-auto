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

  const queryResult = useNextVillageTaskExecutionQuery({ variables: { task, villageId } });

  useEffect(() => {
    if (!queryResult.loading && queryResult.data) {
      updateNextExecution(queryResult.data.nextVillageTaskExecution);
    }
  }, [queryResult]);

  const [setNextVillageTaskExecution, updateResult] = useSetNextVillageTaskExecutionMutation();

  useEffect(() => {
    if (!updateResult.loading && updateResult.data) {
      updateNextExecution(updateResult.data.setNextVillageTaskExecution);
    }
  }, [updateResult]);

  const [resetNextVillageTaskExecution, resetResult] = useResetNextVillageTaskExecutionMutation();

  useEffect(() => {
    if (!resetResult.loading && resetResult.data) {
      updateNextExecution(resetResult.data.resetNextVillageTaskExecution);
    }
  }, [resetResult]);

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
