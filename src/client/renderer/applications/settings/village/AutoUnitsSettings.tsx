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
  AutoUnitsSettings,
  CoolDown as CoolDownModel,
  GetAutoUnitsSettingsQuery,
  GetAutoUnitsSettingsQueryVariables,
  OnAutoUnitsSettingsChangedSubscription,
  OnAutoUnitsSettingsChangedSubscriptionVariables,
  ResetVillageSettingsMutation,
  ResetVillageSettingsMutationVariables,
  UpdateAutoUnitsSettingsInput,
  UpdateAutoUnitsSettingsMutation,
  UpdateAutoUnitsSettingsMutationVariables,
  VillageSettingsType,
} from '../../../_types/graphql';
import { createOnNumberChanged } from '../../../utils/createOnNumberChanged';
import { useVillageSettingsContext } from './context/villageSettingsContext';

const Container: React.FC = () => {
  const { villageId } = useVillageSettingsContext();
  const [settings, setSettings] = useState<AutoUnitsSettings>();
  const { data, loading } = useQuery<GetAutoUnitsSettingsQuery, GetAutoUnitsSettingsQueryVariables>(GetAutoUnitsSettings, {
    variables: { villageId },
  });

  useSubscription<OnAutoUnitsSettingsChangedSubscription, OnAutoUnitsSettingsChangedSubscriptionVariables>(OnAutoUnitsSettingsChanged, {
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
  readonly settings: AutoUnitsSettings;
  readonly villageId: number;
};

const AutoUnitsSettings: React.FC<Props> = (props) => {
  const {
    settings,
    villageId,
  } = props;

  const [state, setState] = useState<Omit<UpdateAutoUnitsSettingsInput, 'villageId'>>({
    allow: settings.allow,
    coolDown: settings.coolDown,
    minCrop: settings.minCrop,
  });

  const input: UpdateAutoUnitsSettingsInput = {
    villageId,
    ...state,
  };

  const [updateSettings] = useMutation<UpdateAutoUnitsSettingsMutation, UpdateAutoUnitsSettingsMutationVariables>(UpdateAutoUnitsSettings, {
    variables: { settings: input },
  });

  useEffect(() => {
    if (state !== settings) {
      updateSettings();
    }
  }, [settings, state, updateSettings]);

  const [resetSettings] = useMutation<ResetVillageSettingsMutation, ResetVillageSettingsMutationVariables>(ResetVillageSettings, {
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

  const onCoolDownChange = useCallback((updatedCooldown: CoolDownModel): void => {
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
