import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  makeStyles,
} from '@material-ui/core';
import { IDuration } from '../../../_types/graphql';

interface IProps {
  readonly onChange: (value: IDuration) => void;
  readonly value: IDuration;
}

const useStyles = makeStyles({
});

export const Duration: React.FC<IProps> = (props) => {
  const {
    onChange,
    value,
  } = props;

  const classes = useStyles();

  const [state, setState] = useState(value);

  const {
    seconds,
    minutes,
    hours,
    days,
  } = state;

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      onChange(state);
    }
  }, [state, onChange]);

  const onNumberChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    const {
      name,
      value: eventValue,
    } = e.currentTarget;

    const numValue = +eventValue;

    switch (name) {
      case 'minutes':
        if (numValue >= 60) {
          setState(prevState => ({ ...prevState, minutes: 0 }));
          return;
        }

        if (numValue < 0) {
          setState(prevState => ({ ...prevState, minutes: 59 }));
          return;
        }

        break;

      case 'seconds':
        if (numValue >= 60) {
          setState(prevState => ({ ...prevState, seconds: 0 }));
          return;
        }

        if (numValue < 0) {
          setState(prevState => ({ ...prevState, seconds: 59 }));
          return;
        }

        break;

      case 'hours':
        if (numValue >= 24) {
          setState(prevState => ({ ...prevState, days: 0 }));
        }

        if (numValue < 0) {
          setState(prevState => ({ ...prevState, hours: 23 }));
          return;
        }

        break;

      case 'days':
        if (numValue < 0) {
          return;
        }

        break;

      default:
        throw new Error(`Invalid value changed, name: ${name}`);
    }

    setState(prevState => ({
      ...prevState,
      [name]: numValue,
    }));
  };

  return (
    <div>
      <input type="number" value={days} onChange={onNumberChange} id="days" name="days" />
      <input type="number" value={hours} onChange={onNumberChange} id="hours" name="hours" />
      <input type="number" value={minutes} onChange={onNumberChange} id="minutes" name="minutes" />
      <input type="number" value={seconds} onChange={onNumberChange} id="seconds" name="seconds" />
    </div>
  );
};