import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  makeStyles,
  TextField,
  Tooltip,
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React, {
  useEffect,
  useState,
} from 'react';
import {
  useFragment,
  useMutation,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type { UnitSettings_autoUnitsUnitSettings$key } from '../../../_graphql/__generated__/UnitSettings_autoUnitsUnitSettings.graphql.js';
import type { UnitSettingsUnitInfoQuery } from '../../../_graphql/__generated__/UnitSettingsUnitInfoQuery.graphql.js';
import type { UnitSettingsUpdateAutoUnitsUnitSettingsMutation } from '../../../_graphql/__generated__/UnitSettingsUpdateAutoUnitsUnitSettingsMutation.graphql.js';
import { selectedVillageIdState } from '../../../_recoil/atoms/selectedVillageId.js';
import { useLazyLoadQuery } from '../../../_shared/hooks/useLazyLoadQuery.js';
import { imageLinks } from '../../../utils/imageLinks.js';

type Props = {
  readonly className?: string;
  readonly settings: UnitSettings_autoUnitsUnitSettings$key;
};

type StyleProps = {
  readonly autoBuild: boolean;
  readonly trainForever: boolean;
  readonly unitIndex: number;
};

const useStyles = makeStyles<unknown, StyleProps>({
  root: {
    display: 'flex',
  },
  targetAmount: (props) => ({
    display: 'flex',
    visibility: props.trainForever ? 'hidden' : undefined,
    maxWidth: 100,
  }),
  unitImage: (props) => ({
    backgroundImage: `url("${imageLinks.getUnit(props.unitIndex)}")`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    filter: props.autoBuild ? undefined : 'grayscale(100%)',
    flex: '1',
    marginRight: 15,
    opacity: props.autoBuild ? undefined : 0.2,
    cursor: 'pointer',
  }),
  unitInfo: {
    display: 'flex',
    flex: '3',
    flexDirection: 'column',
  },
});

const unitSettingsAutoUnitsUnitSettings = graphql`
  fragment UnitSettings_autoUnitsUnitSettings on AutoUnitsUnitSettings {
      index
      autoBuild
      targetAmount
      trainForever
  }
`;

const unitSettingsUnitInfoQuery = graphql`
  query UnitSettingsUnitInfoQuery($index: Int!) {
       unitInfo(index: $index) {
           name
       }
  }
`;

const unitSettingsUpdateAutoUnitsUnitSettingsMutation = graphql`
  mutation UnitSettingsUpdateAutoUnitsUnitSettingsMutation($villageId: ID!, $settings: UpdateAutoUnitsUnitSettingsInput!) {
      updateAutoUnitsUnitSettings(villageId: $villageId, settings: $settings) {
          ...Units_autoUnitsSettings
      }
  }
`;

export const UnitSettings: React.FC<Props> = ({ className, settings }) => {
  const settingsFragment = useFragment(unitSettingsAutoUnitsUnitSettings, settings);
  const { index } = settingsFragment;
  const { unitInfo } = useLazyLoadQuery<UnitSettingsUnitInfoQuery>(unitSettingsUnitInfoQuery, { index });
  const [updateSettings] = useMutation<UnitSettingsUpdateAutoUnitsUnitSettingsMutation>(unitSettingsUpdateAutoUnitsUnitSettingsMutation);

  const [state, setState] = useState(settingsFragment);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setState(settingsFragment);
    setHasChanges(false);
  }, [settingsFragment]);

  const { autoBuild, targetAmount, trainForever } = state;

  const classes = useStyles({
    autoBuild,
    trainForever,
    unitIndex: index,
  });

  const villageId = useRecoilValue(selectedVillageIdState);

  useEffect(() => {
    if (hasChanges) {
      updateSettings({
        variables: {
          villageId,
          settings: state,
        },
        updater: (store) => {
          const newRecord = store.getRootField('updateAutoUnitsUnitSettings');
          store.getRoot().setLinkedRecord(newRecord, 'autoUnitsSettings', { villageId });
        },
      });
    }
  }, [state, hasChanges, updateSettings, villageId]);

  const onUpdate = <Prop extends keyof typeof state>(prop: Prop, value: typeof state[Prop]): void => {
    setState((prevState) => ({
      ...prevState,
      [prop]: value,
    }));

    setHasChanges(true);
  };

  const toggleAutoBuild = (): void => {
    setState((prevState) => ({
      ...prevState,
      autoBuild: !prevState.autoBuild,
    }));

    setHasChanges(true);
  };

  return (
    <div className={clsx(className, classes.root)}>
      <Tooltip title={`Toggle ${unitInfo.name}`}>
        <div
          className={classes.unitImage}
          onClick={toggleAutoBuild}
        />
      </Tooltip>
      <FormGroup className={classes.unitInfo}>
        <FormControlLabel
          label="Unlimited"
          control={(
            <Checkbox
              value={trainForever}
              onChange={e => onUpdate('trainForever', e.currentTarget.checked)}
            />
          )}
        />
        <TextField
          className={classes.targetAmount}
          type="number"
          value={targetAmount}
          label="Target"
          onChange={e => onUpdate('targetAmount', +e.currentTarget.value)}
        />
      </FormGroup>
    </div>
  );
};

UnitSettings.displayName = 'UnitSettings';
