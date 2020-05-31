import { Dialog } from '@material-ui/core';
import React, { useState } from 'react';

import {
  Duration,
  TaskType,
} from '../../../_graphql/graphqlHooks';
import { useNextTaskExecution } from '../../../hooks/nextExecution/useNextTaskExecution';
import { useCountDown } from '../../../hooks/useCountDown';
import { formatTimeFromSeconds } from '../../../utils/formatTime';
import { NextExecutionForm } from './NextExecutionForm';

type Props = {
  readonly task: TaskType;
};

export const NextTaskExecution: React.FC<Props> = ({ task }) => {
  const {
    nextExecutionIn,
    resetNextTaskExecution,
    setNextTaskExecution,
  } = useNextTaskExecution(task);

  const nextExecutionTimer = useCountDown(nextExecutionIn);

  const [isFormShown, setIsFormShown] = useState(false);

  const showForm = () => setIsFormShown(true);
  const closeForm = () => setIsFormShown(false);

  const submitForm = (delay: Duration): void => {
    setNextTaskExecution({ variables: { delay, task } });
    closeForm();
  };

  const resetTimer = (): void => {
    resetNextTaskExecution({ variables: { task } });
  };

  return (
    <div>
      <div>
        Next execution in:
        {' '}
        {formatTimeFromSeconds(nextExecutionTimer)}
        <button onClick={showForm}>
          Change
        </button>
        <button onClick={resetTimer}>
          Reset
        </button>
      </div>
      <Dialog
        onClose={closeForm}
        open={isFormShown}
      >
        <NextExecutionForm onSubmit={submitForm} />
      </Dialog>
    </div>
  );
};
