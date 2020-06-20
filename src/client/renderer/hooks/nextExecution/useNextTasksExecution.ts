import { ApolloCache } from '@apollo/client';
import { useCallback, useEffect } from 'react';

import { updateQueryCache } from '../../../../server/utils/graphql';
import {
  DurationInput,
  NextTaskExecutionQuery,
  NextTasksExecutionDocument,
  NextTasksExecutionQuery,
  NextTasksExecutionQueryVariables,
  OnNextTasksExecutionChangedDocument,
  OnNextTasksExecutionChangedSubscription,
  OnNextTasksExecutionChangedSubscriptionVariables,
  useNextTasksExecutionQuery,
  useResetNextTasksExecutionMutation,
  useSetNextTasksExecutionMutation,
} from '../../_graphql/graphqlHooks';
import { getSecondsUntilTimestamp } from '../../utils/getSecondsUntilTimestamp';

export const useNextTasksExecution = () => {
  const {
    data: queryData,
    loading: queryLoading,
    subscribeToMore,
  } = useNextTasksExecutionQuery();

  useEffect(() => {
    subscribeToMore<
      OnNextTasksExecutionChangedSubscription,
      OnNextTasksExecutionChangedSubscriptionVariables
    >({
      document: OnNextTasksExecutionChangedDocument,
      updateQuery: (_prev, { subscriptionData: { data } }) => ({
        nextTasksExecution: data.nextTasksExecutionChanged,
      }),
    });
  }, [subscribeToMore]);

  const updateCache = (
    cache: ApolloCache<unknown>,
    nextTasksExecution: NextTaskExecutionQuery['nextTaskExecution'],
  ) => {
    updateQueryCache<NextTasksExecutionQuery, NextTasksExecutionQueryVariables>(
      {
        cache,
        query: NextTasksExecutionDocument,
        data: { nextTasksExecution },
      },
    );
  };

  const [setMutation] = useSetNextTasksExecutionMutation({
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      updateCache(cache, data.setNextTasksExecution);
    },
  });

  const [resetMutation] = useResetNextTasksExecutionMutation({
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      updateCache(cache, data.resetNextTasksExecution);
    },
  });

  const setNextTasksExecution = useCallback(
    (delay: DurationInput) => {
      setMutation({ variables: { delay } });
    },
    [setMutation],
  );

  const resetNextTasksExecution = useCallback(() => {
    resetMutation();
  }, [resetMutation]);

  const nextExecutionIn =
    queryLoading || !queryData
      ? 0
      : getSecondsUntilTimestamp(queryData.nextTasksExecution);

  return {
    nextExecutionIn,
    setNextTasksExecution,
    resetNextTasksExecution,
  };
};
