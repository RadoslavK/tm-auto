import React from 'react';

import {
  CoolDown as CoolDownModel,
  Duration as DurationModel,
} from '../../../_types/graphql';
import { Duration } from './Duration';

type Props = {
  readonly onChange: (coolDown: CoolDownModel) => void;
  readonly value: CoolDownModel;
};

export const CoolDown: React.FC<Props> = ({ onChange, value }) => {
  const updateMin = (newMin: DurationModel) => onChange({ ...value, min: newMin });
  const updateMax = (newMax: DurationModel) => onChange({ ...value, max: newMax });

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
