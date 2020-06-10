import { ApolloCache } from '@apollo/client';
import {
  useCallback,
  useEffect,
} from 'react';

import {
  DurationInput,
  NextVillageTaskExecutionDocument,
  NextVillageTaskExecutionQuery,
  NextVillageTaskExecutionQueryVariables,
  OnNextVillageTaskExecutionChangedDocument,
  OnNextVillageTaskExecutionChangedSubscription,
  OnNextVillageTaskExecutionChangedSubscriptionVariables,
  TaskType,
  useNextVillageTaskExecutionQuery,
  useResetNextVillageTaskExecutionMutation,
  useSetNextVillageTaskExecutionMutation,
} from '../../_graphql/graphqlHooks';
import { updateQueryCache } from '../../../../server/utils/graphql';
import { getSecondsUntilTimestamp } from '../../utils/getSecondsUntilTimestamp';

export const useNextVillageTaskExecution = (villageId: string, task: TaskType) => {
  const { data: queryData, loading: queryLoading, subscribeToMore } = useNextVillageTaskExecutionQuery({ variables: { task, villageId } });

  useEffect(() => {
    subscribeToMore<OnNextVillageTaskExecutionChangedSubscription, OnNextVillageTaskExecutionChangedSubscriptionVariables>({
      document: OnNextVillageTaskExecutionChangedDocument,
      variables: { villageId, task },
      updateQuery: (_prev, { subscriptionData: { data } }) => ({ nextVillageTaskExecution: data.nextVillageTaskExecutionChanged }),
    });
  }, [subscribeToMore, task, villageId]);

  const updateCache = (cache: ApolloCache<unknown>, nextVillageTaskExecution: NextVillageTaskExecutionQuery['nextVillageTaskExecution']) => {
    updateQueryCache<NextVillageTaskExecutionQuery, NextVillageTaskExecutionQueryVariables>({
      cache,
      query: NextVillageTaskExecutionDocument,
      data: { nextVillageTaskExecution },
      variables: { task, villageId },
    });
  };

  const [setMutation] = useSetNextVillageTaskExecutionMutation({
    update: (cache, { data: setData }) => {
      if (!setData) {
        return;
      }

      updateCache(cache, setData.setNextVillageTaskExecution);
    },
  });

  const [resetMutation] = useResetNextVillageTaskExecutionMutation({
    update: (cache, { data: resetData }) => {
      if (!resetData) {
        return;
      }

      updateCache(cache, resetData.resetNextVillageTaskExecution);
    },
  });

  const setNextVillageTaskExecution = useCallback((delay: DurationInput) => {
    setMutation({ variables: { delay, task, villageId } });
  }, [setMutation, task, villageId]);

  const resetNextVillageTaskExecution = useCallback(() => {
    resetMutation({ variables: { task, villageId } });
  }, [resetMutation, task, villageId]);

  const nextExecutionIn = queryLoading || !queryData
    ? 0
    : getSecondsUntilTimestamp(queryData.nextVillageTaskExecution);

  return {
    nextExecutionIn,
    setNextVillageTaskExecution,
    resetNextVillageTaskExecution,
  };
};
