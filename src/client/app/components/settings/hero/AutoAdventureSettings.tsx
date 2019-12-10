import {
  useMutation,
  useQuery,
} from '@apollo/react-hooks';
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
import { GetVillages } from '*/graphql_operations/village.graphql';

import {
  AdventureCriteria,
  IAutoAdventureSettings,
  ICoolDown,
  IDuration,
  IGetVillagesQuery,
  IResetSettingsMutation,
  IResetSettingsMutationVariables,
  IUpdateAutoAdventureSettingsInput,
  IUpdateAutoAdventureSettingsMutation,
  IUpdateAutoAdventureSettingsMutationVariables,
  SettingsType,
} from '../../../../_types/graphql';
import { getAllEnumValues } from '../../../../../_shared/enumUtils';
import { CoolDown } from '../../controls/Cooldown';
import { Duration } from '../../controls/Duration';

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
  }, [state, updateSettings]);

  const { data, loading } = useQuery<IGetVillagesQuery>(GetVillages);

  const onMaxTravelTimeChange = useCallback((newMaxTravelTime: IDuration) => setState(prevState => ({ ...prevState, maxTravelTime: newMaxTravelTime })), []);

  const [resetSettings] = useMutation<IResetSettingsMutation, IResetSettingsMutationVariables>(ResetSettings,
    { variables: { type: SettingsType.AutoAdventure } },
  );

  const onCooldownChange = useCallback((updatedCooldown: ICoolDown): void => {
    setState(prevState => ({
      ...prevState,
      coolDown: updatedCooldown,
    }));
  }, []);

  if (loading || !data) {
    return null;
  }

  const {
    villages,
  } = data;

  const onBoolChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const {
      name,
      checked,
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
    allow,
    preferHard,
    maxTravelTime,
    normalMinHealth,
    hardMinHealth,
    coolDown,
    preferredVillageId,
    adventureCriteria,
  } = state;

  const preferredVillageExists = villages.some(x => x.id === preferredVillageId);
  const options = preferredVillageExists
    ? villages
    : [{ id: preferredVillageId || 0, name: 'Select village', isCapital: false }].concat(villages);

  const criteriaOptions = getAllEnumValues(AdventureCriteria);

  return (
    <div>
      <h2>AutoAdventure</h2>

      <Button
        onClick={() => resetSettings()}
        type="button"
        variant="contained"
        color="primary"
      >
        Reset to default
      </Button>

      <div>
        <label htmlFor="allow">Allow</label>
        <input type="checkbox" checked={allow} onChange={onBoolChange} id="allow" name="allow" />
      </div>

      <div>
        <label htmlFor="preferHard">Prefer hard</label>
        <input type="checkbox" checked={preferHard} onChange={onBoolChange} id="preferHard" name="preferHard" />
      </div>

      <div>
        <label htmlFor="maxTravelTime">Max travel time</label>
        <Duration onChange={onMaxTravelTimeChange} value={maxTravelTime}/>
      </div>

      <div>
        <label htmlFor="normalMinHealth">Normal min health</label>
        <input type="number" value={normalMinHealth} onChange={onNumberChange} id="normalMinHealth" name="normalMinHealth" />
      </div>

      <div>
        <label htmlFor="hardMinHealth">Hard min health</label>
        <input type="number" value={hardMinHealth} onChange={onNumberChange} id="hardMinHealth" name="hardMinHealth" />
      </div>

      <div>
        <label htmlFor="adventureCriteria">Adventure criteria</label>
        <div id="adventureCriteria">
          {criteriaOptions.map((option, index) => (
            <React.Fragment key={index}>
              <input id={option} type="radio" value={option} checked={option === adventureCriteria} onChange={onAdventureCriteriaChange} name="adventureCriteria" />
              <label htmlFor={option}>{getCriteriaString(option)}</label>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div>
        <h3>Cooldown</h3>
        <label htmlFor="maxTravelTime">Cooldown</label>
        <CoolDown value={coolDown} onChange={onCooldownChange} />
      </div>

      <div>
        <label htmlFor="preferredVillageId">Preferred village</label>
        <select value={preferredVillageId || undefined} onChange={onNumberOptionChange} id="preferredVillageId" name="preferredVillageId" placeholder="Select village" >
          {options.map((option, index) => {
            const villageExists = villages.some(x => x.id === option.id);
            return (
              <option
                key={index}
                value={option.id}
                hidden={!villageExists}
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
