import React from 'react';

import {
  ICoolDown,
  IDuration,
} from '../../../_types/graphql';
import { Duration } from './Duration';

interface IProps {
  readonly onChange: (coolDown: ICoolDown) => void;
  readonly value: ICoolDown;
}

export const CoolDown: React.FC<IProps> = ({ onChange, value }) => {
  const updateMin = (newMin: IDuration) => onChange({ ...value, min: newMin });
  const updateMax = (newMax: IDuration) => onChange({ ...value, max: newMax });

  return (
    <div>
      <Duration
        onChange={updateMin}
        value={value.min}
      />
      <Duration
        onChange={updateMax}
        value={value.max}
      />
    </div>
  );
};
