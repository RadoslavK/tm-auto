import React, { useEffect, useState } from 'react';
import {
  useMutation,
  useQuery,
} from '@apollo/react-hooks';
import { Button } from '@material-ui/core';
import {
  GetGeneralVillageSettings,
  ResetGeneralVillageSettings,
  UpdateGeneralVillageSettings,
} from '*/graphql_operations/settings.graphql';
import {
  IGeneralVillageSettings,
  IGetGeneralVillageSettingsQuery,
  IGetGeneralVillageSettingsQueryVariables,
  IResetGeneralVillageSettingsMutation,
  IResetGeneralVillageSettingsMutationVariables,
  IUpdateGeneralVillageSettingsInput,
  IUpdateGeneralVillageSettingsMutation,
  IUpdateGeneralVillageSettingsMutationVariables,
} from '../../../../_types/graphql';
import { useVillageContext } from '../../../hooks/useVillageContext';

const Container: React.FC = () => {
  const { villageId } = useVillageContext();

  const { data, loading, refetch } = useQuery<IGetGeneralVillageSettingsQuery, IGetGeneralVillageSettingsQueryVariables>(GetGeneralVillageSettings, {
    variables: { villageId },
  });

  if (!data || loading) {
    return null;
  }

  return (
    <GeneralVillageSettings
      settings={data.generalVillageSettings}
      reload={refetch}
    />
  );
};

export { Container as GeneralVillageSettings };

interface IProps {
  readonly settings: IGeneralVillageSettings;
  readonly reload: () => void;
}

const GeneralVillageSettings: React.FC<IProps> = (props) => {
  const {
    settings,
    reload,
  } = props;

  const { villageId } = useVillageContext();
  const [state, setState] = useState(settings);
  const input: IUpdateGeneralVillageSettingsInput = {
    settings: state,
    villageId,
  };

  const [resetSettings, resetSettingsResult] = useMutation<IResetGeneralVillageSettingsMutation, IResetGeneralVillageSettingsMutationVariables>(ResetGeneralVillageSettings, {
    variables: { input: { villageId } },
  });

  const [updateSettings] = useMutation<IUpdateGeneralVillageSettingsMutation, IUpdateGeneralVillageSettingsMutationVariables>(UpdateGeneralVillageSettings,
    { variables: { input } },
  );

  useEffect(() => {
    if (state !== settings) {
      updateSettings();
    }
  }, [state, settings, updateSettings]);

  useEffect(() => {
    if (resetSettingsResult.called && !resetSettingsResult.loading) {
      reload();
    }
  }, [resetSettingsResult, reload]);


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
