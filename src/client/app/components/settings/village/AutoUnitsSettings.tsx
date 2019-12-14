import {
  useMutation,
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
import { Button } from '@material-ui/core';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  GetAutoUnitsSettings,
  OnAutoUnitsSettingsChange,
  ResetVillageSettings,
  UpdateAutoUnitsSettings,
} from '*/graphql_operations/settings.graphql';

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
import { useVillageSettingsContext } from './_context';

const Container: React.FC = () => {
  const { villageId } = useVillageSettingsContext();
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
    <AutoUnitsSettings
      key={villageId}
      settings={settings}
      villageId={villageId}
    />
  );
};

export { Container as AutoUnitsSettings };

interface IProps {
  readonly settings: IAutoUnitsSettings;
  readonly villageId: number;
}

const AutoUnitsSettings: React.FC<IProps> = (props) => {
  const {
    settings,
    villageId,
  } = props;

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
    variables: { settings: input },
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

      <div>
        <label htmlFor="allow">Allow</label>
        <input type="checkbox" checked={allow} onChange={onChange} id="allow" name="allow" />
      </div>

      <div>
        <label>Cooldown</label>
        <CoolDown value={coolDown} onChange={onCooldownChange} />
      </div>

      <div>
        <label htmlFor="minCrop">Min crop</label>
        <input type="number" value={minCrop} onChange={onNumberChange} id="minCrop" name="minCrop" />
      </div>
    </div>
  );
};
