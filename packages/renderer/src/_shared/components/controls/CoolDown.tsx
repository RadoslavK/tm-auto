import React from 'react';
import type { Duration as DurationModel } from 'shared/types/duration.type.js';

import type { CoolDown as CoolDownModel } from '../../../models/coolDown.type.js';
import { Duration } from './Duration.js';

type Props = {
  readonly onChange: (coolDown: CoolDownModel) => void;
  readonly value: CoolDownModel;
};

export const CoolDown: React.FC<Props> = ({ onChange, value }) => {
  const updateMin = (newMin: DurationModel) =>
    onChange({ ...value, min: newMin });
  const updateMax = (newMax: DurationModel) =>
    onChange({ ...value, max: newMax });

  return (
    <div>
      <Duration onChange={updateMin} value={value.min} />
      <Duration onChange={updateMax} value={value.max} />
    </div>
  );
};

CoolDown.displayName = 'CoolDown';