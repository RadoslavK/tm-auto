import {
  makeStyles,
  TextField,
} from '@material-ui/core';
import React from 'react';
import type { Duration as DurationModel } from 'shared/types/duration.type.js';

const useStyles = makeStyles({
  input: {
    width: 40,
    '&:not(:last-child)': {
      marginRight: 8,
    },
  },
});

type Props = {
  readonly onChange: (value: DurationModel) => void;
  readonly value: DurationModel;
};

export const Duration: React.FC<Props> = ({ onChange, value }) => {
  const classes = useStyles();

  const onNumberChange = <Prop extends keyof DurationModel>(prop: Prop) => (e: React.ChangeEvent<HTMLInputElement>): void => {
    const numValue = +e.currentTarget.value;

    switch (prop) {
      case 'minutes':
        if (numValue >= 60) {
          onChange({ ...value, minutes: 0 });

          return;
        }

        if (numValue < 0) {
          onChange({ ...value, minutes: 59 });

          return;
        }

        onChange({ ...value, minutes: numValue });

        break;

      case 'seconds':
        if (numValue >= 60) {
          onChange({ ...value, seconds: 0 });

          return;
        }

        if (numValue < 0) {
          onChange({ ...value, seconds: 59 });

          return;
        }

        onChange({ ...value, seconds: numValue });

        break;

      case 'hours':
        if (numValue >= 24) {
          onChange({ ...value, hours: 0 });

          return;
        }

        if (numValue < 0) {
          onChange({ ...value, hours: 23 });

          return;
        }

        onChange({ ...value, hours: numValue });

        break;

      case 'days':
        if (numValue < 0) {
          return;
        }

        onChange({ ...value, days: numValue });

        break;

      default:
        throw new Error(`Invalid value changed, name: ${name}`);
    }
  };

  return (
    <div>
      <TextField
        className={classes.input}
        label="Days"
        onChange={onNumberChange('days')}
        type="number"
        value={value.days}
      />
      <TextField
        className={classes.input}
        label="Hours"
        onChange={onNumberChange('hours')}
        type="number"
        value={value.hours}
      />
      <TextField
        className={classes.input}
        label="Minutes"
        onChange={onNumberChange('minutes')}
        type="number"
        value={value.minutes}
      />
      <TextField
        className={classes.input}
        label="Seconds"
        onChange={onNumberChange('seconds')}
        type="number"
        value={value.days}
      />
    </div>
  );
};

Duration.displayName = 'Duration';