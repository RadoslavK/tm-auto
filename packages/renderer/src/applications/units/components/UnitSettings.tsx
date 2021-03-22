import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import clsx from 'clsx';
import React, {
  useEffect,
  useState, 
} from 'react';
import {
  useFragment,
  useLazyLoadQuery,
  useMutation,
} from 'react-relay/hooks';

import type { UnitSettings_autoUnitsUnitSettings$key } from '../../../_graphql/__generated__/UnitSettings_autoUnitsUnitSettings.graphql.js';
import type { UnitSettingsUnitInfoQuery } from '../../../_graphql/__generated__/UnitSettingsUnitInfoQuery.graphql.js';
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
  }),
  targetAmountInput: {
    maxWidth: 70,
  },
  unitImage: (props) => ({
    backgroundImage: `url("${imageLinks.getUnit(props.unitIndex)}")`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    filter: props.autoBuild ? undefined : 'grayscale(100%)',
    flex: '1',
    marginRight: 15,
    opacity: props.autoBuild ? undefined : 0.2,
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
          allow
      }
  }
`;

export const UnitSettings: React.FC<Props> = ({ className, settings }) => {
  const { index, ...settingsFragment } = useFragment(unitSettingsAutoUnitsUnitSettings, settings);
  const { unitInfo } = useLazyLoadQuery<UnitSettingsUnitInfoQuery>(unitSettingsUnitInfoQuery, { index });
  const [updateSettings] = useMutation(unitSettingsUpdateAutoUnitsUnitSettingsMutation);

  const [state, setState] = useState(settingsFragment);
  const [hasChanges, setHasChanges] = useState(false);

  //  TODO local cache
  const villageId = '' as any;

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

  useEffect(() => {
    if (hasChanges) {
      updateSettings({
        variables: {
          villageId,
          settings: state,
        },
      });
    }
  }, [state, hasChanges, updateSettings, villageId]);

  const onBoolChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { checked, name } = e.currentTarget;

    setState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    setHasChanges(true);
  };

  const onNumberChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;

    if (+value < 0) {
      return;
    }

    setState((prevState) => ({
      ...prevState,
      [name]: +value,
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
      <div
        className={classes.unitImage}
        onClick={toggleAutoBuild}
        title={unitInfo.name}
      />
      <div className={classes.unitInfo}>
        <div>
          <label htmlFor="trainForever">Unlimited</label>
          <input
            checked={trainForever}
            id="trainForever"
            name="trainForever"
            onChange={onBoolChange}
            type="checkbox"
          />
        </div>
        <div className={classes.targetAmount}>
          <label>Target:</label>
          <input
            className={classes.targetAmountInput}
            id="targetAmount"
            name="targetAmount"
            onChange={onNumberChange}
            type="number"
            value={targetAmount}
          />
        </div>
      </div>
    </div>
  );
};
