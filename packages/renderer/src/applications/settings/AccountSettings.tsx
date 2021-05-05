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

import type { AccountSettings_accountSettings$key } from '../../_graphql/__generated__/AccountSettings_accountSettings.graphql.js';
import type { AccountSettingsResetSettingsMutation } from '../../_graphql/__generated__/AccountSettingsResetSettingsMutation.graphql.js';
import type { AccountSettingsSubscription } from '../../_graphql/__generated__/AccountSettingsSubscription.graphql.js';
import type { AccountSettingsUpdateSettingsMutation } from '../../_graphql/__generated__/AccountSettingsUpdateSettingsMutation.graphql.js';
import { CoolDown } from '../../_shared/components/controls/CoolDown.js';
import { Duration } from '../../_shared/components/controls/Duration.js';
import type { CoolDown as CoolDownModel } from '../../models/coolDown.type.js';

const fragmentDef = graphql`
    fragment AccountSettings_accountSettings on AccountSettings {
        allowTasks
        autoBuild {
            allow
            videoFeature {
                allow
                minBuildTime {
                    ...Duration @relay(mask: false)
                }
            }
        }
        autoParty
        autoUnits
        autoAcademy
        autoSmithy
        useHeroResources
        tasksCoolDown {
            ...CoolDown @relay(mask: false)
        }
    }
`;

const accountSettingsUpdateSettingsMutation = graphql`
  mutation AccountSettingsUpdateSettingsMutation($settings: UpdateAccountSettingsInput!) {
      updateAccountSettings(settings: $settings) {
          ...AccountSettings_accountSettings
      }
  }
`;

const accountSettingsResetSettingsMutation = graphql`
    mutation AccountSettingsResetSettingsMutation {
        resetAccountSettings {
            ...AccountSettings_accountSettings
        }
    }
`;

const subscription = graphql`
  subscription AccountSettingsSubscription {
      accountSettingsUpdated {
          ...AccountSettings_accountSettings
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
  readonly settingsKey: AccountSettings_accountSettings$key;
};

export const AccountSettings: React.FC<Props> = ({ settingsKey }) => {
  const classes = useStyles();
  const accountSettings = useFragment(fragmentDef, settingsKey);
  const [updateSettings] = useMutation<AccountSettingsUpdateSettingsMutation>(accountSettingsUpdateSettingsMutation);
  const [resetSettings] = useMutation<AccountSettingsResetSettingsMutation>(accountSettingsResetSettingsMutation);

  const subscriptionConfig = useMemo((): GraphQLSubscriptionConfig<AccountSettingsSubscription> => ({
    subscription: subscription,
    variables: {},
    updater: (store) => {
      const newRecord = store.getRootField('accountSettingsUpdated');
      store.getRoot().setLinkedRecord(newRecord, 'accountSettings');
    },
  }), []);

  useSubscription(subscriptionConfig);

  const [state, setState] = useState(accountSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setState(accountSettings);
    setHasChanges(false);
  }, [accountSettings]);

  useEffect(() => {
    if (hasChanges) {
      updateSettings({
        variables: { settings: state },
        updater: (store) => {
          const newRecord = store.getRootField('updateAccountSettings');
          store.getRoot().setLinkedRecord(newRecord, 'accountSettings');
        },
      });
    }
  }, [hasChanges, state, updateSettings]);

  const onCoolDownChange = (updatedCoolDown: CoolDownModel): void => {
    setState((prevState) => ({
      ...prevState,
      tasksCoolDown: updatedCoolDown,
    }));
    setHasChanges(true);
  };

  const onReset = () => {
    resetSettings({
      variables: {},
      updater: (store) => {
        const newRecord = store.getRootField('resetAccountSettings');
        store.getRoot().setLinkedRecord(newRecord, 'accountSettings');
      },
    });
  };

  const onUpdate = (stateUpdate: Partial<typeof state>) => {
    setState((prevState) => ({
      ...prevState,
      ...stateUpdate,
    }));
    setHasChanges(true);
  };

  const onCheckboxChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { checked, name } = e.currentTarget;

    onUpdate({ [name]: checked });
  };

  const {
    allowTasks,
    autoBuild,
    autoParty,
    autoUnits,
    autoAcademy,
    autoSmithy,
    tasksCoolDown,
    useHeroResources,
  } = state;

  return (
    <FormGroup>
      <div>
        <h1 className={classes.header}>
          Account settings
        </h1>
        <Button
          className={classes.resetAction}
          color="secondary"
          onClick={onReset}
          type="button"
          variant="outlined"
        >
          Reset to default
        </Button>
      </div>
      <div>
        <h2>Tasks</h2>
        <FormControlLabel
          label="Allow tasks"
          control={(
            <Checkbox
              checked={allowTasks}
              name="allowTasks"
              onChange={onCheckboxChange}
            />
          )}
        />
        <div>
          <h4>
            Cooldown
          </h4>
          <CoolDown
            onChange={onCoolDownChange}
            value={tasksCoolDown}
          />
        </div>
        <FormControlLabel
          label="Auto Build"
          control={(
            <Checkbox
              checked={autoBuild.allow}
              name="autoUnits"
              onChange={e => {
                onUpdate({
                  autoBuild: {
                    ...state.autoBuild,
                    allow: e.currentTarget.checked,
                  },
                });
              }}
            />
          )}
        />
        <FormControlLabel
          label="Use video feature"
          control={(
            <Checkbox
              checked={autoBuild.videoFeature.allow}
              name="autoUnits"
              onChange={e => {
                onUpdate({
                  autoBuild: {
                    ...state.autoBuild,
                    videoFeature: {
                      ...state.autoBuild.videoFeature,
                      allow: e.currentTarget.checked,
                    },
                  },
                });
              }}
            />
          )}
        />
        <div>
          <h4>
           Min build time for video
          </h4>
          <Duration
            onChange={minBuildTime => {
              onUpdate({
                autoBuild: {
                  ...state.autoBuild,
                  videoFeature: {
                    ...state.autoBuild.videoFeature,
                    minBuildTime,
                  },
                },
              });
            }}
            value={autoBuild.videoFeature.minBuildTime}
          />
        </div>
        <FormControlLabel
          label="Use hero resources"
          control={(
            <Checkbox
              checked={useHeroResources}
              name="useHeroResources"
              onChange={onCheckboxChange}
            />
          )}
        />
        <FormControlLabel
          label="Auto Units"
          control={(
            <Checkbox
              checked={autoUnits}
              name="autoUnits"
              onChange={onCheckboxChange}
            />
          )}
        />
        <FormControlLabel
          label="Auto Party"
          control={(
            <Checkbox
              checked={autoParty}
              name="autoParty"
              onChange={onCheckboxChange}
            />
          )}
        />
        <FormControlLabel
          label="Auto Academy"
          control={(
            <Checkbox
              checked={autoAcademy}
              name="autoAcademy"
              onChange={onCheckboxChange}
            />
          )}
        />
        <FormControlLabel
          label="Auto Smithy"
          control={(
            <Checkbox
              checked={autoSmithy}
              name="autoSmithy"
              onChange={onCheckboxChange}
            />
          )}
        />
      </div>
    </FormGroup>
  );
};

AccountSettings.displayName = 'AccountSettings';