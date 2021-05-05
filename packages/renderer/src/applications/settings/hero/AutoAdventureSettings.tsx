import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  makeStyles,
  Radio,
  RadioGroup,
  TextField,
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useFragment,
  useMutation,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';
import { adventureCriterias } from 'shared/enums/AdventureCriteria.js';
import { TaskType } from 'shared/enums/TaskType.js';
import type { Duration as DurationModel } from 'shared/types/duration.type.js';

import type { AutoAdventureSettings_autoAdventureSettings$key } from '../../../_graphql/__generated__/AutoAdventureSettings_autoAdventureSettings.graphql.js';
import type { AutoAdventureSettings_timestamp$key } from '../../../_graphql/__generated__/AutoAdventureSettings_timestamp.graphql.js';
import type { AutoAdventureSettingsResetSettingsMutation } from '../../../_graphql/__generated__/AutoAdventureSettingsResetSettingsMutation.graphql.js';
import type { AutoAdventureSettingsSubscription } from '../../../_graphql/__generated__/AutoAdventureSettingsSubscription.graphql.js';
import type {
  AdventureCriteria,
  AutoAdventureSettingsUpdateSettingsMutation,
} from '../../../_graphql/__generated__/AutoAdventureSettingsUpdateSettingsMutation.graphql.js';
import { CoolDown } from '../../../_shared/components/controls/CoolDown.js';
import { Duration } from '../../../_shared/components/controls/Duration.js';
import { NextTaskExecution } from '../../../_shared/components/nextTaskExecution/NextTaskExecution.js';
import type { CoolDown as CoolDownModel } from '../../../models/coolDown.type.js';

const settingsFragmentDef = graphql`
    fragment AutoAdventureSettings_autoAdventureSettings on AutoAdventureSettings {
        adventureCriteria
        allow
        coolDown {
            ...CoolDown @relay(mask: false)
        }
        hardMinHealth
        maxTravelTime {
            ...Duration @relay(mask: false)
        }
        normalMinHealth
        preferHard
    }
`;

const nextTaskExecutionFragmentDef =  graphql`
  fragment AutoAdventureSettings_timestamp on Timestamp {
      ...NextTaskExecution_timestamp
  }
`;

const autoAdventureSettingsUpdateSettingsMutation = graphql`
  mutation AutoAdventureSettingsUpdateSettingsMutation($settings: UpdateAutoAdventureSettingsInput!) {
      updateAutoAdventureSettings(settings: $settings) {
          ...AutoAdventureSettings_autoAdventureSettings
      }
  }
`;

const autoAdventureSettingsResetSettingsMutation = graphql`
    mutation AutoAdventureSettingsResetSettingsMutation {
        resetAutoAdventureSettings {
            ...AutoAdventureSettings_autoAdventureSettings
        }
    }
`;

const subscription = graphql`
  subscription AutoAdventureSettingsSubscription {
      autoAdventureSettingsUpdated {
          ...AutoAdventureSettings_autoAdventureSettings
      }
  }
`;

const useStyles = makeStyles({
  header: {
    display: 'inline-block',
    marginRight: 16,
  },
  resetAction: {
    verticalAlign: 'super',
  },
  form: {
    '& > *': {
      marginBottom: 16,
    },
  },
  healthFields: {
    display: 'flex',
    '& > *': {
      marginRight: 16,
    },
  },
  healthInput: {
    maxWidth: 50,
  },
});

type Props = {
  readonly settingsKey: AutoAdventureSettings_autoAdventureSettings$key;
  readonly timestampKey: AutoAdventureSettings_timestamp$key;
};

