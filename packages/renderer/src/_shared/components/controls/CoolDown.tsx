import { makeStyles } from '@material-ui/core';
import React from 'react';
import type { Duration as DurationModel } from 'shared/types/duration.type.js';

import type { CoolDown as CoolDownModel } from '../../../models/coolDown.type.js';
import { Duration } from './Duration.js';

const useStyles = makeStyles({
  durationRow: {
    marginBottom: 16,
    '& > *': {
      marginBottom: 8,
    },
  },
});

type Props = {
  readonly onChange: (coolDown: CoolDownModel) => void;
  readonly value: CoolDownModel;
};

export const CoolDown: React.FC<Props> = ({ onChange, value }) => {
  const classes = useStyles();
  const updateMin = (newMin: DurationModel) =>
    onChange({ ...value, min: newMin });
  const updateMax = (newMax: DurationModel) =>
    onChange({ ...value, max: newMax });

  return (
    <div>
      <div className={classes.durationRow}>
        <div>Min</div>
        <Duration onChange={updateMin} value={value.min} />
      </div>
      <div className={classes.durationRow}>
        <div>Max</div>
        <Duration onChange={updateMax} value={value.max} />
      </div>
    </div>
  );
};

CoolDown.displayName = 'CoolDown';