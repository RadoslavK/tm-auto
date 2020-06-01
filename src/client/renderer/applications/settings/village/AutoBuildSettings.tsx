import { Button } from '@material-ui/core';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  AutoBuildSettings as AutoBuildSettingsModel,
  CoolDown as CoolDownModel,
  UpdateAutoBuildSettingsInput,
  useGetAutoBuildSettingsQuery,
  useResetAutoBuildSettingsMutation,
  useUpdateAutoBuildSettingsMutation,
} from '../../../_graphql/graphqlHooks';
import { CoolDown } from '../../../_shared/components/controls/CoolDown';
import { createOnNumberChanged } from '../../../utils/createOnNumberChanged';
import { useVillageSettingsContext } from './context/villageSettingsContext';

const useAutoBuildSettings = () => {
  const { villageId } = useVillageSettingsContext();

  const [settings, setSettings] = useState<AutoBuildSettingsModel>();

  const queryResult = useGetAutoBuildSettingsQuery({ variables: { villageId } });

  useEffect(() => {
    if (!queryResult.loading && queryResult.data) {
      setSettings(queryResult.data.autoBuildSettings);
    }
  }, [queryResult]);

  const [updateSettings, updateResult] = useUpdateAutoBuildSettingsMutation();

  useEffect(() => {
    if (!updateResult.loading && updateResult.data) {
      setSettings(updateResult.data.updateAutoBuildSettings);
    }
  }, [updateResult]);

  const [resetSettings, resetResult] = useResetAutoBuildSettingsMutation();

  useEffect(() => {
    if (!resetResult.loading && resetResult.data) {
      setSettings(resetResult.data.resetAutoBuildSettings);
    }
  }, [resetResult]);

  return {
    settings,
    updateSettings,
    resetSettings,
  };
};

type Settings = Omit<AutoBuildSettingsModel, 'autoStorage'> & {
  readonly allowAutoGranary: boolean;
  readonly allowAutoWarehouse: boolean;
  readonly allowFreeSpots: boolean;
  readonly autoGranaryOverflowLevel: number;
  readonly autoWarehouseOverflowLevel: number;
};

const getStateFromSettings = (settings: AutoBuildSettingsModel): Settings => {
  const {
    autoStorage: {
      allowFreeSpots,
      granary: {
        allow: allowAutoGranary,
        overflowLevel: autoGranaryOverflowLevel,
      },
      warehouse: {
        allow: allowAutoWarehouse,
        overflowLevel: autoWarehouseOverflowLevel,
      },
    },
    ...otherSettings
  } = settings;

  return {
    ...otherSettings,
    allowAutoGranary,
    allowAutoWarehouse,
    allowFreeSpots,
    autoGranaryOverflowLevel,
    autoWarehouseOverflowLevel,
  };
};

// TODO: refactor this lol
const getSettingsFromState = (state: Settings): UpdateAutoBuildSettingsInput => {
  const {
    allowAutoGranary,
    allowAutoWarehouse,
    allowFreeSpots,
    autoGranaryOverflowLevel,
    autoWarehouseOverflowLevel,
    ...otherState
  } = state;

  return {
    ...otherState,
    autoStorage: {
      allowFreeSpots,
      granary: {
        allow: allowAutoGranary,
        overflowLevel: autoGranaryOverflowLevel,
      },
      warehouse: {
        allow: allowAutoWarehouse,
        overflowLevel: autoWarehouseOverflowLevel,
      },
    },
  };
};

export const AutoBuildSettings: React.FC = () => {
  const { villageId } = useVillageSettingsContext();

  const [state, setState] = useState<Settings>();
  const [hasChanges, setHasChanges] = useState(false);

  const {
    resetSettings,
    settings,
    updateSettings,
  } = useAutoBuildSettings();

  useEffect(() => {
    if (settings) {
      setState(getStateFromSettings(settings));
      setHasChanges(false);
    }
  }, [settings]);

  useEffect(() => {
    if (state && hasChanges) {
      updateSettings({ variables: { villageId, settings: getSettingsFromState(state) } });
    }
  }, [state, hasChanges, updateSettings, villageId]);

  const onCoolDownChange = useCallback((updatedCoolDown: CoolDownModel): void => {
    setState(prevState => prevState && ({
      ...prevState,
      coolDown: updatedCoolDown,
    }));
    setHasChanges(true);
  }, []);

  if (!state) {
    return null;
  }

  const onReset = () => {
    resetSettings({ variables: { villageId } });
  };

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

  const {
    allow,
    allowAutoGranary,
    allowAutoWarehouse,
    allowFreeSpots,
    autoCropFields,
    autoGranaryOverflowLevel,
    autoWarehouseOverflowLevel,
    coolDown,
    minCrop,
  } = state;

  const updateState = <TValue extends unknown>(name: string, value: TValue) => {
    setState(prevState => prevState && ({
      ...prevState,
      [name]: value,
    }));
    setHasChanges(true);
  };

  const onMinCropChanged = createOnNumberChanged({
    callback: updateState,
    minValue: 0,
  });

  const onOverflowLevelChanged = createOnNumberChanged({
    callback: updateState,
    maxValue: 100,
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
        <label htmlFor="autoCropFields">Auto crop fields</label>
        <input
          checked={autoCropFields}
          id="autoCropFields"
          name="autoCropFields"
          onChange={onChange}
          type="checkbox"
        />
      </div>

      <div>
        <label htmlFor="allowFreeSpots">Allow auto buildings on new spots</label>
        <input
          checked={allowFreeSpots}
          id="allowFreeSpots"
          name="allowFreeSpots"
          onChange={onChange}
          type="checkbox"
        />
      </div>

      <div>
        <label htmlFor="allowAutoWarehouse">Auto warehouse</label>
        <input
          checked={allowAutoWarehouse}
          id="allowAutoWarehouse"
          name="allowAutoWarehouse"
          onChange={onChange}
          type="checkbox"
        />

        <label htmlFor="autoWarehouseOverflowLevel">Overflow level</label>
        <input
          id="autoWarehouseOverflowLevel"
          name="autoWarehouseOverflowLevel"
          onChange={onOverflowLevelChanged}
          type="number"
          value={autoWarehouseOverflowLevel}
        />
      </div>

      <div>
        <label htmlFor="allowAutoGranary">Auto granary</label>
        <input
          checked={allowAutoGranary}
          id="allowAutoGranary"
          name="allowAutoGranary"
          onChange={onChange}
          type="checkbox"
        />

        <label htmlFor="autoGranaryOverflowLevel">Overflow level</label>
        <input
          id="autoGranaryOverflowLevel"
          name="autoGranaryOverflowLevel"
          onChange={onOverflowLevelChanged}
          type="number"
          value={autoGranaryOverflowLevel}
        />
      </div>

      <div>
        <label htmlFor="minCrop">Min crop</label>
        <input
          id="minCrop"
          name="minCrop"
          onChange={onMinCropChanged}
          type="number"
          value={minCrop}
        />
      </div>
    </div>
  );
};