export const AutoAdventureSettings: React.FC<Props> = ({ settingsKey, timestampKey }) => {
  const classes = useStyles();
  const autoAdventureSettings = useFragment(settingsFragmentDef, settingsKey);
  const nextTaskExecution = useFragment(nextTaskExecutionFragmentDef, timestampKey);

  const [updateSettings] = useMutation<AutoAdventureSettingsUpdateSettingsMutation>(autoAdventureSettingsUpdateSettingsMutation);
  const [resetSettings] = useMutation<AutoAdventureSettingsResetSettingsMutation>(autoAdventureSettingsResetSettingsMutation);

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<AutoAdventureSettingsSubscription> => ({
    subscription,
    variables: {},
    updater: (store) => {
      const newRecord = store.getRootField('autoAdventureSettingsUpdated');
      store.getRoot().setLinkedRecord(newRecord, 'autoAdventureSettings');
    },
  }), []);

  useSubscription(subscriptionConfig);

  const [state, setState] = useState(autoAdventureSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setState(autoAdventureSettings);
    setHasChanges(false);
  }, [autoAdventureSettings]);

  useEffect(() => {
    if (hasChanges) {
      updateSettings({
        variables: { settings: state },
        updater: (store) => {
          const newRecord = store.getRootField('updateAutoAdventureSettings');
          store.getRoot().setLinkedRecord(newRecord, 'autoAdventureSettings');
        },
      });
    }
  }, [state, hasChanges, updateSettings]);

  const onMaxTravelTimeChange = useCallback(
    (newMaxTravelTime: DurationModel) => {
      setState((prevState) => ({ ...prevState, maxTravelTime: newMaxTravelTime }));
      setHasChanges(true);
    },
    [],
  );

  const onCooldownChange = useCallback(
    (updatedCooldown: CoolDownModel): void => {
      setState((prevState) => ({
        ...prevState,
        coolDown: updatedCooldown,
      }));
      setHasChanges(true);
    },
    [],
  );

  const onReset = () => {
    resetSettings({
      variables: {},
      updater: (store) => {
        const newRecord = store.getRootField('resetAutoAdventureSettings');
        store.getRoot().setLinkedRecord(newRecord, 'autoAdventureSettings');
      },
    });
  };

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

  const onAdventureCriteriaChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value } = e.target;

    setState((prevState) => ({
      ...prevState,
      adventureCriteria: value as AdventureCriteria,
    }));
    setHasChanges(true);
  };

  const {
    adventureCriteria,
    allow,
    coolDown,
    hardMinHealth,
    maxTravelTime,
    normalMinHealth,
    preferHard,
  } = state;

  return (
    <div>
      <h2 className={classes.header}>
        Auto Adventure settings
      </h2>
      <Button
        className={classes.resetAction}
        color="secondary"
        onClick={onReset}
        type="button"
        variant="outlined"
      >
        Reset to default
      </Button>
      <NextTaskExecution
        task={TaskType.AutoAdventure}
        timestamp={nextTaskExecution}
      />
      <FormGroup className={classes.form}>
        <FormControlLabel
          label="Allow"
          control={(
            <Checkbox
              checked={allow}
              name="allow"
              onChange={onBoolChange}
            />
          )}
        />
        <FormControlLabel
          label="Prefer hard"
          control={(
            <Checkbox
              checked={preferHard}
              name="preferHard"
              onChange={onBoolChange}
            />
          )}
        />
        <div>
          <h4>
            Max travel time
          </h4>
          <Duration
            onChange={onMaxTravelTimeChange}
            value={maxTravelTime}
          />
        </div>
        <div>
          <h4>
            Min health
          </h4>
          <div className={classes.healthFields}>
            <TextField
              className={classes.healthInput}
              label="Normal"
              name="normalMinHealth"
              onChange={onNumberChange}
              type="number"
              value={normalMinHealth}
            />
            <TextField
              className={classes.healthInput}
              label="Hard"
              name="hardMinHealth"
              onChange={onNumberChange}
              type="number"
              value={hardMinHealth}
            />
          </div>
        </div>
        <div>
          <FormControl>
            <FormLabel>
              Adventure criteria
            </FormLabel>
            <RadioGroup
              value={adventureCriteria}
              onChange={onAdventureCriteriaChange}
            >
              {adventureCriterias.map((option) => (
                <FormControlLabel
                  id={option}
                  label={option}
                  control={<Radio />}
                  value={option}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </div>
        <h4>CoolDown</h4>
        <CoolDown onChange={onCooldownChange} value={coolDown} />
      </FormGroup>
    </div>
  );
};

AutoAdventureSettings.displayName = 'AutoAdventureSettings';