import React from 'react';

import { VillageTaskType } from '../../../_types/graphql';
import { formatTimeFromSeconds } from '../../../../server/utils/formatTime';
import { useCountdown } from '../../hooks/useCountdown';
import { useNextVillageTaskExecution } from '../../hooks/useNextVillageTaskExecution';
import { useVillageContext } from '../../hooks/useVillageContext';

interface IProps {
  readonly task: VillageTaskType;
}

export const NextVillageTaskExecution: React.FC<IProps> = (props) => {
  const {
    task,
  } = props;

  const { villageId } = useVillageContext();
  const nextExecutionIn = useNextVillageTaskExecution(villageId, task);
  const nextExecutionTimer = useCountdown(nextExecutionIn);

  return <div>Next execution in: {formatTimeFromSeconds(nextExecutionTimer)}</div>;
};
