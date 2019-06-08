import React from 'react';
import { MultiEnqueueDialogItem } from './MultiEnqueueDialogItem';

interface IProps {
  readonly buildingType: number;
  readonly fieldId: number;
  readonly maxLevel: number;
  readonly onSelect: () => void;
  readonly totalLevel: number;
}

const MultiEnqueueDialog: React.FunctionComponent<IProps> = (props) => {
  const {
    totalLevel,
    maxLevel,
  } = props;

  return (
    <div>
      {[...Array(maxLevel - totalLevel).keys()].map(i => (
        <MultiEnqueueDialogItem key={i} {...props} targetLevel={i + totalLevel + 1} />
      ))}
    </div>
  );
};

MultiEnqueueDialog.displayName = 'MultiEnqueueDialog';

export { MultiEnqueueDialog };
