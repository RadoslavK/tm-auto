import {
  useMutation,
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import { Button } from '@material-ui/core';
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  GetGeneralSettings,
  OnGeneralSettingsChanged,
  ResetSettings,
  UpdateGeneralSettings,
} from '*/graphql_operations/settings.graphql';

import {
  IGeneralSettings,
  IGetGeneralSettingsQuery,
  IOnGeneralSettingsChangedSubscription,
  IResetSettingsMutation,
  IResetSettingsMutationVariables,
  IUpdateGeneralSettingsInput,
  IUpdateGeneralSettingsMutation,
  IUpdateGeneralSettingsMutationVariables,
  SettingsType,
} from '../../../_types/graphql';

const Container: React.FC = () => {
  const [settings, setSettings] = useState<IGeneralSettings>();
  const { data, loading } = useQuery<IGetGeneralSettingsQuery>(GetGeneralSettings);

  useSubscription<IOnGeneralSettingsChangedSubscription>(OnGeneralSettingsChanged, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.loading && subscriptionData.data) {
        setSettings(subscriptionData.data.generalSettingsChanged);
      }
    },
  });

  useEffect(() => {
    if (!loading && data) {
      setSettings(data.generalSettings);
    }
  }, [data, loading]);

  if (!settings) {
    return null;
  }

  return <GeneralSettings settings={settings} />;
};

export { Container as GeneralSettings };

interface IProps {
  readonly settings: IGeneralSettings;
}

const GeneralSettings: React.FC<IProps> = (props) => {
  const {
    settings,
  } = props;

  const [state, setState] = useState(settings);
  const input: IUpdateGeneralSettingsInput = {
    ...state,
  };
  const [updateSettings] = useMutation<IUpdateGeneralSettingsMutation, IUpdateGeneralSettingsMutationVariables>(UpdateGeneralSettings, {
    variables: { settings: input },
  });

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setState(settings);
    }
  }, [settings]);

  useEffect(() => {
    if (state !== settings) {
      updateSettings();
    }
  }, [state, updateSettings]);

  const [resetSettings] = useMutation<IResetSettingsMutation, IResetSettingsMutationVariables>(ResetSettings,
    { variables: { type: SettingsType.General } },
  );

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
    allowTasks,
    autoStart,
    autoBuild,
    autoUnits,
    autoParty,
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
          <label htmlFor="autoStart">Start after sign in</label>
          <input type="checkbox" checked={autoStart} onChange={onChange} id="autoStart" name="autoStart" />
        </div>

        <div>
          <label htmlFor="allowTasks">Allow tasks</label>
          <input type="checkbox" checked={allowTasks} onChange={onChange} id="allowTasks" name="allowTasks" />
        </div>

        <div>
          <label htmlFor="autoBuild">Auto Build</label>
          <input type="checkbox" checked={autoBuild} onChange={onChange} id="autoBuild" name="autoBuild" />
        </div>

        <div>
          <label htmlFor="autoUnits">Auto Units</label>
          <input type="checkbox" checked={autoUnits} onChange={onChange} id="autoUnits" name="autoUnits" />
        </div>

        <div>
          <label htmlFor="autoParty">Auto Party</label>
          <input type="checkbox" checked={autoParty} onChange={onChange} id="autoParty" name="autoParty" />
        </div>
      </div>
    </div>
  );
};
