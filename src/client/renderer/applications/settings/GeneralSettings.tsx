import { Button } from '@material-ui/core';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  CoolDown as CoolDownModel,
  GeneralSettings as GeneralSettingsModel,
  UpdateGeneralSettingsInput,
  useGetGeneralSettingsQuery,
  useResetGeneralSettingsMutation,
  useUpdateGeneralSettingsMutation,
} from '../../_graphql/graphqlHooks';
import { CoolDown } from '../../_shared/components/controls/CoolDown';

const useGeneralSettings = () => {
  const [settings, setSettings] = useState<GeneralSettingsModel>();

  const { data: queryData, loading: queryLoading } = useGetGeneralSettingsQuery();

  useEffect(() => {
    if (!queryLoading && queryData) {
      setSettings(queryData.generalSettings);
    }
  }, [queryData, queryLoading]);

  const [updateSettings, { data: updateData, loading: updateLoading }] = useUpdateGeneralSettingsMutation();

  useEffect(() => {
    if (!updateLoading && updateData) {
      setSettings(updateData.updateGeneralSettings);
    }
  }, [updateData, updateLoading]);

  const [resetSettings, { data: resetData, loading: resetLoading }] = useResetGeneralSettingsMutation();

  useEffect(() => {
    if (!resetLoading && resetData) {
      setSettings(resetData.resetGeneralSettings);
    }
  }, [resetData, resetLoading]);

  return {
    settings,
    updateSettings,
    resetSettings,
  };
};

export const GeneralSettings: React.FC = () => {
  const [state, setState] = useState<UpdateGeneralSettingsInput>();
  const [hasChanges, setHasChanges] = useState(false);

  const {
    resetSettings,
    settings,
    updateSettings,
  } = useGeneralSettings();

  useEffect(() => {
    if (settings) {
      setState(settings);
      setHasChanges(false);
    }
  }, [settings]);

  useEffect(() => {
    if (state && hasChanges) {
      updateSettings({ variables: { settings: state } });
    }
  }, [hasChanges, state, updateSettings]);

  const onCoolDownChange = useCallback((updatedCoolDown: CoolDownModel): void => {
    setState(prevState => prevState && ({
      ...prevState,
      tasksCoolDown: updatedCoolDown,
    }));
    setHasChanges(true);
  }, []);

  if (!state) {
    return null;
  }

  const onReset = () => {
    resetSettings();
  };

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
          <label htmlFor="autoStart">Start after sign in</label>
          <input
            checked={autoStart}
            id="autoStart"
            name="autoStart"
            onChange={onChange}
            type="checkbox"
          />
        </div>

        <div>
          <label htmlFor="allowTasks">Allow tasks</label>
          <input
            checked={allowTasks}
            id="allowTasks"
            name="allowTasks"
            onChange={onChange}
            type="checkbox"
          />
        </div>

        <div>
          <label>Cooldown</label>
          <CoolDown
            onChange={onCoolDownChange}
            value={tasksCoolDown}
          />
        </div>

        <div>
          <label htmlFor="autoBuild">Auto Build</label>
          <input
            checked={autoBuild}
            id="autoBuild"
            name="autoBuild"
            onChange={onChange}
            type="checkbox"
          />
        </div>

        <div>
          <label htmlFor="autoUnits">Auto Units</label>
          <input
            checked={autoUnits}
            id="autoUnits"
            name="autoUnits"
            onChange={onChange}
            type="checkbox"
          />
        </div>

        <div>
          <label htmlFor="autoParty">Auto Party</label>
          <input
            checked={autoParty}
            id="autoParty"
            name="autoParty"
            onChange={onChange}
            type="checkbox"
          />
        </div>
      </div>
    </div>
  );
};
