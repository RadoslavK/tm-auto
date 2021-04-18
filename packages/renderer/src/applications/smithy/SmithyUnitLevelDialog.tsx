import {
  Button,
  TextField,
} from '@material-ui/core';
import React, { useState } from 'react';

export type SmithyUnitLevelDialogSubmitResult = {
  readonly targetLevel: number;
  readonly minTroops: number;
};

type Props = {
  readonly minTargetLevel: number;
  readonly onSubmit: (result: SmithyUnitLevelDialogSubmitResult) => void;
};

export const SmithyUnitLevelDialog: React.FC<Props> = ({ minTargetLevel, onSubmit }) => {
  const [targetLevel, setTargetLevel] = useState(minTargetLevel);
  const [minTroops, setMinTroops] = useState(0);

  const updateTargetLevel = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let level = +e.currentTarget.value;
    level = Math.min(level, 20);
    level = Math.max(level, minTargetLevel);

    setTargetLevel(level);
  };

  const updateMinTroops = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let level = +e.currentTarget.value;
    level = Math.max(level, 0);

    setMinTroops(level);
  };

  const submit = () => {
    onSubmit({ targetLevel, minTroops });
  };

  return (
    <div>
      <TextField
        autoComplete="Target Level"
        autoFocus
        type="number"
        fullWidth
        label="Target level"
        margin="normal"
        onChange={updateTargetLevel}
        required
        value={targetLevel}
        variant="outlined"
      />
      <TextField
        autoComplete="Min Troops"
        autoFocus
        type="number"
        fullWidth
        label="Min troops"
        margin="normal"
        onChange={updateMinTroops}
        required
        value={minTroops}
        variant="outlined"
      />
      <Button
        color="primary"
        onClick={submit}
        variant="outlined"
      >
        Submit
      </Button>
    </div>
  );
};

SmithyUnitLevelDialog.displayName = 'SmithyUnitLevelDialog';