import { useMutation } from '@apollo/react-hooks';
import { Dialog } from '@material-ui/core';
import React, { useState } from 'react';

import {
  ResetNextVillageTaskExecution,
  SetNextVillageTaskExecution,
} from "*/graphql_operations/nextTaskExecution.graphql";

import {
  IDuration,
  IResetNextVillageTaskExecutionMutation,
  IResetNextVillageTaskExecutionMutationVariables,
  ISetNextVillageTaskExecutionMutation,
  ISetNextVillageTaskExecutionMutationVariables,
  VillageTaskType,
} from '../../../_types/graphql';
import { formatTimeFromSeconds } from '../../../../server/utils/formatTime';
import { useNextVillageTaskExecution } from '../../hooks/nextExecution/useNextVillageTaskExecution';
import { useCountdown } from '../../hooks/useCountdown';
import { useVillageContext } from '../../hooks/useVillageContext';
import { NextExecutionForm } from './NextExecutionForm';

interface IProps {
  readonly task: VillageTaskType;
}

export const NextVillageTaskExecution: React.FC<IProps> = (props) => {
  const {
    task,
  } = props;

  const [showForm, setShowForm] = useState(false);

  const { villageId } = useVillageContext();
  const nextExecutionIn = useNextVillageTaskExecution(villageId, task);
  const nextExecutionTimer = useCountdown(nextExecutionIn);

  const [setNextVillageTaskExecution] = useMutation<ISetNextVillageTaskExecutionMutation, ISetNextVillageTaskExecutionMutationVariables>(SetNextVillageTaskExecution);
  const [resetNextVillageTaskExecution] = useMutation<IResetNextVillageTaskExecutionMutation, IResetNextVillageTaskExecutionMutationVariables>(ResetNextVillageTaskExecution);

  const onSubmit = (delay: IDuration): void => {
    setNextVillageTaskExecution({ variables: { villageId, task, delay } });
    setShowForm(false);
  };

  const onReset = (): void => {
    resetNextVillageTaskExecution({ variables: { villageId, task } });
    setShowForm(false);
  };

  return (
    <div>
      <div>
        Next execution in: {formatTimeFromSeconds(nextExecutionTimer)}
        <button type="button" onClick={() => setShowForm(true)}>Change</button>
        <button type="button" onClick={onReset}>Reset</button>
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
