import { Dialog } from '@material-ui/core';
import React, { useState } from 'react';

import { Duration } from '../../../_graphql/graphqlHooks';
import { useNextTasksExecution } from '../../../hooks/nextExecution/useNextTasksExecution';
import { useCountDown } from '../../../hooks/useCountDown';
import { formatTimeFromSeconds } from '../../../utils/formatTime';
import { NextExecutionForm } from './NextExecutionForm';

export const NextTasksExecution: React.FC = () => {
  const {
    nextExecutionIn,
    resetNextTasksExecution,
    setNextTasksExecution,
  } = useNextTasksExecution();

  const timer = useCountDown(nextExecutionIn);

  const [isFormShown, setIsFormShown] = useState(false);

  const showForm = () => setIsFormShown(true);
  const closeForm = () => setIsFormShown(false);

  const submitForm = (delay: Duration): void => {
    setNextTasksExecution({ variables: { delay } });
    closeForm();
  };

  const resetTimer = (): void => {
    resetNextTasksExecution();
  };

  return (
    <div>
      <div>
        Next bot tasks check in:
        {' '}
        {formatTimeFromSeconds(timer)}
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
