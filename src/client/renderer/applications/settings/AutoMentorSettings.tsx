import { Button } from '@material-ui/core';
import React, {
  useEffect,
  useState,
} from 'react';

import {
  GetAutoMentorSettingsQuery,
  UpdateAutoMentorSettingsInput,
  useGetAutoMentorSettingsQuery,
  useResetAutoMentorSettingsMutation,
  useUpdateAutoMentorSettingsMutation,
} from '../../_graphql/graphqlHooks';

const useAutoMentorSettings = () => {
  const [settings, setSettings] = useState<GetAutoMentorSettingsQuery['autoMentorSettings']>();

  const { data: queryData, loading: queryLoading } = useGetAutoMentorSettingsQuery();

  useEffect(() => {
    if (!queryLoading && queryData) {
      setSettings(queryData.autoMentorSettings);
    }
  }, [queryData, queryLoading]);

  const [updateSettings, { data: updateData, loading: updateLoading }] = useUpdateAutoMentorSettingsMutation();

  useEffect(() => {
    if (!updateLoading && updateData) {
      setSettings(updateData.updateAutoMentorSettings);
    }
  }, [updateData, updateLoading]);

  const [resetSettings, { data: resetData, loading: resetLoading }] = useResetAutoMentorSettingsMutation();

  useEffect(() => {
    if (!resetLoading && resetData) {
      setSettings(resetData.resetAutoMentorSettings);
    }
  }, [resetData, resetLoading]);

  return {
    settings,
    updateSettings,
    resetSettings,
  };
};

export const AutoMentorSettings: React.FC = () => {
  const [state, setState] = useState<UpdateAutoMentorSettingsInput>();
  const [hasChanges, setHasChanges] = useState(false);

  const {
    resetSettings,
    settings,
    updateSettings,
  } = useAutoMentorSettings();

  useEffect(() => {
    if (settings) {
      setState(settings);
    }
  }, [settings]);

  useEffect(() => {
    if (state && hasChanges) {
      updateSettings({ variables: { settings: state } });
    }
  }, [state, hasChanges, updateSettings]);

  if (!state) {
    return null;
  }

  const onChange = async (e: React.FormEvent<HTMLInputElement>): Promise<void> => {
    const {
      checked,
      name,
    } = e.currentTarget;

    setState(prevState => prevState && ({
      ...prevState,
      [name]: checked,
    }));
    setHasChanges(true);
  };

  const onReset = () => {
    resetSettings();
  };

  return (
    <div>
      <h1>General settings</h1>
      <div>
        <Button
          color="primary"
          onClick={onReset}
          type="button"
          variant="contained"
        >
          Reset to default
        </Button>
      </div>
      <div>
        <div>
          <label htmlFor="acceptRewards">Accept rewards</label>
          <input
            checked={state.acceptRewards}
            id="acceptRewards"
            name="acceptRewards"
            onChange={onChange}
            type="checkbox"
          />
        </div>
        <div>
          <label htmlFor="completeTasks">Complete tasks</label>
          <input
            checked={state.completeTasks}
            id="completeTasks"
            name="completeTasks"
            onChange={onChange}
            type="checkbox"
          />
        </div>
      </div>
    </div>
  );
};