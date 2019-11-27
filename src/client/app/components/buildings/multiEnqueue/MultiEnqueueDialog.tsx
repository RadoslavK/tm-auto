import React from 'react';

import { MultiEnqueueDialogItem } from './MultiEnqueueDialogItem';

interface IProps {
  readonly buildingType: number;
  readonly fieldId: number;
  readonly maxLevel: number;
  readonly onSelect: () => void;
  readonly totalLevel: number;
}

export const MultiEnqueueDialog: React.FC<IProps> = (props) => {
  const {
    buildingType,
    fieldId,
    onSelect,
    totalLevel,
    maxLevel,
  } = props;

  return (
    <div>
      {[...new Array(maxLevel - totalLevel).keys()].map(i => (
        <MultiEnqueueDialogItem
          key={i}
          targetLevel={i + totalLevel + 1}
          buildingType={buildingType}
          fieldId={fieldId}
          onSelect={onSelect}
          totalLevel={totalLevel}
        />
      ))}
    </div>
  );
};
