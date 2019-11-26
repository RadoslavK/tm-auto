import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  ICoolDown,
  IDuration,
} from '../../../_types/graphql';
import { Duration } from './Duration';

interface IProps {
  readonly onChange: (cooldown: ICoolDown) => void;
  readonly value: ICoolDown;
}

export const CoolDown: React.FC<IProps> = (props) => {
  const {
    onChange,
    value,
  } = props;

  const [state, setState] = useState(value);

  useEffect(() => {
    if (state !== value) {
      onChange(state);
    }
  }, [state, value, onChange]);

  const {
    min,
    max,
  } = state;

  const updateMin = useCallback((newMin: IDuration) => setState(prevState => ({ ...prevState, min: newMin })), [setState]);
  const updateMax = useCallback((newMax: IDuration) => setState(prevState => ({ ...prevState, max: newMax })), [setState]);

  return (
    <div>
      <Duration onChange={updateMin} value={min}/>
      <Duration onChange={updateMax} value={max}/>
    </div>
  );
};
