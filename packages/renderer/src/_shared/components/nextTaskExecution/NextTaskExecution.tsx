import graphql from 'babel-plugin-relay/macro';
import React, { useMemo } from 'react';
import {
  useFragment,
  useMutation,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';
import type { TaskType } from 'shared/enums/TaskType.js';
import type { Duration } from 'shared/types/duration.type.js';

import type { NextTaskExecution_timestamp$key } from '../../../_graphql/__generated__/NextTaskExecution_timestamp.graphql.js';
import type { NextTaskExecutionResetMutation } from '../../../_graphql/__generated__/NextTaskExecutionResetMutation.graphql.js';
import type { NextTaskExecutionSetMutation } from '../../../_graphql/__generated__/NextTaskExecutionSetMutation.graphql.js';
import type { NextTaskExecutionSubscription } from '../../../_graphql/__generated__/NextTaskExecutionSubscription.graphql.js';
import { useCountDown } from '../../../hooks/useCountDown.js';
import { getSecondsUntilTimestamp } from '../../../utils/getSecondsUntilTimestamp.js';
import { NextExecution } from './NextExecution.js';

type Props = {
  readonly timestamp: NextTaskExecution_timestamp$key;
  readonly task: TaskType;
};

const fragmentDef = graphql`
    fragment NextTaskExecution_timestamp on Timestamp {
        ...Timestamp @relay(mask: false)
    }
`;

const nextTaskExecutionSetMutation = graphql`
  mutation NextTaskExecutionSetMutation($task: TaskType!, $delay: DurationInput!) {
      setNextTaskExecution(task: $task, delay: $delay) {
          ...NextTaskExecution_timestamp
      }
  }
`;

const nextTaskExecutionResetMutation = graphql`
    mutation NextTaskExecutionResetMutation($task: TaskType!) {
        resetNextTaskExecution(task: $task) {
            ...NextTaskExecution_timestamp
        }
    }
`;

const nextTaskExecutionSubscription = graphql`
  subscription NextTaskExecutionSubscription($task: TaskType!) {
      nextTaskExecutionChanged(task: $task) {
          ...NextTaskExecution_timestamp
      }
  }
`;

export const NextTaskExecution: React.FC<Props> = ({ task, timestamp }) => {
  const nextTaskExecution = useFragment(fragmentDef, timestamp);
  const [setNextTaskExecution] = useMutation<NextTaskExecutionSetMutation>(nextTaskExecutionSetMutation);
  const [resetNextTaskExecution] = useMutation<NextTaskExecutionResetMutation>(nextTaskExecutionResetMutation);

  const nextTaskExecutionSubscriptionConfig = useMemo((): GraphQLSubscriptionConfig<NextTaskExecutionSubscription> => ({
    subscription: nextTaskExecutionSubscription,
    variables: { task },
    updater: (store) => {
      const newRecord = store.getRootField('nextTaskExecutionChanged');
      store.getRoot().setLinkedRecord(newRecord, 'nextTaskExecution', { task });
    },
  }), [task]);

  useSubscription(nextTaskExecutionSubscriptionConfig);

  const timer = useCountDown(getSecondsUntilTimestamp(nextTaskExecution));

  const submit = (duration: Duration): void => {
    setNextTaskExecution({
      variables: { task, delay: duration },
      updater: (store) => {
        const newRecord = store.getRootField('setNextTaskExecution');
        store.getRoot().setLinkedRecord(newRecord, 'nextTaskExecution', { task });
      },
    });
  };

  const reset = () => {
    resetNextTaskExecution({
      variables: { task },
      updater: (store) => {
        const newRecord = store.getRootField('resetNextTaskExecution');
        store.getRoot().setLinkedRecord(newRecord, 'nextTaskExecution', { task });
      },
    });
  };

  return (
    <NextExecution
      onChange={submit}
      onReset={reset}
      timer={timer}
    />
  );
};

NextTaskExecution.displayName = 'NextTaskExecution';