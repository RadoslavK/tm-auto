import { ApolloCache } from '@apollo/client';
import {
  useCallback,
  useEffect,
} from 'react';

import {
  DurationInput,
  NextTaskExecutionDocument,
  NextTaskExecutionQuery,
  NextTaskExecutionQueryVariables,
  OnNextTaskExecutionChangedDocument,
  OnNextTaskExecutionChangedSubscription,
  OnNextTaskExecutionChangedSubscriptionVariables,
  TaskType,
  useNextTaskExecutionQuery,
  useResetNextTaskExecutionMutation,
  useSetNextTaskExecutionMutation,
} from '../../_graphql/graphqlHooks';
import { updateQueryCache } from '../../../../server/utils/graphql';
import { getSecondsUntilTimestamp } from '../../utils/getSecondsUntilTimestamp';

export const useNextTaskExecution = (task: TaskType) => {
  const { data: queryData, loading: queryLoading, subscribeToMore } = useNextTaskExecutionQuery({ variables: { task } });

  useEffect(() => {
    subscribeToMore<OnNextTaskExecutionChangedSubscription, OnNextTaskExecutionChangedSubscriptionVariables>({
      document: OnNextTaskExecutionChangedDocument,
      variables: { task },
      updateQuery: (_prev, { subscriptionData: { data } }) => ({ nextTaskExecution: data.nextTaskExecutionChanged }),
    });
  }, [subscribeToMore, task]);

  const updateCache = (cache: ApolloCache<unknown>, nextTaskExecution: NextTaskExecutionQuery['nextTaskExecution']) => {
    updateQueryCache<NextTaskExecutionQuery, NextTaskExecutionQueryVariables>({
      cache,
      query: NextTaskExecutionDocument,
      data: { nextTaskExecution },
      variables: { task },
    });
  };

  const [setMutation] = useSetNextTaskExecutionMutation({
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      updateCache(cache, data.setNextTaskExecution);
    },
  });

  const [resetMutation] = useResetNextTaskExecutionMutation({
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      updateCache(cache, data.resetNextTaskExecution);
    },
  });

  const setNextTaskExecution = useCallback((delay: DurationInput) => {
    setMutation({ variables: { task, delay } });
  }, [setMutation, task]);

  const resetNextTaskExecution = useCallback(() => {
    resetMutation({ variables: { task } });
  }, [resetMutation, task]);

  const nextExecutionIn = queryLoading || !queryData
    ? 0
    : getSecondsUntilTimestamp(queryData.nextTaskExecution);

  return {
    nextExecutionIn,
    setNextTaskExecution,
    resetNextTaskExecution,
  };
};
