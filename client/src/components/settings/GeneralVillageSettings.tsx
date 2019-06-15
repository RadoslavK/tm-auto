import { UpdateGeneralVillageSettings } from '*/graphql_operations/settings.graphql';
import { useContext, useEffect, useState } from 'react';
import * as React from 'react';
import { useMutation } from 'react-apollo-hooks';
import {
  IGeneralVillageSettings, IGeneralVillageSettingsInput, IUpdateGeneralVillageSettingsInput,
  IUpdateGeneralVillageSettingsMutation,
  IUpdateGeneralVillageSettingsMutationVariables,
} from '../../_types/graphql';
import { IVillageContext, VillageContext } from '../villages/context/VillageContext';

interface IProps {
  readonly settings: IGeneralVillageSettings;
}

export const GeneralVillageSettings: React.FunctionComponent<IProps> = (props) => {
  const {
    settings,
  } = props;

  const [state, setState] = useState(settings);
  const { villageId } = useContext<IVillageContext>(VillageContext);
  const input: IUpdateGeneralVillageSettingsInput = {
    settings: state,
    villageId,
  };
  const updateSettings = useMutation<IUpdateGeneralVillageSettingsMutation, IUpdateGeneralVillageSettingsMutationVariables>(
    UpdateGeneralVillageSettings,
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

  const {
    allowTasks,
  } = state;

  return (
    <div>
      <h2>General</h2>
      <label htmlFor="allowTasks">Allow tasks</label>
      <input type="checkbox" checked={allowTasks} onChange={onChange} id="allowTasks" name="allowTasks" />
    </div>
  );
};
