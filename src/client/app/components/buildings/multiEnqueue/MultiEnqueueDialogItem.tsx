import React from 'react';

import { useEnqueueBuildingMutation } from '../../../hooks/useEnqueueBuildingMutation';

interface IProps {
  readonly buildingType: number;
  readonly fieldId: number;
  readonly onSelect: () => void;
  readonly targetLevel: number;
}

export const MultiEnqueueDialogItem: React.FC<IProps> = (props) => {
  const [enqueue] = useEnqueueBuildingMutation({
    fieldId: props.fieldId,
    buildingType: props.buildingType,
    targetLevel: props.targetLevel,
  });

  const onClick = async (): Promise<void> => {
    await enqueue();
    props.onSelect();
  };

  return (
    <div onClick={onClick}>
      Level {props.targetLevel}
    </div>
  );
};
