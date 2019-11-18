import React from 'react';
import { useEnqueueBuildingMutation } from '../../../hooks/useEnqueueBuildingMutation';

interface IProps {
  readonly buildingType: number;
  readonly fieldId: number;
  readonly onSelect: () => void;
  readonly targetLevel: number;
  readonly totalLevel: number;
}

export const MultiEnqueueDialogItem: React.FunctionComponent<IProps> = (props) => {
  const [enqueue] = useEnqueueBuildingMutation({
    fieldId: props.fieldId,
    buildingType: props.buildingType,
    levels: props.targetLevel - props.totalLevel,
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
