import { Button } from '@material-ui/core';
import React, {
  useEffect,
  useState,
} from 'react';

import {
  GetGeneralSettingsQuery,
  UpdateGeneralSettingsInput,
  useGetGeneralSettingsQuery,
  useResetGeneralSettingsMutation,
  useUpdateGeneralSettingsMutation,
} from '../../_graphql/graphqlHooks';

const useGeneralSettings = () => {
  const [settings, setSettings] = useState<GetGeneralSettingsQuery['generalSettings']>();

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

export const GeneralSettingsForm: React.FunctionComponent = () => {
  const {
    resetSettings,
    settings,
    updateSettings,
  } = useGeneralSettings();

  const [state, setState] = useState<UpdateGeneralSettingsInput>();
  const [hasChanges, setHasChanges] = useState(false);

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
  }, [state, hasChanges, updateSettings]);

  if (!state) {
    return null;
  }

  const onTextChanges = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setState(prevState => prevState && ({ ...prevState, [name]: value }));
    setHasChanges(true);
  };

  const onBoolChanges = (e: React.FormEvent<HTMLInputElement>) => {
    const { checked, name } = e.currentTarget;

    setState(prevState => prevState && ({ ...prevState, [name]: checked }));
    setHasChanges(true);
  };

  const onReset = () => {
    resetSettings();
  };

  return (
    <div>
      <h1>General Settings</h1>
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
        <label htmlFor="headlessChrome">Use headless</label>
        <input
          checked={state.headlessChrome}
          id="headlessChrome"
          name="headlessChrome"
          onChange={onBoolChanges}
          type="checkbox"
        />
      </div>

      <div>
        <label htmlFor="chromePath">Chrome path</label>
        <input
          id="chromePath"
          name="chromePath"
          onChange={onTextChanges}
          value={state.chromePath}
        />
      </div>

      <div>
        <label htmlFor="dataPath">Data path</label>
        <input
          id="dataPath"
          name="dataPath"
          onChange={onTextChanges}
          value={state.dataPath}
        />
      </div>
    </div>
  );
};