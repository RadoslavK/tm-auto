import Dialog from '@material-ui/core/Dialog';
import graphql from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import {
  useLazyLoadQuery,
  useMutation,
} from 'react-relay/hooks';
import { Duration } from '../../../../_shared/types/duration.type.js';
import { formatTimeFromSeconds } from '../../../../_shared/utils/formatTime.js';
import {
  NextTaskExecutionQuery,
  TaskType,
} from '../../../_graphql/__generated__/NextTaskExecutionQuery.graphql.js';
import { NextTaskExecutionResetMutation } from '../../../_graphql/__generated__/NextTaskExecutionResetMutation.graphql.js';
import { NextTaskExecutionSetMutation } from '../../../_graphql/__generated__/NextTaskExecutionSetMutation.graphql.js';

import { useCountDown } from '../../../hooks/useCountDown.js';
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
          totalSeconds
      }
  }
`;

const nextTaskExecutionResetMutation = graphql`
    mutation NextTaskExecutionResetMutation($task: TaskType!) {
        resetNextTaskExecution(task: $task) {
            totalSeconds
        }
    }
`;

export const NextTaskExecution: React.FC<Props> = ({ task }) => {
  const { nextTaskExecution } = useLazyLoadQuery<NextTaskExecutionQuery>(nextTaskExecutionQuery, { task });
  const [setNextTaskExecution] = useMutation<NextTaskExecutionSetMutation>(nextTaskExecutionSetMutation);
  const [resetNextTaskExecution] = useMutation<NextTaskExecutionResetMutation>(nextTaskExecutionResetMutation);

  //  TODO aj v podobnych comp pouzit getSecondsUntilTimestamp
  const nextExecutionTimer = useCountDown(nextTaskExecution.totalSeconds);

  const [isFormShown, setIsFormShown] = useState(false);

  const showForm = () => setIsFormShown(true);
  const closeForm = () => setIsFormShown(false);

  const submitForm = (duration: Duration): void => {
    setNextTaskExecution({
      variables: { task, delay: duration },
    });

    closeForm();
  };

  const onReset = () => {
    resetNextTaskExecution({
      variables: { task },
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
