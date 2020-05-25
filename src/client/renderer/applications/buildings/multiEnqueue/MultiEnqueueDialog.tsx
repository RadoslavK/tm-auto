import React from 'react';

import { MultiEnqueueDialogItem } from './MultiEnqueueDialogItem';

type Props = {
  readonly buildingType: number;
  readonly fieldId: number;
  readonly maxLevel: number;
  readonly onSelect: () => void;
  readonly totalLevel: number;
};

export const MultiEnqueueDialog: React.FC<Props> = (props) => {
  const {
    buildingType,
    fieldId,
    maxLevel,
    onSelect,
    totalLevel,
  } = props;

  return (
    <div>
      {[...new Array(maxLevel - totalLevel).keys()].map(i => (
        <MultiEnqueueDialogItem
          key={i}
          buildingType={buildingType}
          fieldId={fieldId}
          onSelect={onSelect}
          targetLevel={i + totalLevel + 1}
        />
      ))}
    </div>
  );
};
