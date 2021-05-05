import {
  Button,
  makeStyles,
} from '@material-ui/core';
import React, { useState } from 'react';
import type { Duration } from 'shared/types/duration.type.js';

import { Duration as DurationComponent } from '../controls/Duration.js';

const useStyles = makeStyles({
  root: {
    padding: 16,
  },
  header: {
    textAlign: 'center',
  },
  submit: {
    marginTop: 16,
    display: 'block',
    margin: '0 auto',
  },
});

type Props = {
  readonly onSubmit: (delay: Duration) => void;
};

const defaultDelay: Duration = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export const NextExecutionForm: React.FC<Props> = ({ onSubmit }) => {
  const classes = useStyles();
  const [delay, setDelay] = useState<Duration>(defaultDelay);

  const submit = () => onSubmit(delay);

  return (
    <div className={classes.root}>
      <h3 className={classes.header}>New duration</h3>
      <DurationComponent onChange={setDelay} value={delay} />
      <Button
        className={classes.submit}
        color="primary"
        variant="contained"
        onClick={submit}
      >
        Submit
      </Button>
    </div>
  );
};

NextExecutionForm.displayName = 'NextExecutionForm';