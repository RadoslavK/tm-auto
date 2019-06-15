import { UpdateAutoBuildVillageSettings } from '*/graphql_operations/settings.graphql';
import { useContext, useEffect, useState } from 'react';
import React from 'react';
import { useMutation } from 'react-apollo-hooks';
import {
  IAutoBuildSettings, ICoolDown, IUpdateAutoBuildVillageSettingsInput,
  IUpdateAutoBuildVillageSettingsMutation,
  IUpdateAutoBuildVillageSettingsMutationVariables,
} from '../../../_types/graphql';
import { CooldDown } from '../../controls/Cooldown';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';

interface IProps {
  readonly settings: IAutoBuildSettings;
}

export const AutoBuildSettings: React.FunctionComponent<IProps> = (props) => {
  const {
    settings,
  } = props;

  const [state, setState] = useState(settings);

  const { villageId } = useContext<IVillageContext>(VillageContext);
  const input: IUpdateAutoBuildVillageSettingsInput = {
    villageId,
    settings: state,
  };

  const updateSettings = useMutation<IUpdateAutoBuildVillageSettingsMutation, IUpdateAutoBuildVillageSettingsMutationVariables>(
    UpdateAutoBuildVillageSettings,
    { variables: { input } },
    );

  useEffect(() => {
    if (state !== settings) {
      updateSettings();
    }
  }, [state]);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const {
      name,
      checked,
    } = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      [name]: checked,
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
    coolDown,
  } = state;

  return (
    <div>
      <h2>AutoBuild</h2>
      <label htmlFor="allow">Allow</label>
      <input type="checkbox" checked={allow} onChange={onChange} id="allow" name="allow" />

      <h3>Cooldown</h3>
      <label htmlFor="maxTravelTime">Cooldown</label>
      <CooldDown value={coolDown} onChange={onCooldownChange} />
    </div>
  );
};
