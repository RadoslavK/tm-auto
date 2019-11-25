import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  ICoolDown,
  IGetVillageSettingsQuery,
  IUpdateAutoUnitsSettingsMutation,
  IUpdateAutoUnitsSettingsMutationVariables,
} from '../../../../_types/graphql';
import { CoolDown } from '../../controls/Cooldown';
import { UpdateAutoUnitsSettings } from '*/graphql_operations/settings.graphql';
import {
  IVillageContext,
  VillageContext,
} from '../../villages/context/VillageContext';

interface IProps {
  readonly settings: IGetVillageSettingsQuery['villageSettings']['autoUnits'];
}

export const AutoUnitsSettings: React.FC<IProps> = (props) => {
  const {
    settings,
  } = props;

  const { villageId } = useContext<IVillageContext>(VillageContext);

  const [state, setState] = useState(settings);
  
  const [updateSettings] = useMutation<IUpdateAutoUnitsSettingsMutation, IUpdateAutoUnitsSettingsMutationVariables>(UpdateAutoUnitsSettings, {
    variables: {
      input: { ...state, villageId },
    },
  });

  useEffect(() => {
    if (state !== settings) {
      updateSettings();
    }
  }, [state, settings, updateSettings]);

  const {
    allow,
    coolDown,
    minCrop,
  } = state;

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

    if (+value < 0) {
      return;
    }

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
  
  return (
    <div>
      <h2>AutoUnits</h2>
      <label htmlFor="allow">Allow</label>
      <input type="checkbox" checked={allow} onChange={onChange} id="allow" name="allow" />

      <h3>Cooldown</h3>
      <label>Cooldown</label>
      <CoolDown value={coolDown} onChange={onCooldownChange} />

      <label htmlFor="minCrop">Min crop</label>
      <input type="number" value={minCrop} onChange={onNumberChange} id="minCrop" name="minCrop" />
    </div>
  );
};