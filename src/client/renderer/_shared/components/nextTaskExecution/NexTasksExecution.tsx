import React from 'react';

import { useNextTasksExecution } from '../../../hooks/nextExecution/useNextTasksExecution';
import { useCountDown } from '../../../hooks/useCountDown';
import { formatTimeFromSeconds } from '../../../utils/formatTime';

export const NextTasksExecution: React.FC = () => {
  const nextExecution = useNextTasksExecution();
  const timer = useCountDown(nextExecution);

  return (
    <div>
      Next bot tasks check in:
      {' '}
      {formatTimeFromSeconds(timer)}
    </div>
  );
};
