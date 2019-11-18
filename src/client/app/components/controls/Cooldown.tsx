import React, { useEffect, useState } from 'react';
import { ICoolDown } from '../../../_types/graphql';

interface IProps {
  readonly onChange: (cooldown: ICoolDown) => void;
  readonly value: ICoolDown;
}

export const CoolDown: React.FunctionComponent<IProps> = (props) => {
  const {
    onChange,
    value,
  } = props;

  const [state, setState] = useState({ ...value });

  useEffect(() => {
    if (state !== value) {
      onChange(state);
    }
  }, [state, value, onChange]);

  const onNumberChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    const {
      name,
      value: eventValue,
    } = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      [name]: +eventValue,
    }));
  };

  const {
    min,
    max,
  } = state;

  return (
    <div>
      <input type="number" value={min} onChange={onNumberChange} id="min" name="min" />
      <input type="number" value={max} onChange={onNumberChange} id="max" name="max" />
    </div>
  );
};
