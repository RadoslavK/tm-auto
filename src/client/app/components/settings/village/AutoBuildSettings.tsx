import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { UpdateAutoBuildVillageSettings } from '*/graphql_operations/settings.graphql';
import {
  IAutoBuildSettings, ICoolDown, IUpdateAutoBuildVillageSettingsInput,
  IUpdateAutoBuildVillageSettingsMutation,
  IUpdateAutoBuildVillageSettingsMutationVariables,
} from '../../../../_types/graphql';
import { CoolDown } from '../../controls/Cooldown';
import { IVillageContext, VillageContext } from '../../villages/context/VillageContext';

interface IProps {
  readonly settings: IAutoBuildSettings;
}

export const AutoBuildSettings: React.FC<IProps> = (props) => {
  const {
    settings,
  } = props;

  const [state, setState] = useState(settings);

  const { villageId } = useContext<IVillageContext>(VillageContext);
  const input: IUpdateAutoBuildVillageSettingsInput = {
    villageId,
    settings: state,
  };

  const [updateSettings] = useMutation<IUpdateAutoBuildVillageSettingsMutation, IUpdateAutoBuildVillageSettingsMutationVariables>(
    UpdateAutoBuildVillageSettings,
    { variables: { input } },
    );

  useEffect(() => {
    if (state !== settings) {
      updateSettings();
    }
  }, [state, settings, updateSettings]);

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const {
      name,
      checked,
    } = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const onNumberChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const {
      name,
      value,
    } = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      [name]: +value,
    }));
  };

  const onCooldownChange = (updatedCooldown: ICoolDown): void => {
    setState(prevState => ({
      ...prevState,
      coolDown: updatedCooldown,
    }));
  };

  const {
    allow,
    coolDown,
    autoCropFields,
    minCrop,
  } = state;

  return (
    <div>
      <h2>AutoBuild</h2>
      <label htmlFor="allow">Allow</label>
      <input type="checkbox" checked={allow} onChange={onChange} id="allow" name="allow" />

      <h3>Cooldown</h3>
      <label htmlFor="maxTravelTime">Cooldown</label>
      <CoolDown value={coolDown} onChange={onCooldownChange} />

      <label htmlFor="autoCropFields">Auto crop fields</label>
      <input type="checkbox" checked={autoCropFields} onChange={onChange} id="autoCropFields" name="autoCropFields" />

      <label htmlFor="minCrop">Min crop</label>
      <input type="number" value={minCrop} onChange={onNumberChange} id="minCrop" name="minCrop" />
    </div>
  );
};
