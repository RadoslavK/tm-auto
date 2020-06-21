import { Button } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';

import { getAllEnumValues } from '../../../../../_shared/enumUtils';
import { updateQueryCache } from '../../../../../server/utils/graphql';
import {
  AdventureCriteria,
  CoolDown as CoolDownModel,
  Duration as DurationModel,
  GetAutoAdventureSettingsDocument,
  GetAutoAdventureSettingsQuery,
  GetAutoAdventureSettingsQueryVariables,
  TaskType,
  UpdateAutoAdventureSettingsInput,
  useGetAutoAdventureSettingsQuery,
  useResetAutoAdventureSettingsMutation,
  useUpdateAutoAdventureSettingsMutation,
} from '../../../_graphql/graphqlHooks';
import { CoolDown } from '../../../_shared/components/controls/CoolDown';
import { Duration } from '../../../_shared/components/controls/Duration';
import { NextTaskExecution } from '../../../_shared/components/nextTaskExecution/NextTaskExecution';
import { useVillages } from '../../../hooks/villages/useVillages';

const useAutoAdventureSettings = () => {
  const {
    data: queryData,
    loading: queryLoading,
  } = useGetAutoAdventureSettingsQuery();

  const [updateSettings] = useUpdateAutoAdventureSettingsMutation({
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      updateQueryCache<
        GetAutoAdventureSettingsQuery,
        GetAutoAdventureSettingsQueryVariables
      >({
        cache,
        query: GetAutoAdventureSettingsDocument,
        data: { autoAdventureSettings: data.updateAutoAdventureSettings },
      });
    },
  });

  const [resetSettings] = useResetAutoAdventureSettingsMutation({
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      updateQueryCache<
        GetAutoAdventureSettingsQuery,
        GetAutoAdventureSettingsQueryVariables
      >({
        cache,
        query: GetAutoAdventureSettingsDocument,
        data: { autoAdventureSettings: data.resetAutoAdventureSettings },
      });
    },
  });

  return {
    settings:
      queryLoading || !queryData ? null : queryData.autoAdventureSettings,
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
  }, [state, hasChanges, updateSettings]);

  const villages = useVillages();

  const onMaxTravelTimeChange = useCallback(
    (newMaxTravelTime: DurationModel) => {
      setState(
        (prevState) =>
          prevState && { ...prevState, maxTravelTime: newMaxTravelTime },
      );
      setHasChanges(true);
    },
    [],
  );

  const onCooldownChange = useCallback(
    (updatedCooldown: CoolDownModel): void => {
      setState(
        (prevState) =>
          prevState && {
            ...prevState,
            coolDown: updatedCooldown,
          },
      );
      setHasChanges(true);
    },
    [],
  );

  if (!state) {
    return null;
  }

  const onReset = () => {
    resetSettings({ variables: {} });
  };

  const onBoolChange = (e: React.FormEvent<HTMLInputElement>): void => {
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

  const onNumberChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;

    if (+value < 0) {
      return;
    }

    setState(
      (prevState) =>
        prevState && {
          ...prevState,
          [name]: +value,
        },
    );
    setHasChanges(true);
  };

  const onAdventureCriteriaChange = (
    e: React.FocusEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = e.currentTarget;

    setState(
      (prevState) =>
        prevState && {
          ...prevState,
          [name]: value,
        },
    );
    setHasChanges(true);
  };

  const onTextChanged = (e: React.FocusEvent<HTMLSelectElement>): void => {
    const { name, value } = e.currentTarget;

    setState(
      (prevState) =>
        prevState && {
          ...prevState,
          [name]: value,
        },
    );
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

  const preferredVillageExists = villages.some(
    (x) => x.id === preferredVillageId,
  );
  const options = preferredVillageExists
    ? villages.map((village) => ({ id: village.id, name: village.name }))
    : [{ id: preferredVillageId || 0, name: 'Select village' }].concat(
        villages,
      );

  const criteriaOptions = getAllEnumValues(AdventureCriteria);

  return (
    <div>
      <h2>AutoAdventure</h2>

      <NextTaskExecution task={TaskType.AutoAdventure} />

      <Button
        color="primary"
        onClick={onReset}
        type="button"
        variant="contained">
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
        <Duration onChange={onMaxTravelTimeChange} value={maxTravelTime} />
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
          {criteriaOptions.map((option) => (
            <React.Fragment key={option}>
              <input
                checked={option === adventureCriteria}
                id={option}
                name="adventureCriteria"
                onChange={onAdventureCriteriaChange}
                type="radio"
                value={option}
              />
              <label htmlFor={option}>{option}</label>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div>
        <h3>Cooldown</h3>
        <label htmlFor="maxTravelTime">Cooldown</label>
        <CoolDown onChange={onCooldownChange} value={coolDown} />
      </div>

      <div>
        <label htmlFor="preferredVillageId">Preferred village</label>
        <select
          id="preferredVillageId"
          name="preferredVillageId"
          onChange={onTextChanged}
          placeholder="Select village"
          value={preferredVillageId || undefined}>
          {options.map((option) => {
            const villageExists = villages.some((x) => x.id === option.id);
            return (
              <option key={option.id} hidden={!villageExists} value={option.id}>
                {option.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};
