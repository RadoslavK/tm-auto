import {
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  root: {
    cursor: 'pointer',
  },
});

type Props = {
  readonly onSelect: () => void;
  readonly level: number;
  readonly title: string;
};

export const MultiLevelDialogItem: React.FC<Props> = ({ level, onSelect, title }) => {
  const classes = useStyles();

  return (
    <Tooltip title={title}>
      <div
        className={classes.root}
        onClick={onSelect}
      >
        Level {level}
      </div>
    </Tooltip>
  );
};

MultiLevelDialogItem.displayName = 'MultiLevelDialogItem';