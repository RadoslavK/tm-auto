import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  useMutation,
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import { Button } from '@material-ui/core';
import {
  GetGeneralVillageSettings,
  OnGeneralVillageSettingsChanged,
  ResetVillageSettings,
  UpdateGeneralVillageSettings,
} from '*/graphql_operations/settings.graphql';
import {
  IGeneralVillageSettings,
  IGetGeneralVillageSettingsQuery,
  IGetGeneralVillageSettingsQueryVariables,
  IOnGeneralVillageSettingsChangedSubscription,
  IOnGeneralVillageSettingsChangedSubscriptionVariables,
  IResetVillageSettingsMutation,
  IResetVillageSettingsMutationVariables,
  IUpdateGeneralVillageSettingsInput,
  IUpdateGeneralVillageSettingsMutation,
  IUpdateGeneralVillageSettingsMutationVariables,
  VillageSettingsType,
} from '../../../../_types/graphql';
import { useVillageContext } from '../../../hooks/useVillageContext';

const Container: React.FC = () => {
  const { villageId } = useVillageContext();
  const [settings, setSettings] = useState<IGeneralVillageSettings>();
  const { data, loading } = useQuery<IGetGeneralVillageSettingsQuery, IGetGeneralVillageSettingsQueryVariables>(GetGeneralVillageSettings, {
    variables: { villageId },
  });

  useSubscription<IOnGeneralVillageSettingsChangedSubscription, IOnGeneralVillageSettingsChangedSubscriptionVariables>(OnGeneralVillageSettingsChanged, {
    variables: { villageId },
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.loading && subscriptionData.data) {
        setSettings(subscriptionData.data.generalVillageSettingsChanged);
      }
    },
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
    <GeneralVillageSettings settings={settings} />
  );
};

export { Container as GeneralVillageSettings };

interface IProps {
  readonly settings: IGeneralVillageSettings;
}

const GeneralVillageSettings: React.FC<IProps> = (props) => {
  const {
    settings,
  } = props;

  const { villageId } = useVillageContext();
  const [state, setState] = useState(settings);
  const input: IUpdateGeneralVillageSettingsInput = {
    settings: state,
    villageId,
  };

  const [resetSettings] = useMutation<IResetVillageSettingsMutation, IResetVillageSettingsMutationVariables>(ResetVillageSettings, {
    variables: { type: VillageSettingsType.General, villageId },
  });

  const [updateSettings] = useMutation<IUpdateGeneralVillageSettingsMutation, IUpdateGeneralVillageSettingsMutationVariables>(UpdateGeneralVillageSettings,
    { variables: { input } },
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
  }, [state, updateSettings]);

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
