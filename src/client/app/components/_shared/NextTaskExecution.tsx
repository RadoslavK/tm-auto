import React from 'react';

import { TaskType } from '../../../_types/graphql';
import { formatTimeFromSeconds } from '../../../../server/utils/formatTime';
import { useCountdown } from '../../hooks/useCountdown';
import { useNextTaskExecution } from '../../hooks/useNextTaskExecution';

interface IProps {
  readonly task: TaskType;
}

export const NextTaskExecution: React.FC<IProps> = (props) => {
  const {
    task,
  } = props;

  const nextExecutionIn = useNextTaskExecution(task);
  const nextExecutionTimer = useCountdown(nextExecutionIn);

  return <div>Next execution in: {formatTimeFromSeconds(nextExecutionTimer)}</div>;
};
