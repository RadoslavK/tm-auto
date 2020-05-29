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
  GeneralSettings,
  GetGeneralSettingsQuery,
  OnGeneralSettingsChangedSubscription,
  ResetSettingsMutation,
  ResetSettingsMutationVariables,
  SettingsType,
  UpdateGeneralSettingsInput,
  UpdateGeneralSettingsMutation,
  UpdateGeneralSettingsMutationVariables,
} from '../../_graphql/types/graphql.type';

const Container: React.FC = () => {
  const [settings, setSettings] = useState<GeneralSettings>();
  const { data, loading } = useQuery<GetGeneralSettingsQuery>(GetGeneralSettings);

  useSubscription<OnGeneralSettingsChangedSubscription>(OnGeneralSettingsChanged, {
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

type Props = {
  readonly settings: GeneralSettings;
};

const GeneralSettings: React.FC<Props> = (props) => {
  const {
    settings,
  } = props;

  const [state, setState] = useState(settings);
  const input: UpdateGeneralSettingsInput = {
    ...state,
  };
  const [updateSettings] = useMutation<UpdateGeneralSettingsMutation, UpdateGeneralSettingsMutationVariables>(UpdateGeneralSettings, {
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
  }, [settings, state, updateSettings]);

  const [resetSettings] = useMutation<ResetSettingsMutation, ResetSettingsMutationVariables>(
    ResetSettings,
    { variables: { type: SettingsType.General } },
  );

  const onChange = async (e: React.FormEvent<HTMLInputElement>): Promise<void> => {
    const {
      checked,
      name,
    } = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const {
    allowTasks,
    autoBuild,
    autoParty,
    autoStart,
    autoUnits,
  } = state;

  return (
    <div>
      <h1>General settings</h1>
      <div>
        <Button
          color="primary"
          onClick={() => resetSettings()}
          type="button"
          variant="contained"
        >
          Reset to default
        </Button>
      </div>
      <div>
        <div>
          <label htmlFor="autoStart">Start after sign in</label>
          <input
            checked={autoStart}
            id="autoStart"
            name="autoStart"
            onChange={onChange}
            type="checkbox"
          />
        </div>

        <div>
          <label htmlFor="allowTasks">Allow tasks</label>
          <input
            checked={allowTasks}
            id="allowTasks"
            name="allowTasks"
            onChange={onChange}
            type="checkbox"
          />
        </div>

        <div>
          <label htmlFor="autoBuild">Auto Build</label>
          <input
            checked={autoBuild}
            id="autoBuild"
            name="autoBuild"
            onChange={onChange}
            type="checkbox"
          />
        </div>

        <div>
          <label htmlFor="autoUnits">Auto Units</label>
          <input
            checked={autoUnits}
            id="autoUnits"
            name="autoUnits"
            onChange={onChange}
            type="checkbox"
          />
        </div>

        <div>
          <label htmlFor="autoParty">Auto Party</label>
          <input
            checked={autoParty}
            id="autoParty"
            name="autoParty"
            onChange={onChange}
            type="checkbox"
          />
        </div>
      </div>
    </div>
  );
};
