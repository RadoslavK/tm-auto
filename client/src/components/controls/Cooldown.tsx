import { useEffect, useState } from 'react';
import * as React from 'react';
import { ICoolDown } from '../../_types/graphql';

interface IProps {
  readonly onChange: (cooldown: ICoolDown) => void;
  readonly value: ICoolDown;
}

export const CooldDown: React.FunctionComponent<IProps> = (props) => {
  const {
    onChange,
    value,
  } = props;

  const [state, setState] = useState({ ...value });

  useEffect(() => {
    if (state !== value) {
      onChange(state);
    }
  }, [state]);

  const onNumberChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const {
      name,
      value,
    } = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      [name]: +value,
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
