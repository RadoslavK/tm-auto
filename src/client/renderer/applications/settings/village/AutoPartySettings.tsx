import { Button } from '@material-ui/core';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

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

  const { data: queryData, loading: queryLoading } = useGetAutoPartySettingsQuery({ variables: { villageId } });

  useEffect(() => {
    if (!queryLoading && queryData) {
      setSettings(queryData.autoPartySettings);
    }
  }, [queryData, queryLoading]);

  const [updateSettings, { data: updateData, loading: updateLoading }] = useUpdateAutoPartySettingsMutation();

  useEffect(() => {
    if (!updateLoading && updateData) {
      setSettings(updateData.updateAutoPartySettings);
    }
  }, [updateData, updateLoading]);

  const [resetSettings, { data: resetData, loading: resetLoading }] = useResetAutoPartySettingsMutation();

  useEffect(() => {
    if (!resetLoading && resetData) {
      setSettings(resetData.resetAutoPartySettings);
    }
  }, [resetData, resetLoading]);

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

  useEffect(() => {
    if (state && hasChanges) {
      updateSettings({ variables: { villageId, settings: state } });
    }
  }, [hasChanges, state, updateSettings, villageId]);

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
