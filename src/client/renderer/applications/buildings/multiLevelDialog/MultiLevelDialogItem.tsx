import React from 'react';

type Props = {
  readonly onSelect: () => void;
  readonly level: number;
};

export const MultiLevelDialogItem: React.FC<Props> = ({ level, onSelect }) => (
  <div onClick={onSelect}>Level {level}</div>
);
