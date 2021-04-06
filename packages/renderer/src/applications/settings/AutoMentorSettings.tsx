import { Button } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
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

import type { AutoMentorSettingsQuery } from '../../_graphql/__generated__/AutoMentorSettingsQuery.graphql.js';
import type { AutoMentorSettingsResetSettingsMutation } from '../../_graphql/__generated__/AutoMentorSettingsResetSettingsMutation.graphql.js';
import type { AutoMentorSettingsSubscription } from '../../_graphql/__generated__/AutoMentorSettingsSubscription.graphql.js';
import type { AutoMentorSettingsUpdateSettingsMutation } from '../../_graphql/__generated__/AutoMentorSettingsUpdateSettingsMutation.graphql.js';

graphql`
    fragment AutoMentorSettings_autoMentorSettings on AutoMentorSettings {
        acceptDailyRewards
        acceptTaskRewards
    }
`;

const autoMentorSettingsQuery = graphql`
  query AutoMentorSettingsQuery {
      autoMentorSettings {
          ...AutoMentorSettings_autoMentorSettings @relay(mask: false)
      }
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

export const AutoMentorSettings: React.FC = () => {
  const { autoMentorSettings } = useLazyLoadQuery<AutoMentorSettingsQuery>(autoMentorSettingsQuery, {}, { fetchPolicy: 'store-and-network' });
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
    if (autoMentorSettings) {
      setState(autoMentorSettings);
    }
  }, [autoMentorSettings]);

  useEffect(() => {
    if (state && hasChanges) {
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

  const onCheckBoxChange = async (
    e: React.FormEvent<HTMLInputElement>,
  ): Promise<void> => {
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
      <h1>Mentor settings</h1>
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
          <label htmlFor="acceptTaskRewards">Accept task rewards</label>
          <input
            checked={state.acceptTaskRewards}
            id="acceptTaskRewards"
            name="acceptTaskRewards"
            onChange={onCheckBoxChange}
            type="checkbox"
          />
        </div>
        <div>
          <label htmlFor="acceptDailyRewards">Accept daily rewards</label>
          <input
            checked={state.acceptDailyRewards}
            id="acceptDailyRewards"
            name="acceptDailyRewards"
            onChange={onCheckBoxChange}
            type="checkbox"
          />
        </div>
      </div>
    </div>
  );
};

AutoMentorSettings.displayName = 'AutoMentorSettings';