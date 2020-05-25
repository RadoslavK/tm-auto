import React from 'react';

import { useEnqueueBuildingMutation } from '../../../hooks/buildings/useEnqueueBuildingMutation';

type Props = {
  readonly buildingType: number;
  readonly fieldId: number;
  readonly onSelect: () => void;
  readonly targetLevel: number;
};

export const MultiEnqueueDialogItem: React.FC<Props> = (props) => {
  const enqueue = useEnqueueBuildingMutation({
    buildingType: props.buildingType,
    fieldId: props.fieldId,
    targetLevel: props.targetLevel,
  });

  const onClick = async (): Promise<void> => {
    await enqueue();
    props.onSelect();
  };

  return (
    <div onClick={onClick}>
      Level
      {' '}
      {props.targetLevel}
    </div>
  );
};
