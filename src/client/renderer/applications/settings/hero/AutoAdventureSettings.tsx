import { Button } from '@material-ui/core';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  AdventureCriteria,
  AutoAdventureSettings as AutoAdventureSettingsModel,
  CoolDown as CoolDownModel,
  Duration as DurationModel,
  TaskType,
  UpdateAutoAdventureSettingsInput,
  useGetAutoAdventureSettingsQuery,
  useResetAutoAdventureSettingsMutation,
  useUpdateAutoAdventureSettingsMutation,
} from '../../../_graphql/graphqlHooks';
import { CoolDown } from '../../../_shared/components/controls/CoolDown';
import { Duration } from '../../../_shared/components/controls/Duration';
import { NextTaskExecution } from '../../../_shared/components/nextTaskExecution/NextTaskExecution';
import { getAllEnumValues } from '../../../../../_shared/enumUtils';
import { useVillages } from '../../../hooks/villages/useVillages';

const getCriteriaString = (criteria: AdventureCriteria): string => {
  switch (criteria) {
    case AdventureCriteria.FirstToExpire:
      return 'First to expire';

    case AdventureCriteria.Random:
      return 'Random';

    case AdventureCriteria.Closest:
      return 'Closest';

    case AdventureCriteria.Furthest:
      return 'Furthest';

    default:
      throw new Error(`Unknown adventure criteria: ${criteria}`);
  }
};

const useAutoAdventureSettings = () => {
  const [settings, setSettings] = useState<AutoAdventureSettingsModel>();

  const queryResult = useGetAutoAdventureSettingsQuery();

  useEffect(() => {
    if (!queryResult.loading && queryResult.data) {
      setSettings(queryResult.data.autoAdventureSettings);
    }
  }, [queryResult]);

  const [updateSettings, updateResult] = useUpdateAutoAdventureSettingsMutation();

  useEffect(() => {
    if (!updateResult.loading && updateResult.data) {
      setSettings(updateResult.data.updateAutoAdventureSettings);
    }
  }, [updateResult]);

  const [resetSettings, resetResult] = useResetAutoAdventureSettingsMutation();

  useEffect(() => {
    if (!resetResult.loading && resetResult.data) {
      setSettings(resetResult.data.resetAutoAdventureSettings);
    }
  }, [resetResult]);

  return {
    settings,
    updateSettings,
    resetSettings,
  };
};

export const AutoAdventureSettings: React.FC = () => {
  const [state, setState] = useState<UpdateAutoAdventureSettingsInput>();
  const [hasChanges, setHasChanges] = useState(false);

  const {
    resetSettings,
    settings,
    updateSettings,
  } = useAutoAdventureSettings();

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
  }, [state, updateSettings, hasChanges]);

  const villages = useVillages();

  const onMaxTravelTimeChange = useCallback((newMaxTravelTime: DurationModel) => {
    setState(prevState => prevState && ({ ...prevState, maxTravelTime: newMaxTravelTime }));
    setHasChanges(true);
  }, []);

  const onCooldownChange = useCallback((updatedCooldown: CoolDownModel): void => {
    setState(prevState => prevState && ({
      ...prevState,
      coolDown: updatedCooldown,
    }));
    setHasChanges(true);
  }, []);

  if (!villages || !state) {
    return null;
  }

  const onReset = () => {
    resetSettings({ variables: { } });
  };

  const onBoolChange = (e: React.FormEvent<HTMLInputElement>): void => {
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

  const onNumberChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    const {
      name,
      value,
    } = e.currentTarget;

    if (+value < 0) {
      return;
    }

    setState(prevState => prevState && ({
      ...prevState,
      [name]: +value,
    }));
    setHasChanges(true);
  };

  const onAdventureCriteriaChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    const {
      name,
      value,
    } = e.currentTarget;

    setState(prevState => prevState && ({
      ...prevState,
      [name]: value,
    }));
    setHasChanges(true);
  };

  const onNumberOptionChange = (e: React.FocusEvent<HTMLSelectElement>): void => {
    const {
      name,
      value,
    } = e.currentTarget;

    setState(prevState => prevState && ({
      ...prevState,
      [name]: +value,
    }));
    setHasChanges(true);
  };

  const {
    adventureCriteria,
    allow,
    coolDown,
    hardMinHealth,
    maxTravelTime,
    normalMinHealth,
    preferHard,
    preferredVillageId,
  } = state;

  const preferredVillageExists = villages.some(x => x.id === preferredVillageId);
  const options = preferredVillageExists
    ? villages.map(village => ({ id: village.id, name: village.name }))
    : [{ id: preferredVillageId || 0, name: 'Select village' }].concat(villages);

  const criteriaOptions = getAllEnumValues(AdventureCriteria);

  return (
    <div>
      <h2>AutoAdventure</h2>

      <NextTaskExecution task={TaskType.AutoAdventure} />

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
          onChange={onBoolChange}
          type="checkbox"
        />
      </div>

      <div>
        <label htmlFor="preferHard">Prefer hard</label>
        <input
          checked={preferHard}
          id="preferHard"
          name="preferHard"
          onChange={onBoolChange}
          type="checkbox"
        />
      </div>

      <div>
        <label htmlFor="maxTravelTime">Max travel time</label>
        <Duration
          onChange={onMaxTravelTimeChange}
          value={maxTravelTime}
        />
      </div>

      <div>
        <label htmlFor="normalMinHealth">Normal min health</label>
        <input
          id="normalMinHealth"
          name="normalMinHealth"
          onChange={onNumberChange}
          type="number"
          value={normalMinHealth}
        />
      </div>

      <div>
        <label htmlFor="hardMinHealth">Hard min health</label>
        <input
          id="hardMinHealth"
          name="hardMinHealth"
          onChange={onNumberChange}
          type="number"
          value={hardMinHealth}
        />
      </div>

      <div>
        <label htmlFor="adventureCriteria">Adventure criteria</label>
        <div id="adventureCriteria">
          {criteriaOptions.map((option, index) => (
            <React.Fragment key={index}>
              <input
                checked={option === adventureCriteria}
                id={option}
                name="adventureCriteria"
                onChange={onAdventureCriteriaChange}
                type="radio"
                value={option}
              />
              <label htmlFor={option}>{getCriteriaString(option)}</label>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div>
        <h3>Cooldown</h3>
        <label htmlFor="maxTravelTime">Cooldown</label>
        <CoolDown
          onChange={onCooldownChange}
          value={coolDown}
        />
      </div>

      <div>
        <label htmlFor="preferredVillageId">Preferred village</label>
        <select
          id="preferredVillageId"
          name="preferredVillageId"
          onChange={onNumberOptionChange}
          placeholder="Select village"
          value={preferredVillageId || undefined}
        >
          {options.map((option, index) => {
            const villageExists = villages.some(x => x.id === option.id);
            return (
              <option
                key={index}
                hidden={!villageExists}
                value={option.id}
              >
                {option.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
