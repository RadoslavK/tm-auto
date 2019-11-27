import React, {
  useCallback,
  useEffect,
  useRef,
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

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setState(value);
    }
  }, [value]);

  useEffect(() => {
    if (state !== value) {
      onChange(state);
    }
  }, [state, onChange]);

  const {
    min,
    max,
  } = state;

  const updateMin = useCallback((newMin: IDuration) => setState(prevState => ({ ...prevState, min: newMin })), []);
  const updateMax = useCallback((newMax: IDuration) => setState(prevState => ({ ...prevState, max: newMax })), []);

  return (
    <div>
      <Duration onChange={updateMin} value={min}/>
      <Duration onChange={updateMax} value={max}/>
    </div>
  );
};
