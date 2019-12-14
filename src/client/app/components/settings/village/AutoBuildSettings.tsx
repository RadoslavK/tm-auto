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
  GetAutoBuildSettings,
  OnAutoBuildSettingsChanged,
  ResetVillageSettings,
  UpdateAutoBuildVillageSettings,
} from '*/graphql_operations/settings.graphql';

import {
  IAutoBuildSettings,
  ICoolDown,
  IGetAutoBuildSettingsQuery,
  IGetAutoBuildSettingsQueryVariables,
  IOnAutoBuildSettingsChangedSubscription,
  IOnAutoBuildSettingsChangedSubscriptionVariables,
  IResetVillageSettingsMutation,
  IResetVillageSettingsMutationVariables,
  IUpdateAutoBuildVillageSettingsInput,
  IUpdateAutoBuildVillageSettingsMutation,
  IUpdateAutoBuildVillageSettingsMutationVariables,
  VillageSettingsType,
} from '../../../../_types/graphql';
import { CoolDown } from '../../controls/Cooldown';
import { useVillageSettingsContext } from './_context';

const Container: React.FC = () => {
  const { villageId } = useVillageSettingsContext();
  const [settings, setSettings] = useState<IAutoBuildSettings>();
  const { data, loading } = useQuery<IGetAutoBuildSettingsQuery, IGetAutoBuildSettingsQueryVariables>(GetAutoBuildSettings, {
    variables: { villageId },
  });

  useSubscription<IOnAutoBuildSettingsChangedSubscription, IOnAutoBuildSettingsChangedSubscriptionVariables>(OnAutoBuildSettingsChanged, {
    variables: { villageId },
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.loading && subscriptionData.data) {
        setSettings(subscriptionData.data.autoBuildSettingsChanged);
      }
    },
  });

  useEffect(() => {
    if (!loading && data) {
      setSettings(data.autoBuildSettings);
    }
  }, [loading, data]);

  if (!settings) {
    return null;
  }

  return (
    <AutoBuildSettings
      key={villageId}
      settings={settings}
      villageId={villageId}
    />
  );
};

export { Container as AutoBuildSettings };

interface IProps {
  readonly settings: IAutoBuildSettings;
  readonly villageId: number;
}

const AutoBuildSettings: React.FC<IProps> = (props) => {
  const {
    settings,
    villageId,
  } = props;

  const [state, setState] = useState(settings);

  const input: IUpdateAutoBuildVillageSettingsInput = {
    villageId,
    ...state,
  };

  const [updateSettings] = useMutation<IUpdateAutoBuildVillageSettingsMutation, IUpdateAutoBuildVillageSettingsMutationVariables>(UpdateAutoBuildVillageSettings,
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
  }, [state, updateSettings]);

  const [resetSettings] = useMutation<IResetVillageSettingsMutation, IResetVillageSettingsMutationVariables>(ResetVillageSettings, {
    variables: { type: VillageSettingsType.AutoBuild, villageId },
  });

  const onCooldownChange = useCallback((updatedCooldown: ICoolDown): void => {
    setState(prevState => ({
      ...prevState,
      coolDown: updatedCooldown,
    }));
  }, []);

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

  const {
    allow,
    coolDown,
    autoCropFields,
    minCrop,
  } = state;

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

      <label htmlFor="autoCropFields">Auto crop fields</label>
      <input type="checkbox" checked={autoCropFields} onChange={onChange} id="autoCropFields" name="autoCropFields" />

      <label htmlFor="minCrop">Min crop</label>
      <input type="number" value={minCrop} onChange={onNumberChange} id="minCrop" name="minCrop" />
    </div>
  );
};
