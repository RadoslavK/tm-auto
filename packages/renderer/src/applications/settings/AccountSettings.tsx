import { Button } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useMutation,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { AccountSettingsQuery } from '../../_graphql/__generated__/AccountSettingsQuery.graphql.js';
import type { AccountSettingsResetSettingsMutation } from '../../_graphql/__generated__/AccountSettingsResetSettingsMutation.graphql.js';
import type { AccountSettingsSubscription } from '../../_graphql/__generated__/AccountSettingsSubscription.graphql.js';
import type { AccountSettingsUpdateSettingsMutation } from '../../_graphql/__generated__/AccountSettingsUpdateSettingsMutation.graphql.js';
import { CoolDown } from '../../_shared/components/controls/CoolDown.js';
import { Duration } from '../../_shared/components/controls/Duration.js';
import { useLazyLoadQuery } from '../../_shared/hooks/useLazyLoadQuery.js';
import type { CoolDown as CoolDownModel } from '../../models/coolDown.type.js';

graphql`
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
        autoStart
        autoUnits
        tasksCoolDown {
            ...CoolDown @relay(mask: false)
        }
    }
`;

const accountSettingsQuery = graphql`
  query AccountSettingsQuery {
      accountSettings {
        ...AccountSettings_accountSettings @relay(mask: false)
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

export const AccountSettings: React.FC = () => {
  const { accountSettings } = useLazyLoadQuery<AccountSettingsQuery>(accountSettingsQuery, {}, { fetchPolicy: 'store-and-network' });
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
    autoStart,
    autoUnits,
    tasksCoolDown,
  } = state;

  return (
    <div>
      <h1>Account settings</h1>
      <div>
        <Button
          color="primary"
          onClick={onReset}
          type="button"
          variant="contained">
          Reset to default
        </Button>
      </div>
      <div>
        <div>
          <label htmlFor="autoStart">Start after sign in</label>
          <input
            checked={autoStart}
            id="autoStart"
            name="autoStart"
            onChange={onCheckboxChange}
            type="checkbox"
          />
        </div>

        <h2>Tasks</h2>

        <div>
          <label htmlFor="allowTasks">Allow tasks</label>
          <input
            checked={allowTasks}
            id="allowTasks"
            name="allowTasks"
            onChange={onCheckboxChange}
            type="checkbox"
          />
        </div>

        <div>
          <label>Cooldown</label>
          <CoolDown onChange={onCoolDownChange} value={tasksCoolDown} />
        </div>

        <div>
          <label htmlFor="autoBuild">Auto Build</label>
          <input
            checked={autoBuild.allow}
            id="autoBuild"
            onChange={e => {
              onUpdate({
                autoBuild: {
                  ...state.autoBuild,
                  allow: e.currentTarget.checked,
                },
              });
            }}
            type="checkbox"
          />
        </div>

        <div>
          <label htmlFor="videoFeatureAllow">Use Video feature</label>
          <input
            checked={autoBuild.videoFeature.allow}
            id="videoFeatureAllow"
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
            type="checkbox"
          />
        </div>

        <div>
          <label htmlFor="videoFeatureDuration">Min build time for video</label>
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

        <div>
          <label htmlFor="autoUnits">Auto Units</label>
          <input
            checked={autoUnits}
            id="autoUnits"
            name="autoUnits"
            onChange={onCheckboxChange}
            type="checkbox"
          />
        </div>

        <div>
          <label htmlFor="autoParty">Auto Party</label>
          <input
            checked={autoParty}
            id="autoParty"
            name="autoParty"
            onChange={onCheckboxChange}
            type="checkbox"
          />
        </div>
      </div>
    </div>
  );
};

AccountSettings.displayName = 'AccountSettings';