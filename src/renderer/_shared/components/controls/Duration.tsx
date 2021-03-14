import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Duration as DurationModel } from '../../../../_shared/types/duration.type';

const useStyles = makeStyles({
  input: {
    width: 40,
  },
});

type Props = {
  readonly onChange: (value: DurationModel) => void;
  readonly value: DurationModel;
};

export const Duration: React.FC<Props> = ({ onChange, value }) => {
  const classes = useStyles();

  const onNumberChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value: eventValue } = e.currentTarget;

    const numValue = +eventValue;

    switch (name) {
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
      <input
        className={classes.input}
        id="days"
        name="days"
        onChange={onNumberChange}
        type="number"
        value={value.days}
      />
      <input
        className={classes.input}
        id="hours"
        name="hours"
        onChange={onNumberChange}
        type="number"
        value={value.hours}
      />
      <input
        className={classes.input}
        id="minutes"
        name="minutes"
        onChange={onNumberChange}
        type="number"
        value={value.minutes}
      />
      <input
        className={classes.input}
        id="seconds"
        name="seconds"
        onChange={onNumberChange}
        type="number"
        value={value.seconds}
      />
    </div>
  );
};
