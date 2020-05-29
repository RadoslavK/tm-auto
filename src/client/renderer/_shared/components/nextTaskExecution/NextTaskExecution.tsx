import { Dialog } from '@material-ui/core';
import React, { useState } from 'react';

import {
  Duration,
  TaskType,
} from '../../../_graphql/types/graphql.type';
import { useNextTaskExecution } from '../../../hooks/nextExecution/useNextTaskExecution';
import { useResetNextTaskExecution } from '../../../hooks/nextExecution/useResetNextTaskExecution';
import { useSetNextTaskExecution } from '../../../hooks/nextExecution/useSetNextTaskExecution';
import { useCountDown } from '../../../hooks/useCountDown';
import { formatTimeFromSeconds } from '../../../utils/formatTime';
import { NextExecutionForm } from './NextExecutionForm';

type Props = {
  readonly task: TaskType;
};

export const NextTaskExecution: React.FC<Props> = ({ task }) => {
  const nextExecutionIn = useNextTaskExecution(task);
  const nextExecutionTimer = useCountDown(nextExecutionIn);

  const setNextTaskExecution = useSetNextTaskExecution();
  const resetNextTaskExecution = useResetNextTaskExecution();

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
