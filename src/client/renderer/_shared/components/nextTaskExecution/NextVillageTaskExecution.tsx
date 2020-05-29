import { Dialog } from '@material-ui/core';
import React, { useState } from 'react';

import {
  Duration,
  VillageTaskType,
} from '../../../_graphql/types/graphql.type';
import { useVillageContext } from '../../../applications/villages/context/villageContext';
import { useNextVillageTaskExecution } from '../../../hooks/nextExecution/useNextVillageTaskExecution';
import { useResetNextVillageTaskExecution } from '../../../hooks/nextExecution/useResetNextVillageTaskExecution';
import { useSetNextVillageTaskExecution } from '../../../hooks/nextExecution/useSetNextVillageTaskExecution';
import { useCountDown } from '../../../hooks/useCountDown';
import { formatTimeFromSeconds } from '../../../utils/formatTime';
import { NextExecutionForm } from './NextExecutionForm';

type Props = {
  readonly task: VillageTaskType;
};

export const NextVillageTaskExecution: React.FC<Props> = ({ task }) => {
  // TODO: rename selected village or smth
  const { villageId } = useVillageContext();

  const nextExecutionIn = useNextVillageTaskExecution(villageId, task);
  const nextExecutionTimer = useCountDown(nextExecutionIn);

  const setNextVillageTaskExecution = useSetNextVillageTaskExecution();
  const resetNextVillageTaskExecution = useResetNextVillageTaskExecution();

  const [isFormShown, setIsFormShown] = useState(false);

  const showForm = () => setIsFormShown(true);
  const closeForm = () => setIsFormShown(false);

  const onSubmit = (delay: Duration): void => {
    setNextVillageTaskExecution({ variables: { delay, task, villageId } });
    closeForm();
  };

  const onReset = (): void => {
    resetNextVillageTaskExecution({ variables: { task, villageId } });
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
        <button onClick={onReset}>
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
