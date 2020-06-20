import React from 'react';

import { MultiLevelDialogItem } from './MultiLevelDialogItem';

type Props = {
  readonly maxLevel: number;
  readonly onSelect: (targetLevel: number) => void;
  readonly minLevel: number;
};

export const MultiLevelDialog: React.FC<Props> = ({
  maxLevel,
  minLevel,
  onSelect,
}) => (
  <div>
    {[...new Array(maxLevel - minLevel + 1).keys()].map((i) => {
      const level = i + minLevel;

      return (
        <MultiLevelDialogItem
          key={i}
          level={level}
          onSelect={() => onSelect(level)}
        />
      );
    })}
  </div>
);
