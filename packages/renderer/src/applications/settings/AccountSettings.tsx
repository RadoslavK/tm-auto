import { Button } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  useLazyLoadQuery,
  useMutation,
  useSubscription,
} from 'react-relay/hooks';
import type { GraphQLSubscriptionConfig } from 'relay-runtime';

import type { AccountSettingsQuery } from '../../_graphql/__generated__/AccountSettingsQuery.graphql.js';
import type { AccountSettingsResetSettingsMutation } from '../../_graphql/__generated__/AccountSettingsResetSettingsMutation.graphql.js';
import type { AccountSettingsSubscription } from '../../_graphql/__generated__/AccountSettingsSubscription.graphql.js';
import type { AccountSettingsUpdateSettingsMutation } from '../../_graphql/__generated__/AccountSettingsUpdateSettingsMutation.graphql.js';
import { CoolDown } from '../../_shared/components/controls/CoolDown.js';
import type { CoolDown as CoolDownModel } from '../../models/coolDown.type.js';

const accountSettingsQuery = graphql`
  query AccountSettingsQuery {
      accountSettings {
          allowTasks
          autoBuild
          autoParty
          autoStart
          autoUnits
          tasksCoolDown {
              ...CoolDown @relay(mask: false)
          }
      }
  }
`;

const accountSettingsUpdateSettingsMutation = graphql`
  mutation AccountSettingsUpdateSettingsMutation($settings: UpdateAccountSettingsInput!) {
      updateAccountSettings(settings: $settings) {
          ...AccountSettings
      }
  }
`;

const accountSettingsResetSettingsMutation = graphql`
    mutation AccountSettingsResetSettingsMutation {
        resetAccountSettings {
            ...AccountSettings
        }
    }
`;

const subscription = graphql`
  subscription AccountSettingsSubscription {
      accountSettingsUpdated {
          ...AccountSettings
      }
  }
`;

export const AccountSettings: React.FC = () => {
  const { accountSettings } = useLazyLoadQuery<AccountSettingsQuery>(accountSettingsQuery, {});
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
    if (accountSettings) {
      setState(accountSettings);
      setHasChanges(false);
    }
  }, [accountSettings]);

  useEffect(() => {
    if (state && hasChanges) {
      updateSettings({
        variables: { settings: state },
        updater: (store) => {
          const newRecord = store.getRootField('updateAccountSettings');
          store.getRoot().setLinkedRecord(newRecord, 'accountSettings');
        },
      });
    }
  }, [hasChanges, state, updateSettings]);

  const onCoolDownChange = useCallback(
    (updatedCoolDown: CoolDownModel): void => {
      setState(
        (prevState) =>
          prevState && {
            ...prevState,
            tasksCoolDown: updatedCoolDown,
          },
      );
      setHasChanges(true);
    },
    [],
  );

  if (!state) {
    return null;
  }

  const onReset = () => {
    resetSettings({
      variables: {},
      updater: (store) => {
        const newRecord = store.getRootField('resetAccountSettings');
        store.getRoot().setLinkedRecord(newRecord, 'accountSettings');
      },
    });
  };

  const onCheckboxChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { checked, name } = e.currentTarget;

    setState(
      (prevState) =>
        prevState && {
          ...prevState,
          [name]: checked,
        },
    );
    setHasChanges(true);
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
            checked={autoBuild}
            id="autoBuild"
            name="autoBuild"
            onChange={onCheckboxChange}
            type="checkbox"
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
