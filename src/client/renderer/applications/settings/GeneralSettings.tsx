import { Button } from '@material-ui/core';
import React, {
  useEffect,
  useState,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';

import {
  GeneralSettings as GeneralSettingsModel,
  UpdateGeneralSettingsInput,
  useGetGeneralSettingsQuery,
  useResetGeneralSettingsMutation,
  useUpdateGeneralSettingsMutation,
} from '../../_graphql/graphqlHooks';

const useGeneralSettings = () => {
  const [settings, setSettings] = useState<GeneralSettingsModel>();

  const queryResult = useGetGeneralSettingsQuery();

  useEffect(() => {
    if (!queryResult.loading && queryResult.data) {
      setSettings(queryResult.data.generalSettings);
    }
  }, [queryResult]);

  const [updateSettings, updateResult] = useUpdateGeneralSettingsMutation();

  useEffect(() => {
    if (!updateResult.loading && updateResult.data) {
      setSettings(updateResult.data.updateGeneralSettings);
    }
  }, [updateResult]);

  const [resetSettings, resetResult] = useResetGeneralSettingsMutation();

  useEffect(() => {
    if (!resetResult.loading && resetResult.data) {
      setSettings(resetResult.data.resetGeneralSettings);
    }
  }, [resetResult]);

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

  const [debounceUpdate] = useDebouncedCallback((updatedSettings: UpdateGeneralSettingsInput) => {
    updateSettings({ variables: { settings: updatedSettings } });
  }, 1000);

  useEffect(() => {
    if (state && hasChanges) {
      debounceUpdate(state);
    }
  }, [hasChanges, state, debounceUpdate]);

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
