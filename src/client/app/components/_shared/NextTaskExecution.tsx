import { useMutation } from '@apollo/react-hooks';
import { Dialog } from '@material-ui/core';
import React, { useState } from 'react';

import { SetNextTaskExecution } from '*/graphql_operations/nextTaskExecution.graphql';

import {
  IDuration,
  ISetNextTaskExecutionMutation,
  ISetNextTaskExecutionMutationVariables,
  TaskType,
} from '../../../_types/graphql';
import { formatTimeFromSeconds } from '../../../../server/utils/formatTime';
import { useNextTaskExecution } from '../../hooks/nextExecution/useNextTaskExecution';
import { useCountdown } from '../../hooks/useCountdown';
import { NextExecutionForm } from './NextExecutionForm';

interface IProps {
  readonly task: TaskType;
}

export const NextTaskExecution: React.FC<IProps> = (props) => {
  const {
    task,
  } = props;

  const [showForm, setShowForm] = useState(false);

  const nextExecutionIn = useNextTaskExecution(task);
  const nextExecutionTimer = useCountdown(nextExecutionIn);

  const [setNextTaskExecution] = useMutation<ISetNextTaskExecutionMutation, ISetNextTaskExecutionMutationVariables>(SetNextTaskExecution);

  const onSubmit = (delay: IDuration): void => {
    setNextTaskExecution({ variables: { task, delay } });
    setShowForm(false);
  };

  return (
    <div>
      <div>
        Next execution in: {formatTimeFromSeconds(nextExecutionTimer)}
        <button type="button" onClick={() => setShowForm(true)}>Change</button>
      </div>
      <Dialog
        open={showForm}
        onClose={() => setShowForm(false)}
      >
        <NextExecutionForm onSubmit={onSubmit} />
      </Dialog>
    </div>
  );
};
