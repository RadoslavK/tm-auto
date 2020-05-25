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
  OnAutoUnitsSettingsChanged,
  ResetVillageSettings,
  UpdateAutoUnitsSettings,
} from '*/graphql_operations/settings.graphql';

import { CoolDown } from '../../../_shared/components/controls/CoolDown';
import {
  IAutoUnitsSettings,
  ICoolDown,
  IGetAutoUnitsSettingsQuery,
  IGetAutoUnitsSettingsQueryVariables,
  IOnAutoUnitsSettingsChangedSubscription,
  IOnAutoUnitsSettingsChangedSubscriptionVariables,
  IResetVillageSettingsMutation,
  IResetVillageSettingsMutationVariables,
  IUpdateAutoUnitsSettingsInput,
  IUpdateAutoUnitsSettingsMutation,
  IUpdateAutoUnitsSettingsMutationVariables,
  VillageSettingsType,
} from '../../../_types/graphql';
import { createOnNumberChanged } from '../../../utils/createOnNumberChanged';
import { useVillageSettingsContext } from './_context';

const Container: React.FC = () => {
  const { villageId } = useVillageSettingsContext();
  const [settings, setSettings] = useState<IAutoUnitsSettings>();
  const { data, loading } = useQuery<IGetAutoUnitsSettingsQuery, IGetAutoUnitsSettingsQueryVariables>(GetAutoUnitsSettings, {
    variables: { villageId },
  });

  useSubscription<IOnAutoUnitsSettingsChangedSubscription, IOnAutoUnitsSettingsChangedSubscriptionVariables>(OnAutoUnitsSettingsChanged, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.loading && subscriptionData.data) {
        setSettings(subscriptionData.data.autoUnitsSettingsChanged);
      }
    },
    variables: { villageId },
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

type Props = {
  readonly settings: IAutoUnitsSettings;
  readonly villageId: number;
};

const AutoUnitsSettings: React.FC<Props> = (props) => {
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
  }, [settings, state, updateSettings]);

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

  const onCoolDownChange = useCallback((updatedCooldown: ICoolDown): void => {
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
      checked,
      name,
    } = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const onNumberChange = createOnNumberChanged({
    callback: (name, value) => setState(prevState => ({
      ...prevState,
      [name]: +value,
    })),
    minValue: 0,
  });

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
        <label htmlFor="allow">Allow</label>
        <input
          checked={allow}
          id="allow"
          name="allow"
          onChange={onChange}
          type="checkbox"
        />
      </div>

      <div>
        <label>Cooldown</label>
        <CoolDown
          onChange={onCoolDownChange}
          value={coolDown}
        />
      </div>

      <div>
        <label htmlFor="minCrop">Min crop</label>
        <input
          id="minCrop"
          name="minCrop"
          onChange={onNumberChange}
          type="number"
          value={minCrop}
        />
      </div>
    </div>
  );
};
