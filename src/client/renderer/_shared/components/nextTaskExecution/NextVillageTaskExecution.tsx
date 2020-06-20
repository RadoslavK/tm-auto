import { Dialog } from '@material-ui/core';
import React, { useState } from 'react';

import {
  Duration,
  TaskType,
} from '../../../_graphql/graphqlHooks';
import { useNextVillageTaskExecution } from '../../../hooks/nextExecution/useNextVillageTaskExecution';
import { useCountDown } from '../../../hooks/useCountDown';
import { useSelectedVillageId } from '../../../hooks/villages/useSelectedVillageId';
import { formatTimeFromSeconds } from '../../../utils/formatTime';
import { NextExecutionForm } from './NextExecutionForm';

type Props = {
  readonly task: TaskType;
};

export const NextVillageTaskExecution: React.FC<Props> = ({ task }) => {
  const villageId = useSelectedVillageId();

  const {
    nextExecutionIn,
    resetNextVillageTaskExecution,
    setNextVillageTaskExecution,
  } = useNextVillageTaskExecution(villageId, task);

  const nextExecutionTimer = useCountDown(nextExecutionIn);

  const [isFormShown, setIsFormShown] = useState(false);

  const showForm = () => setIsFormShown(true);
  const closeForm = () => setIsFormShown(false);

  const onSubmit = (delay: Duration): void => {
    setNextVillageTaskExecution(delay);
    closeForm();
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
        <button onClick={resetNextVillageTaskExecution}>
          Reset
        </button>
      </div>
      <Dialog
        onClose={closeForm}
        open={isFormShown}
      >
        <NextExecutionForm onSubmit={onSubmit} />
      </Dialog>
    </div>
  );
};
