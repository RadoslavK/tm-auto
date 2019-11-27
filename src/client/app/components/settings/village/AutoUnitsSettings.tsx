import React, {
  useCallback,
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
  IAutoUnitsSettings,
  ICoolDown,
  IGetAutoUnitsSettingsQuery,
  IGetAutoUnitsSettingsQueryVariables,
  IOnAutoUnitsSettingsChangeSubscription,
  IOnAutoUnitsSettingsChangeSubscriptionVariables,
  IResetVillageSettingsMutation,
  IResetVillageSettingsMutationVariables,
  IUpdateAutoUnitsSettingsInput,
  IUpdateAutoUnitsSettingsMutation,
  IUpdateAutoUnitsSettingsMutationVariables,
  VillageSettingsType,
} from '../../../../_types/graphql';
import { CoolDown } from '../../controls/Cooldown';
import {
  GetAutoUnitsSettings,
  OnAutoUnitsSettingsChange,
  ResetVillageSettings,
  UpdateAutoUnitsSettings,
} from '*/graphql_operations/settings.graphql';
import { useVillageContext } from '../../../hooks/useVillageContext';

interface IProps {
  readonly settings: IAutoUnitsSettings;
}

const Container: React.FC = () => {
  const { villageId } = useVillageContext();
  const [settings, setSettings] = useState<IAutoUnitsSettings>();
  const { data, loading } = useQuery<IGetAutoUnitsSettingsQuery, IGetAutoUnitsSettingsQueryVariables>(GetAutoUnitsSettings, {
    variables: { villageId },
  });

  useSubscription<IOnAutoUnitsSettingsChangeSubscription, IOnAutoUnitsSettingsChangeSubscriptionVariables>(OnAutoUnitsSettingsChange, {
    variables: { villageId },
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.loading && subscriptionData.data) {
        setSettings(subscriptionData.data.autoUnitsSettingsChanged);
      }
    },
  });

  useEffect(() => {
    if (!loading && data) {
      setSettings(data.autoUnitsSettings);
    }
  }, [loading, data]);

  if (!settings) {
    return null;
  }

  return (
    <AutoUnitsSettings settings={settings} />
  );
};

export { Container as AutoUnitsSettings };

const AutoUnitsSettings: React.FC<IProps> = (props) => {
  const {
    settings,
  } = props;

  const { villageId } = useVillageContext();
  const [state, setState] = useState<Omit<IUpdateAutoUnitsSettingsInput, 'villageId'>>({
    allow: settings.allow,
    coolDown: settings.coolDown,
    minCrop: settings.minCrop,
  });

  const input: IUpdateAutoUnitsSettingsInput = {
    villageId,
    ...state,
  };

  const [updateSettings] = useMutation<IUpdateAutoUnitsSettingsMutation, IUpdateAutoUnitsSettingsMutationVariables>(UpdateAutoUnitsSettings, {
    variables: { input },
  });

  useEffect(() => {
    if (state !== settings) {
      updateSettings();
    }
  }, [state, updateSettings]);
  
  const [resetSettings] = useMutation<IResetVillageSettingsMutation, IResetVillageSettingsMutationVariables>(ResetVillageSettings, {
    variables: { type: VillageSettingsType.AutoUnits, villageId },
  });

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setState(settings);
    }
  }, [settings]);

  const onCooldownChange = useCallback((updatedCooldown: ICoolDown): void => {
    setState(prevState => ({
      ...prevState,
      coolDown: updatedCooldown,
    }));
  }, []);

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
  
  return (
    <div>
      <Button
        onClick={() => resetSettings()}
        variant="contained"
        color="primary"
        type="button"
      >
        Reset to default
      </Button>

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