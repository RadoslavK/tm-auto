import { Button } from '@material-ui/core';
import React, {
  useEffect,
  useState,
} from 'react';

import {
  GeneralVillageSettings as GeneralVillageSettingsModel,
  UpdateGeneralVillageSettingsInput,
  useGetGeneralVillageSettingsQuery,
  useResetGeneralVillageSettingsMutation,
  useUpdateGeneralVillageSettingsMutation,
} from '../../../_graphql/graphqlHooks';
import { useVillageSettingsContext } from './context/villageSettingsContext';

const useGeneralVillageSettings = () => {
  const { villageId } = useVillageSettingsContext();

  const [settings, setSettings] = useState<GeneralVillageSettingsModel>();

  const queryResult = useGetGeneralVillageSettingsQuery({ variables: { villageId } });

  useEffect(() => {
    if (!queryResult.loading && queryResult.data) {
      setSettings(queryResult.data.generalVillageSettings);
    }
  }, [queryResult]);

  const [updateSettings, updateSettingsResults] = useUpdateGeneralVillageSettingsMutation();

  useEffect(() => {
    if (!updateSettingsResults.loading && updateSettingsResults.data) {
      setSettings(updateSettingsResults.data.updateGeneralVillageSettings);
    }
  }, [updateSettingsResults]);

  const [resetSettings, resetSettingsResult] = useResetGeneralVillageSettingsMutation();

  useEffect(() => {
    if (!resetSettingsResult.loading && resetSettingsResult.data) {
      setSettings(resetSettingsResult.data.resetGeneralVillageSettings);
    }
  }, [resetSettingsResult]);

  return {
    settings,
    updateSettings,
    resetSettings,
  };
};

export const GeneralVillageSettings: React.FC = () => {
  const {
    resetSettings,
    settings,
    updateSettings,
  } = useGeneralVillageSettings();

  const { villageId } = useVillageSettingsContext();

  const [state, setState] = useState<UpdateGeneralVillageSettingsInput>();
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (settings) {
      setState({
        allowTasks: settings.allowTasks,
      });
      setHasChanges(false);
    }
  }, [settings]);

  useEffect(() => {
    if (state && hasChanges) {
      updateSettings({ variables: { villageId, settings: state } });
    }
  }, [hasChanges, state, updateSettings, villageId]);

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
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

  if (!state) {
    return null;
  }

  const onReset = () => {
    resetSettings({ variables: { villageId } });
  };

  const {
    allowTasks,
  } = state;

  return (
    <div>
      <Button
        color="primary"
        onClick={onReset}
        type="button"
        variant="contained"
      >
        Reset to default
      </Button>

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
    </div>
  );
};
