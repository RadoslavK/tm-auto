import Dialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';
import {
  useLazyLoadQuery,
  useMutation,
} from 'react-relay/hooks';
import { Duration } from '../../../../_shared/types/duration.type.js';
import { formatTimeFromSeconds } from '../../../../_shared/utils/formatTime.js';
import { NextTasksExecutionQuery } from '../../../_graphql/__generated__/NextTasksExecutionQuery.graphql.js';
import { NextTasksExecutionResetMutation } from '../../../_graphql/__generated__/NextTasksExecutionResetMutation.graphql.js';
import { NextTasksExecutionSetMutation } from '../../../_graphql/__generated__/NextTasksExecutionSetMutation.graphql.js';

import { useCountDown } from '../../../hooks/useCountDown.js';
import { NextExecutionForm } from './NextExecutionForm.js';
import graphql from 'babel-plugin-relay/macro';

const nextTasksExecutionQuery = graphql`
  query NextTasksExecutionQuery {
      nextTasksExecution {
          totalSeconds
      }
  }
`;

const setNextTasksExecutionMutation = graphql`
  mutation NextTasksExecutionSetMutation($delay: DurationInput!) {
      setNextTasksExecution(delay: $delay) {
          totalSeconds
      }
  }
`;

const resetNextTasksExecutionMutation = graphql`
    mutation NextTasksExecutionResetMutation {
        resetNextTasksExecution {
            totalSeconds
        }
    }
`;

export const NextTasksExecution: React.FC = () => {
  const { nextTasksExecution } = useLazyLoadQuery<NextTasksExecutionQuery>(nextTasksExecutionQuery, {});
  const [setNextTasksExecution] = useMutation<NextTasksExecutionSetMutation>(setNextTasksExecutionMutation);
  const [resetNextTasksExecution] = useMutation<NextTasksExecutionResetMutation>(resetNextTasksExecutionMutation);

  const timer = useCountDown(nextTasksExecution.totalSeconds);

  const [isFormShown, setIsFormShown] = useState(false);

  const showForm = () => setIsFormShown(true);
  const closeForm = () => setIsFormShown(false);

  const submitForm = (duration: Duration): void => {
    setNextTasksExecution({
      variables: {
        delay: duration,
      },
    });

    closeForm();
  };

  const onReset = () => {
    resetNextTasksExecution({
      variables: {},
    });
  }

  return (
    <div>
      <div>
        Next bot tasks check in: {formatTimeFromSeconds(timer)}
        <button onClick={showForm}>Change</button>
        <button onClick={onReset}>Reset</button>
      </div>
      <Dialog onClose={closeForm} open={isFormShown}>
        <NextExecutionForm onSubmit={submitForm} />
      </Dialog>
    </div>
  );
};
