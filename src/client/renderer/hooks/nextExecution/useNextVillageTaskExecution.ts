import {
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import {
  useEffect,
  useState,
} from 'react';

import {
  NextVillageTaskExecution,
  NextVillageTaskExecutionChanged,
} from '*/graphql_operations/nextTaskExecution.graphql';

import {
  INextVillageTaskExecutionChangedSubscription,
  INextVillageTaskExecutionChangedSubscriptionVariables,
  INextVillageTaskExecutionQuery,
  INextVillageTaskExecutionQueryVariables,
  ITimestamp,
  VillageTaskType,
} from '../../_types/graphql';
import { getSecondsUntilTimestamp } from '../../utils/getSecondsUntilTimestamp';

export const useNextVillageTaskExecution = (villageId: number, task: VillageTaskType): number => {
  const [nextExecutionIn, setNextExecutionIn] = useState(0);

  const variables = { task, villageId };

  const nextExecutionResult = useQuery<INextVillageTaskExecutionQuery, INextVillageTaskExecutionQueryVariables>(
    NextVillageTaskExecution,
    { variables },
  );

  const updateNextExecution = (timestamp: ITimestamp): void => {
    const difference = getSecondsUntilTimestamp(timestamp);

    setNextExecutionIn(difference);
  };

  useEffect(() => {
    const { data, loading } = nextExecutionResult;

    if (!loading && data) {
      updateNextExecution(data.nextVillageTaskExecution);
    }
  }, [nextExecutionResult]);

  useSubscription<INextVillageTaskExecutionChangedSubscription, INextVillageTaskExecutionChangedSubscriptionVariables>(
    NextVillageTaskExecutionChanged,
    {
      onSubscriptionData: ({ subscriptionData: { data, loading } }) => {
        if (!loading && data) {
          updateNextExecution(data.nextVillageTaskExecutionChanged);
        }
      },
      variables,
    },
  );

  return nextExecutionIn;
};
