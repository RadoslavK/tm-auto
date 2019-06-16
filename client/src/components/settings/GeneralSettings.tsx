import { GetGeneralSettings, UpdateGeneralSettings } from '*/graphql_operations/settings.graphql';
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from 'react-apollo-hooks';
import {
  IGeneralSettings,
  IGetGeneralSettingsQuery, IUpdateGeneralSettingsInput,
  IUpdateGeneralSettingsMutation,
  IUpdateGeneralSettingsMutationVariables,
} from '../../_types/graphql';

interface IProps {
  readonly settings: IGeneralSettings;
}

const GeneralSettings: React.FunctionComponent<IProps> = (props) => {
  const {
    settings,
  } = props;

  const [state, setState] = useState(settings);
  const input: IUpdateGeneralSettingsInput = {
    settings: state,
  };
  const updateSettings = useMutation<IUpdateGeneralSettingsMutation, IUpdateGeneralSettingsMutationVariables>(UpdateGeneralSettings, {
    variables: { input },
  });

  useEffect(() => {
    if (state !== settings) {
      updateSettings();
    }
  },[state]);

  const onChange = async (e: React.FormEvent<HTMLInputElement>) => {
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
    allowTasks,
  } = state;

  return (
    <div>
      <h1>General settings</h1>
      <div>
        <div>
          <label htmlFor="allowTasks">Allow tasks</label>
          <input type="checkbox" checked={autoBuild} onChange={onChange} id="allowTasks" name="allowTasks" />
        </div>

        <div>
          <label htmlFor="autoBuild">AutoBuild</label>
          <input type="checkbox" checked={autoBuild} onChange={onChange} id="autoBuild" name="autoBuild" />
        </div>
      </div>
    </div>
  );
};

GeneralSettings.displayName = 'GeneralSettings';

const Container: React.FunctionComponent = () => {
  const { data, loading } = useQuery<IGetGeneralSettingsQuery>(GetGeneralSettings, { fetchPolicy: 'network-only' });

  if (loading) {
    return null;
  }

  return <GeneralSettings settings={data.generalSettings} />
};

export { Container as GeneralSettings };
