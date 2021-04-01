import { Dialog } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useMemo,
  useState,
} from 'react';
import {
  useLazyLoadQuery,
  useMutation,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';
import type { Duration } from 'shared/types/duration.type.js';
import { formatTimeFromSeconds } from 'shared/utils/formatTime.js';

import type {
  NextTaskExecutionQuery,
  TaskType,
} from '../../../_graphql/__generated__/NextTaskExecutionQuery.graphql.js';
import type { NextTaskExecutionResetMutation } from '../../../_graphql/__generated__/NextTaskExecutionResetMutation.graphql.js';
import type { NextTaskExecutionSetMutation } from '../../../_graphql/__generated__/NextTaskExecutionSetMutation.graphql.js';
import type { NextTaskExecutionSubscription } from '../../../_graphql/__generated__/NextTaskExecutionSubscription.graphql.js';
import { useCountDown } from '../../../hooks/useCountDown.js';
import { getSecondsUntilTimestamp } from '../../../utils/getSecondsUntilTimestamp.js';
import { NextExecutionForm } from './NextExecutionForm.js';

type Props = {
  readonly task: TaskType;
};

const nextTaskExecutionQuery = graphql`
    query NextTaskExecutionQuery($task: TaskType!) {
         nextTaskExecution(task: $task) {
             totalSeconds
         }
    }
`;

const nextTaskExecutionSetMutation = graphql`
  mutation NextTaskExecutionSetMutation($task: TaskType!, $delay: DurationInput!) {
      setNextTaskExecution(task: $task, delay: $delay) {
          ...Timestamp
      }
  }
`;

const nextTaskExecutionResetMutation = graphql`
    mutation NextTaskExecutionResetMutation($task: TaskType!) {
        resetNextTaskExecution(task: $task) {
            ...Timestamp
        }
    }
`;

const nextTaskExecutionSubscription = graphql`
  subscription NextTaskExecutionSubscription($task: TaskType!) {
      nextTaskExecutionChanged(task: $task) {
          ...Timestamp
      }
  }
`;

export const NextTaskExecution: React.FC<Props> = ({ task }) => {
  const { nextTaskExecution } = useLazyLoadQuery<NextTaskExecutionQuery>(nextTaskExecutionQuery, { task });
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

  const nextExecutionTimer = useCountDown(getSecondsUntilTimestamp(nextTaskExecution));

  const [isFormShown, setIsFormShown] = useState(false);

  const showForm = () => setIsFormShown(true);
  const closeForm = () => setIsFormShown(false);

  const submitForm = (duration: Duration): void => {
    setNextTaskExecution({
      variables: { task, delay: duration },
      updater: (store) => {
        const newRecord = store.getRootField('setNextTaskExecution');
        store.getRoot().setLinkedRecord(newRecord, 'nextTaskExecution', { task });
      },
    });

    closeForm();
  };

  const onReset = () => {
    resetNextTaskExecution({
      variables: { task },
      updater: (store) => {
        const newRecord = store.getRootField('resetNextTaskExecution');
        store.getRoot().setLinkedRecord(newRecord, 'nextTaskExecution', { task });
      },
    });
  };

  return (
    <div>
      <div>
        Next execution in: {formatTimeFromSeconds(nextExecutionTimer)}
        <button onClick={showForm}>Change</button>
        <button onClick={onReset}>Reset</button>
      </div>
      <Dialog onClose={closeForm} open={isFormShown}>
        <NextExecutionForm onSubmit={submitForm} />
      </Dialog>
    </div>
  );
};

NextTaskExecution.displayName = 'NextTaskExecution';