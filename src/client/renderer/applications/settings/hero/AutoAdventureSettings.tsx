import { useMutation } from '@apollo/react-hooks';
import { Button } from '@material-ui/core';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  ResetSettings,
  UpdateAutoAdventureSettings,
} from '*/graphql_operations/settings.graphql';

import { CoolDown } from '../../../_shared/components/controls/CoolDown';
import { Duration } from '../../../_shared/components/controls/Duration';
import { NextTaskExecution } from '../../../_shared/components/nextTaskExecution/NextTaskExecution';
import {
  AdventureCriteria,
  IAutoAdventureSettings,
  ICoolDown,
  IDuration,
  IResetSettingsMutation,
  IResetSettingsMutationVariables,
  IUpdateAutoAdventureSettingsInput,
  IUpdateAutoAdventureSettingsMutation,
  IUpdateAutoAdventureSettingsMutationVariables,
  SettingsType,
  TaskType,
} from '../../../_types/graphql';
import { getAllEnumValues } from '../../../../../_shared/enumUtils';
import { useVillages } from '../../../hooks/villages/useVillages';

interface IProps {
  readonly settings: IAutoAdventureSettings;
}

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

export const AutoAdventureSettings: React.FC<IProps> = (props) => {
  const {
    settings,
  } = props;

  const [state, setState] = useState(settings);
  const input: IUpdateAutoAdventureSettingsInput = {
    ...state,
  };

  const [updateSettings] = useMutation<IUpdateAutoAdventureSettingsMutation, IUpdateAutoAdventureSettingsMutationVariables>(UpdateAutoAdventureSettings, {
    variables: { settings: input },
  });

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setState(settings);
    }
  }, [settings]);

  useEffect(() => {
    if (state !== settings) {
      updateSettings();
    }
  }, [settings, state, updateSettings]);

  const villages = useVillages();

  const onMaxTravelTimeChange = useCallback((newMaxTravelTime: IDuration) => setState(prevState => ({ ...prevState, maxTravelTime: newMaxTravelTime })), []);

  const [resetSettings] = useMutation<IResetSettingsMutation, IResetSettingsMutationVariables>(
    ResetSettings,
    { variables: { type: SettingsType.AutoAdventure } },
  );

  const onCooldownChange = useCallback((updatedCooldown: ICoolDown): void => {
    setState(prevState => ({
      ...prevState,
      coolDown: updatedCooldown,
    }));
  }, []);

  if (!villages) {
    return null;
  }

  const onBoolChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const {
      checked,
      name,
    } = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const onNumberChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    const {
      name,
      value,
    } = e.currentTarget;

    if (+value < 0) {
      return;
    }

    setState(prevState => ({
      ...prevState,
      [name]: +value,
    }));
  };

  const onAdventureCriteriaChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    const {
      name,
      value,
    } = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onNumberOptionChange = (e: React.FocusEvent<HTMLSelectElement>): void => {
    const {
      name,
      value,
    } = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      [name]: +value,
    }));
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
        onClick={() => resetSettings()}
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
