import {
  Button,
  Dialog,
  makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import type { Duration } from 'shared/types/duration.type.js';
import { formatTimeFromSeconds } from 'shared/utils/formatTime.js';

import { NextExecutionForm } from './NextExecutionForm.js';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  action: {
    marginLeft: 8,
  },
});

type Props = {
  readonly getAlternativeTitle?: (timer: string) => string;
  readonly onReset: () => void;
  readonly onChange: (newDuration: Duration) => void;
  readonly timer: number;
};

export const NextExecution: React.FC<Props> = ({
  getAlternativeTitle,
  onChange,
  onReset,
  timer,
}) => {
  const classes = useStyles();
  const [isFormShown, setIsFormShown] = useState(false);

  const openForm = () => setIsFormShown(true);
  const closeForm = () => setIsFormShown(false);

  const submitForm = (newDuration: Duration) => {
    closeForm();
    onChange(newDuration);
  };

  const formattedTimer = formatTimeFromSeconds(timer);
  const title = getAlternativeTitle?.(formattedTimer)
    ?? `Next execution in: ${formattedTimer}`;

  return (
    <div className={classes.root}>
      <div>
        {title}
      </div>
      <Button
        className={classes.action}
        onClick={openForm}
      >
        Change
      </Button>
      <Button
        className={classes.action}
        onClick={onReset}
      >
        Reset
      </Button>
      <Dialog
        onClose={closeForm}
        open={isFormShown}
      >
        <NextExecutionForm onSubmit={submitForm} />
      </Dialog>
    </div>
  );
};

NextExecution.displayName = 'NextExecution';