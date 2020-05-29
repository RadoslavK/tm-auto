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
  GetGeneralVillageSettings,
  OnGeneralVillageSettingsChanged,
  ResetVillageSettings,
  UpdateGeneralVillageSettings,
} from '*/graphql_operations/settings.graphql';

import {
  GeneralVillageSettings,
  GetGeneralVillageSettingsQuery,
  GetGeneralVillageSettingsQueryVariables,
  OnGeneralVillageSettingsChangedSubscription,
  OnGeneralVillageSettingsChangedSubscriptionVariables,
  ResetVillageSettingsMutation,
  ResetVillageSettingsMutationVariables,
  UpdateGeneralVillageSettingsInput,
  UpdateGeneralVillageSettingsMutation,
  UpdateGeneralVillageSettingsMutationVariables,
  VillageSettingsType,
} from '../../../_graphql/types/graphql.type';
import { useVillageSettingsContext } from './context/villageSettingsContext';

const Container: React.FC = () => {
  const { villageId } = useVillageSettingsContext();

  const [settings, setSettings] = useState<GeneralVillageSettings>();
  const { data, loading } = useQuery<GetGeneralVillageSettingsQuery, GetGeneralVillageSettingsQueryVariables>(GetGeneralVillageSettings, {
    variables: { villageId },
  });

  useSubscription<OnGeneralVillageSettingsChangedSubscription, OnGeneralVillageSettingsChangedSubscriptionVariables>(OnGeneralVillageSettingsChanged, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.loading && subscriptionData.data) {
        setSettings(subscriptionData.data.generalVillageSettingsChanged);
      }
    },
    variables: { villageId },
  });

  useEffect(() => {
    if (!loading && data) {
      setSettings(data.generalVillageSettings);
    }
  }, [loading, data]);

  if (!settings) {
    return null;
  }

  return (
    <GeneralVillageSettings
      key={villageId}
      settings={settings}
      villageId={villageId}
    />
  );
};

export { Container as GeneralVillageSettings };

type Props = {
  readonly settings: GeneralVillageSettings;
  readonly villageId: number;
};

const GeneralVillageSettings: React.FC<Props> = (props) => {
  const {
    settings,
    villageId,
  } = props;

  const [state, setState] = useState(settings);
  const input: UpdateGeneralVillageSettingsInput = {
    ...state,
    villageId,
  };

  const [resetSettings] = useMutation<ResetVillageSettingsMutation, ResetVillageSettingsMutationVariables>(ResetVillageSettings, {
    variables: { type: VillageSettingsType.General, villageId },
  });

  const [updateSettings] = useMutation<UpdateGeneralVillageSettingsMutation, UpdateGeneralVillageSettingsMutationVariables>(
    UpdateGeneralVillageSettings,
    { variables: { settings: input } },
  );

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

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
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
  } = state;

  return (
    <div>
      <Button
        color="primary"
        onClick={() => resetSettings()}
        type="button"
        variant="contained"
      >
        Reset to default
      </Button>

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
    </div>
  );
};
