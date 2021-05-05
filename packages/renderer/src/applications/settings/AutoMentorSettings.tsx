import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  makeStyles,
} from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
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

import type { AutoMentorSettings_autoMentorSettings$key } from '../../_graphql/__generated__/AutoMentorSettings_autoMentorSettings.graphql.js';
import type { AutoMentorSettingsResetSettingsMutation } from '../../_graphql/__generated__/AutoMentorSettingsResetSettingsMutation.graphql.js';
import type { AutoMentorSettingsSubscription } from '../../_graphql/__generated__/AutoMentorSettingsSubscription.graphql.js';
import type { AutoMentorSettingsUpdateSettingsMutation } from '../../_graphql/__generated__/AutoMentorSettingsUpdateSettingsMutation.graphql.js';

const fragmentDef = graphql`
    fragment AutoMentorSettings_autoMentorSettings on AutoMentorSettings {
        acceptDailyRewards
        acceptTaskRewards
    }
`;

const autoMentorSettingsUpdateSettingsMutation = graphql`
  mutation AutoMentorSettingsUpdateSettingsMutation($settings: UpdateAutoMentorSettingsInput!) {
      updateAutoMentorSettings(settings: $settings) {
          ...AutoMentorSettings_autoMentorSettings
      }
  }
`;

const autoMentorSettingsResetSettingsMutation = graphql`
    mutation AutoMentorSettingsResetSettingsMutation {
        resetAutoMentorSettings {
            ...AutoMentorSettings_autoMentorSettings
        }
    }
`;

const subscription = graphql`
  subscription AutoMentorSettingsSubscription {
      autoMentorSettingsUpdated {
          ...AutoMentorSettings_autoMentorSettings
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
});

type Props = {
  readonly settingsKey: AutoMentorSettings_autoMentorSettings$key;
};

export const AutoMentorSettings: React.FC<Props> = ({ settingsKey }) => {
  const classes = useStyles();
  const autoMentorSettings = useFragment(fragmentDef, settingsKey);
  const [updateSettings] = useMutation<AutoMentorSettingsUpdateSettingsMutation>(autoMentorSettingsUpdateSettingsMutation);
  const [resetSettings] = useMutation<AutoMentorSettingsResetSettingsMutation>(autoMentorSettingsResetSettingsMutation);

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<AutoMentorSettingsSubscription> => ({
    subscription,
    variables: {},
    updater: (store) => {
      const newRecord = store.getRootField('autoMentorSettingsUpdated');
      store.getRoot().setLinkedRecord(newRecord, 'autoMentorSettings');
    },
  }), []);

  useSubscription(subscriptionConfig);

  const [state, setState] = useState(autoMentorSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setState(autoMentorSettings);
    setHasChanges(false);
  }, [autoMentorSettings]);

  useEffect(() => {
    if (hasChanges) {
      updateSettings({
        variables: {
          settings: state,
        },
        updater: (store) => {
          const newRecord = store.getRootField('updateAutoMentorSettings');
          store.getRoot().setLinkedRecord(newRecord, 'autoMentorSettings');
        },
      });
    }
  }, [state, hasChanges, updateSettings]);

  const onCheckBoxChange = async (e: React.FormEvent<HTMLInputElement>): Promise<void> => {
    const { checked, name } = e.currentTarget;

    setState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    setHasChanges(true);
  };

  const onReset = () => {
    resetSettings({
      variables: {},
      updater: (store) => {
        const newRecord = store.getRootField('resetAutoMentorSettings');
        store.getRoot().setLinkedRecord(newRecord, 'autoMentorSettings');
      },
    });
  };

  return (
    <div>
      <h1 className={classes.header}>
        Mentor settings
      </h1>
      <Button
        className={classes.resetAction}
        color="secondary"
        onClick={onReset}
        type="button"
        variant="outlined">
        Reset to default
      </Button>
      <FormGroup>
        <FormControlLabel
          label="Accept task rewards"
          control={(
            <Checkbox
              checked={state.acceptTaskRewards}
              name="acceptTaskRewards"
              onChange={onCheckBoxChange}
            />
          )}
        />
        <FormControlLabel
          label="Accept daily rewards"
          control={(
            <Checkbox
              checked={state.acceptDailyRewards}
              name="acceptDailyRewards"
              onChange={onCheckBoxChange}
            />
          )}
        />
      </FormGroup>
    </div>
  );
};

AutoMentorSettings.displayName = 'AutoMentorSettings';