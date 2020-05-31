import { Button } from '@material-ui/core';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDebouncedCallback } from 'use-debounce';

import {
  AutoPartySettings as AutoPartySettingsModel,
  CoolDown as CoolDownModel,
  PartyType,
  UpdateAutoPartySettingsInput,
  useGetAutoPartySettingsQuery,
  useResetAutoPartySettingsMutation,
  useUpdateAutoPartySettingsMutation,
} from '../../../_graphql/graphqlHooks';
import { CoolDown } from '../../../_shared/components/controls/CoolDown';
import { getAllEnumValues } from '../../../../../_shared/enumUtils';
import { createOnNumberChanged } from '../../../utils/createOnNumberChanged';
import { useVillageSettingsContext } from './context/villageSettingsContext';

const useAutoPartySettings = () => {
  const { villageId } = useVillageSettingsContext();

  const [settings, setSettings] = useState<AutoPartySettingsModel>();

  const queryResult = useGetAutoPartySettingsQuery({ variables: { villageId } });

  useEffect(() => {
    if (!queryResult.loading && queryResult.data) {
      setSettings(queryResult.data.autoPartySettings);
    }
  }, [queryResult]);

  const [updateSettings, updateResult] = useUpdateAutoPartySettingsMutation();

  useEffect(() => {
    if (!updateResult.loading && updateResult.data) {
      setSettings(updateResult.data.updateAutoPartySettings);
    }
  }, [updateResult]);

  const [resetSettings, resetResult] = useResetAutoPartySettingsMutation();

  useEffect(() => {
    if (!resetResult.loading && resetResult.data) {
      setSettings(resetResult.data.resetAutoPartySettings);
    }
  }, [resetResult]);

  return {
    settings,
    updateSettings,
    resetSettings,
  };
};

export const AutoPartySettings: React.FC = () => {
  const { villageId } = useVillageSettingsContext();

  const [state, setState] = useState<UpdateAutoPartySettingsInput>();
  const [hasChanges, setHasChanges] = useState(false);

  const {
    resetSettings,
    settings,
    updateSettings,
  } = useAutoPartySettings();

  useEffect(() => {
    if (settings) {
      setState(settings);
      setHasChanges(false);
    }
  }, [settings]);

  const [debounceUpdate] = useDebouncedCallback((updatedSettings: UpdateAutoPartySettingsInput) => {
    updateSettings({ variables: { villageId, settings: updatedSettings } });
  }, 1000);

  useEffect(() => {
    if (state && hasChanges) {
      debounceUpdate(state);
    }
  }, [hasChanges, state, debounceUpdate]);

  const onCoolDownChange = useCallback((updatedCooldown: CoolDownModel): void => {
    setState(prevState => prevState && ({
      ...prevState,
      coolDown: updatedCooldown,
    }));
    setHasChanges(true);
  }, []);

  if (!state) {
    return null;
  }

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

  const onPartyTypeChange = (e: React.FormEvent<HTMLSelectElement>): void => {
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

  const {
    allow,
    coolDown,
    minCulturePoints,
    partyType,
  } = state;

  const allPartyTypes = getAllEnumValues(PartyType);

  return (
    <div>
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
        <label htmlFor="minCulturePoints">Min culture points</label>
        <input
          id="minCulturePoints"
          name="minCulturePoints"
          onChange={onNumberChange}
          type="number"
          value={minCulturePoints}
        />
      </div>

      <div>
        <label htmlFor="partyType">Min culture points</label>
        <select
          id="partyType"
          name="partyType"
          onChange={onPartyTypeChange}
          value={partyType}
        >
          {allPartyTypes.map(pType => (
            <option
              key={pType}
              value={pType}
            >
              {pType}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
