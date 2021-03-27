import { Button } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useEffect,
  useState, 
} from 'react';
import {
  useLazyLoadQuery,
  useMutation,
} from 'react-relay/hooks';

import type { AutoMentorSettingsQuery } from '../../_graphql/__generated__/AutoMentorSettingsQuery.graphql.js';
import type { AutoMentorSettingsResetSettingsMutation } from '../../_graphql/__generated__/AutoMentorSettingsResetSettingsMutation.graphql.js';
import type { AutoMentorSettingsUpdateSettingsMutation } from '../../_graphql/__generated__/AutoMentorSettingsUpdateSettingsMutation.graphql.js';

const autoMentorSettingsQuery = graphql`
  query AutoMentorSettingsQuery {
      autoMentorSettings {
          acceptDailyRewards
          acceptTaskRewards
          completeTasks {
              allow
              allowedTaskIds
              taskIds
          }
      }
  }
`;

const autoMentorSettingsUpdateSettingsMutation = graphql`
  mutation AutoMentorSettingsUpdateSettingsMutation($settings: UpdateAutoMentorSettingsInput!) {
      updateAutoMentorSettings(settings: $settings) {
          ...AutoMentorSettings
      }
  }
`;

const autoMentorSettingsResetSettingsMutation = graphql`
    mutation AutoMentorSettingsResetSettingsMutation {
        resetAutoMentorSettings {
            ...AutoMentorSettings
        }
    }
`;

export const AutoMentorSettings: React.FC = () => {
  const { autoMentorSettings } = useLazyLoadQuery<AutoMentorSettingsQuery>(autoMentorSettingsQuery, {});
  const [updateSettings] = useMutation<AutoMentorSettingsUpdateSettingsMutation>(autoMentorSettingsUpdateSettingsMutation);
  const [resetSettings] = useMutation<AutoMentorSettingsResetSettingsMutation>(autoMentorSettingsResetSettingsMutation);

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
          settings: {
            ...state,
            completeTasks: {
              ...state.completeTasks,
              allowedTaskIds: (state.completeTasks.allowedTaskIds as Array<string>),
              taskIds: (state.completeTasks.taskIds as Array<string>),
            },
          },
        },
        updater: (store) => {
          const newRecord = store.getRootField('updateAutoMentorSettings');
          store.getRoot().setLinkedRecord(newRecord, 'autoMentorSettings');
        },
      });
    }
  }, [state, hasChanges, updateSettings]);

  if (!state) {
    return null;
  }

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
      <h1>General settings</h1>
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
      <div>
        <label htmlFor="completeTasks.allow">Complete tasks</label>
        <input
          checked={state.completeTasks.allow}
          id="completeTasks.allow"
          onChange={(e) => {
            const { checked } = e.target;

            setState(
              (prevState) =>
                prevState && {
                  ...prevState,
                  completeTasks: {
                    ...prevState.completeTasks,
                    allow: checked,
                  },
                },
            );
            setHasChanges(true);
          }}
          type="checkbox"
        />
        {state.completeTasks.taskIds.map((taskId) => (
          <div key={taskId}>
            <label>{taskId}</label>
            <input
              type="checkbox"
              checked={state.completeTasks.allowedTaskIds.includes(taskId)}
              onChange={(e) => {
                const allowed = e.target.checked;
                setState(
                  (prevState) =>
                    prevState && {
                      ...prevState,
                      completeTasks: {
                        ...prevState.completeTasks,
                        allowedTaskIds: allowed
                          ? prevState.completeTasks.allowedTaskIds.concat([
                            taskId,
                          ])
                          : prevState.completeTasks.allowedTaskIds.filter(
                            (x) => x !== taskId,
                          ),
                      },
                    },
                );
                setHasChanges(true);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
