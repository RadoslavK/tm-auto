import {
  Button,
  Dialog,
  makeStyles,
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, { useState } from 'react';
import {
  useFragment,
  useMutation,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { SmithyUnit_autoSmithyUnitSettings$key } from '../../_graphql/__generated__/SmithyUnit_autoSmithyUnitSettings.graphql.js';
import type { SmithyUnitAddUnitLevelMutation } from '../../_graphql/__generated__/SmithyUnitAddUnitLevelMutation.graphql.js';
import type { SmithyUnitClearUnitMutation } from '../../_graphql/__generated__/SmithyUnitClearUnitMutation.graphql.js';
import { selectedVillageIdState } from '../../_recoil/atoms/selectedVillageId.js';
import { imageLinks } from '../../utils/imageLinks.js';
import {
  SmithyUnitLevelDialog,
  SmithyUnitLevelDialogSubmitResult,
} from './SmithyUnitLevelDialog.js';
import { SmithyUnitLevels } from './SmithyUnitLevels.js';

const unitFragmentDef = graphql`
    fragment SmithyUnit_autoSmithyUnitSettings on AutoSmithyUnitSettings {
        unitIndex
        levels {
            targetLevel
            ...SmithyUnitLevels_autoSmithyUnitLevelSettings
        }
    }
`;

const clearUnitMutation = graphql`
    mutation SmithyUnitClearUnitMutation($villageId: ID!, $unitIndex: Int!) {
        clearAutoSmithySettingsUnit(villageId: $villageId, unitIndex: $unitIndex) {
            ...Smithy_autoSmithySettings
        }
    }
`;

const addUnitLevelMutation = graphql`
  mutation SmithyUnitAddUnitLevelMutation($villageId: ID!, $unitIndex: Int!, $targetLevel: Int!, $minTroops: Int!) {
      addAutoSmithyUnitLevel(villageId: $villageId, unitIndex: $unitIndex, targetLevel: $targetLevel, minTroops: $minTroops) {
          ...Smithy_autoSmithySettings
      }
  }
`;

type StylesProps = {
  readonly unitIndex: number;
};

const useStyles = makeStyles<unknown, StylesProps>({
  root: {
    marginTop: 16,
  },
  action: {
    marginRight: 8,
  },
  header: {
    display: 'flex',
    marginBottom: 8,
  },
  unitImg: {
    backgroundImage: ({ unitIndex }) => `url("${imageLinks.getUnit(unitIndex)}")`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: 24,
    width: 24,
    marginRight: 12,
  },
});

type Props = {
  readonly unitIndex: number;
  readonly unitKey: SmithyUnit_autoSmithyUnitSettings$key | undefined;
};

export const SmithyUnit: React.FC<Props> = ({ unitIndex, unitKey }) => {
  const classes = useStyles({ unitIndex });
  const villageId = useRecoilValue(selectedVillageIdState);
  const unit = useFragment(unitFragmentDef, unitKey || null);
  const [clearUnitSettings] = useMutation<SmithyUnitClearUnitMutation>(clearUnitMutation);

  const onClear = (): void => {
    if (!unit) {
      return;
    }

    clearUnitSettings({
      variables: { villageId, unitIndex: unit.unitIndex },
      updater: (store) => {
        const newRecord = store.getRootField('clearAutoSmithySettingsUnit');
        store.getRoot().setLinkedRecord(newRecord, 'autoSmithySettings', { villageId });
      },
    });
  };

  const lastLevel = unit?.levels[unit?.levels.length - 1]?.targetLevel ?? 0;
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const isAddingDisabled = lastLevel >= 20;

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const [addLevel] = useMutation<SmithyUnitAddUnitLevelMutation>(addUnitLevelMutation);

  const addUnitLevel = ({ targetLevel, minTroops }: SmithyUnitLevelDialogSubmitResult) => {
    closeDialog();

    addLevel({
      variables: {
        minTroops,
        targetLevel,
        unitIndex,
        villageId,
      },
      updater: (store) => {
        const newRecord = store.getRootField('addAutoSmithyUnitLevel');
        store.getRoot().setLinkedRecord(newRecord, 'autoSmithySettings', { villageId });
      },
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.unitImg} />
        <Button
          className={classes.action}
          color="primary"
          variant="outlined"
          disabled={isAddingDisabled}
          onClick={openDialog}
        >
          Add
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          onClick={onClear}
        >
          Clear unit
        </Button>
      </div>
      {unit && <SmithyUnitLevels levelsKey={unit.levels} unitIndex={unitIndex} />}
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
      >
        <SmithyUnitLevelDialog
          minTargetLevel={lastLevel + 1}
          onSubmit={addUnitLevel}
        />
      </Dialog>
    </div>
  );
};

SmithyUnit.displayName = 'SmithyUnit';