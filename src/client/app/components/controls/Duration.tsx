import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  makeStyles,
} from '@material-ui/core';

interface IProps {
  readonly onChange: (value: number) => void;
  readonly value: number;
}

const useStyles = makeStyles({
});

const getInitialState = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  const seconds = totalSeconds - hours * 3600 - minutes * 60;

  return {
    hours,
    minutes,
    seconds,
  };
};

export const Duration: React.FC<IProps> = (props) => {
  const {
    onChange,
    value,
  } = props;

  const classes = useStyles();

  const [state, setState] = useState(getInitialState(value));

  const {
    seconds,
    minutes,
    hours,
  } = state;

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      const totalSeconds = ((hours * 60) + minutes) * 60 + seconds;
      onChange(totalSeconds);
    }
  }, [hours, minutes, seconds, onChange]);

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
      <input type="number" value={hours} onChange={onNumberChange} id="hours" name="hours" />
      <input type="number" value={minutes} onChange={onNumberChange} id="minutes" name="minutes" />
      <input type="number" value={seconds} onChange={onNumberChange} id="seconds" name="seconds" />
    </div>
  );
};