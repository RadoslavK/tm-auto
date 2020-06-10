import { Dialog } from '@material-ui/core';
import React, { useState } from 'react';

import { Duration } from '../../../_graphql/graphqlHooks';
import { TaskType } from '../../../../../_shared/types/taskType';
import { useVillageContext } from '../../../applications/villages/context/villageContext';
import { useNextVillageTaskExecution } from '../../../hooks/nextExecution/useNextVillageTaskExecution';
import { useCountDown } from '../../../hooks/useCountDown';
import { formatTimeFromSeconds } from '../../../utils/formatTime';
import { NextExecutionForm } from './NextExecutionForm';

type Props = {
  readonly task: TaskType;
};

export const NextVillageTaskExecution: React.FC<Props> = ({ task }) => {
  const { villageId } = useVillageContext();

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
