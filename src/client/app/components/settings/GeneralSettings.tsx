import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Button } from '@material-ui/core';
import {
  GetGeneralSettings,
  ResetGeneralSettings,
  UpdateGeneralSettings,
} from '*/graphql_operations/settings.graphql';
import {
  IGeneralSettings,
  IGetGeneralSettingsQuery, IUpdateGeneralSettingsInput,
  IUpdateGeneralSettingsMutation,
  IUpdateGeneralSettingsMutationVariables,
} from '../../../_types/graphql';

interface IProps {
  readonly settings: IGeneralSettings;
}

const GeneralSettings: React.FC<IProps> = (props) => {
  const {
    settings,
  } = props;

  const [state, setState] = useState(settings);
  const input: IUpdateGeneralSettingsInput = {
    settings: state,
  };
  const [updateSettings] = useMutation<IUpdateGeneralSettingsMutation, IUpdateGeneralSettingsMutationVariables>(UpdateGeneralSettings, {
    variables: { input },
  });

  useEffect(() => {
    if (state !== settings) {
      updateSettings();
    }
  },[state, settings, updateSettings]);
  
  const [resetSettings] = useMutation(ResetGeneralSettings);

  const onChange = async (e: React.FormEvent<HTMLInputElement>): Promise<void> => {
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
    autoBuild,
    autoUnits,
    allowTasks,
  } = state;

  return (
    <div>
      <h1>General settings</h1>
      <div>
        <Button
          type="button"
          onClick={() => resetSettings()}
          variant="contained"
          color="primary"
        >
          Reset to default
        </Button>
      </div>
      <div>
        <div>
          <label htmlFor="allowTasks">Allow tasks</label>
          <input type="checkbox" checked={allowTasks} onChange={onChange} id="allowTasks" name="allowTasks" />
        </div>

        <div>
          <label htmlFor="autoBuild">AutoBuild</label>
          <input type="checkbox" checked={autoBuild} onChange={onChange} id="autoBuild" name="autoBuild" />
        </div>

        <div>
          <label htmlFor="autoUnits">AutoUnits</label>
          <input type="checkbox" checked={autoUnits} onChange={onChange} id="autoUnits" name="autoUnits" />
        </div>
      </div>
    </div>
  );
};

const Container: React.FC = () => {
  const { data, loading } = useQuery<IGetGeneralSettingsQuery>(GetGeneralSettings);

  if (loading || !data) {
    return null;
  }

  return <GeneralSettings settings={data.generalSettings} />;
};

export { Container as GeneralSettings };
