import { Button } from '@material-ui/core';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';

import {
  AutoUnitsSettings as AutoUnitsSettingsModel,
  CoolDown as CoolDownModel,
  UpdateAutoUnitsSettingsInput,
  useGetAutoUnitsSettingsQuery,
  useResetAutoUnitsSettingsMutation,
  useUpdateAutoUnitsSettingsMutation,
} from '../../../_graphql/graphqlHooks';
import { CoolDown } from '../../../_shared/components/controls/CoolDown';
import { createOnNumberChanged } from '../../../utils/createOnNumberChanged';
import { useVillageSettingsContext } from './context/villageSettingsContext';

const useAutoUnitsSettings = () => {
  const { villageId } = useVillageSettingsContext();
  const [settings, setSettings] = useState<AutoUnitsSettingsModel>();

  const queryResult = useGetAutoUnitsSettingsQuery({ variables: { villageId } });

  useEffect(() => {
    if (!queryResult.loading && queryResult.data) {
      setSettings(queryResult.data.autoUnitsSettings);
    }
  }, [queryResult]);

  const [updateSettings, updateResult] = useUpdateAutoUnitsSettingsMutation();

  useEffect(() => {
    if (!updateResult.loading && updateResult.data) {
      setSettings(updateResult.data.updateAutoUnitsSettings);
    }
  }, [updateResult]);

  const [resetSettings, resetSettingsResult] = useResetAutoUnitsSettingsMutation();

  useEffect(() => {
    if (!resetSettingsResult.loading && resetSettingsResult.data) {
      setSettings(resetSettingsResult.data.resetAutoUnitsSettings);
    }
  }, [resetSettingsResult]);

  return {
    settings,
    updateSettings,
    resetSettings,
  };
};

export const AutoUnitsSettings: React.FC = () => {
  const { villageId } = useVillageSettingsContext();

  const [state, setState] = useState<UpdateAutoUnitsSettingsInput>();
  const [hasChanges, setHasChanges] = useState(false);

  const {
    resetSettings,
    settings,
    updateSettings,
  } = useAutoUnitsSettings();

  useEffect(() => {
    if (settings) {
      setState({
        allow: settings.allow,
        coolDown: settings.coolDown,
        minCrop: settings.minCrop,
      });
      setHasChanges(false);
    }
  }, [settings]);

  const [debounceUpdate] = useDebouncedCallback((updatedSettings: UpdateAutoUnitsSettingsInput) => {
    updateSettings({ variables: { villageId, settings: updatedSettings } });
  }, 1000);

  useEffect(() => {
    if (state && hasChanges) {
      debounceUpdate(state);
    }
  }, [state, hasChanges, debounceUpdate]);

  const onCoolDownChange = useCallback((coolDown: CoolDownModel): void => {
    setState(prevState => prevState && ({
      ...prevState,
      coolDown,
    }));
    setHasChanges(true);
  }, []);

  if (!state) {
    return null;
  }

  const onReset = () => {
    resetSettings({ variables: { villageId } });
  };

  const {
    allow,
    coolDown,
    minCrop,
  } = state;

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

  const onNumberChange = createOnNumberChanged({
    callback: (name, value) => {
      setState(prevState => prevState && ({
        ...prevState,
        [name]: +value,
      }));
      setHasChanges(true);
    },
    minValue: 0,
  });

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
        <label htmlFor="allow">Allow</label>
        <input
          checked={allow}
          id="allow"
          name="allow"
          onChange={onChange}
          type="checkbox"
        />
      </div>

      <div>
        <label>Cooldown</label>
        <CoolDown
          onChange={onCoolDownChange}
          value={coolDown}
        />
      </div>

      <div>
        <label htmlFor="minCrop">Min crop</label>
        <input
          id="minCrop"
          name="minCrop"
          onChange={onNumberChange}
          type="number"
          value={minCrop}
        />
      </div>
    </div>
  );
};
