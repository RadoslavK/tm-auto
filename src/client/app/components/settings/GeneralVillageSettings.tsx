import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Button } from '@material-ui/core';
import {
  ResetGeneralVillageSettings,
  UpdateGeneralVillageSettings,
} from '*/graphql_operations/settings.graphql';
import {
  IGeneralVillageSettings, IUpdateGeneralVillageSettingsInput,
  IUpdateGeneralVillageSettingsMutation,
  IUpdateGeneralVillageSettingsMutationVariables,
} from '../../../_types/graphql';
import { IVillageContext, VillageContext } from '../villages/context/VillageContext';

interface IProps {
  readonly settings: IGeneralVillageSettings;
}

export const GeneralVillageSettings: React.FC<IProps> = (props) => {
  const {
    settings,
  } = props;

  const [state, setState] = useState(settings);
  const { villageId } = useContext<IVillageContext>(VillageContext);
  const input: IUpdateGeneralVillageSettingsInput = {
    settings: state,
    villageId,
  };
  const [updateSettings] = useMutation<IUpdateGeneralVillageSettingsMutation, IUpdateGeneralVillageSettingsMutationVariables>(
    UpdateGeneralVillageSettings,
    { variables: { input } },
  );

  const [resetSettings] = useMutation(ResetGeneralVillageSettings, {
    variables: { villageId },
  });

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

  const {
    allowTasks,
  } = state;

  return (
    <div>
      <h2>General</h2>
      <Button
        onClick={() => resetSettings()}
        variant="contained"
        color="primary"
        type="button"
      >
        Reset to default
      </Button>
      <label htmlFor="allowTasks">Allow tasks</label>
      <input type="checkbox" checked={allowTasks} onChange={onChange} id="allowTasks" name="allowTasks" />
    </div>
  );
};
