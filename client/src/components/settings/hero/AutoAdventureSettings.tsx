import { UpdateAutoAdventureSettings} from "*/graphql_operations/settings.graphql";
import { GetVillages } from '*/graphql_operations/village.graphql';
import { useContext, useEffect, useState } from 'react';
import * as React from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import {
  IAutoAdventureSettings, ICoolDown, IGetVillagesQuery, IGetVillagesQueryVariables,
  IUpdateAutoAdventureSettingsInput,
  IUpdateAutoAdventureSettingsMutation,
  IUpdateAutoAdventureSettingsMutationVariables,
  IUpdateAutoBuildVillageSettingsInput,
} from '../../../_types/graphql';
import { CooldDown } from '../../controls/Cooldown';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';

interface IProps {
  readonly settings: IAutoAdventureSettings;
}

const AutoAdventureSettings: React.FunctionComponent<IProps> = (props) => {
  const {
    settings,
  } = props;

  const [state, setState] = useState(settings);

  const { villageId } = useContext<IVillageContext>(VillageContext);
  const input: IUpdateAutoAdventureSettingsInput = {
    settings: state,
  };

  const updateSettings = useMutation<IUpdateAutoAdventureSettingsMutation, IUpdateAutoAdventureSettingsMutationVariables>(UpdateAutoAdventureSettings, {
    variables: { input },
  });

  useEffect(() => {
    if (state !== settings) {
      updateSettings();
    }
  }, [state]);

  const { data, loading } = useQuery<IGetVillagesQuery>(GetVillages, { fetchPolicy: 'network-only' } );

  if (loading) {
    return null;
  }

  const {
    villages,
  } = data;

  const onBoolChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      name,
      checked,
    } = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const onNumberChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const {
      name,
      value,
    } = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      [name]: +value,
    }));
  };

  const onNumberOptionChange = (e: React.FocusEvent<HTMLSelectElement>) => {
    const {
      name,
      value,
    } = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      [name]: +value,
    }));
  };

  const onCooldownChange = (updatedCooldown: ICoolDown) => {
    setState(prevState => ({
      ...prevState,
      coolDown: updatedCooldown,
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
  } = state;

  const preferredVillageExists = villages.some(x => x.id === preferredVillageId);
  const options = preferredVillageExists
    ? villages
    : [{ id: preferredVillageId, name: '' }].concat(villages);

  return (
    <div>
      <h2>AutoAdventure</h2>
      <label htmlFor="allow">Allow</label>
      <input type="checkbox" checked={allow} onChange={onBoolChange} id="allow" name="allow" />

      <label htmlFor="preferHard">Prefer hard</label>
      <input type="checkbox" checked={preferHard} onChange={onBoolChange} id="preferHard" name="preferHard" />

      <label htmlFor="maxTravelTime">Max travel time</label>
      <input type="number" value={maxTravelTime} onChange={onNumberChange} id="maxTravelTime" name="maxTravelTime" />

      <label htmlFor="normalMinHealth">Normal min health</label>
      <input type="number" value={normalMinHealth} onChange={onNumberChange} id="normalMinHealth" name="normalMinHealth" />

      <label htmlFor="hardMinHealth">Hard min health</label>
      <input type="number" value={hardMinHealth} onChange={onNumberChange} id="hardMinHealth" name="hardMinHealth" />

      <h3>Cooldown</h3>
      <label htmlFor="maxTravelTime">Cooldown</label>
      <CooldDown value={coolDown} onChange={onCooldownChange} />

      <label htmlFor="preferredVillageId">Preferred village</label>
      <select value={preferredVillageId} onChange={onNumberOptionChange} id="preferredVillageId" name="preferredVillageId" placeholder="Select village" >
        {options.map(option => {
          const villageExists = villages.some(x => x.id === option.id);
          return (
            <option
              key={option.id ? option.id.toString() : ''}
              value={option.id}
              hidden={!villageExists}
            >
              {option.name}
            </option>
          )
        })}
      </select>
    </div>
  );
};

AutoAdventureSettings.displayName = 'AutoAdventureSettings';

export { AutoAdventureSettings };
