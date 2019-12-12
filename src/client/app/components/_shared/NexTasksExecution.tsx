import React from 'react';

import { formatTimeFromSeconds } from '../../../../server/utils/formatTime';
import { useNextTasksExecution } from '../../hooks/nextExecution/useNextTasksExecution';
import { useCountdown } from '../../hooks/useCountdown';

export const NextTasksExecution: React.FC = () => {
  const nextExecution = useNextTasksExecution();
  const timer = useCountdown(nextExecution);

  return (
    <div>
      Next bot tasks check in: {formatTimeFromSeconds(timer)}
    </div>
  );
};
