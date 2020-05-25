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

import { CoolDown } from '../../../_shared/components/controls/CoolDown';
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
} from '../../../_types/graphql';
import { createOnNumberChanged } from '../../../utils/createOnNumberChanged';
import { useVillageSettingsContext } from './_context';

const Container: React.FC = () => {
  const { villageId } = useVillageSettingsContext();
  const [settings, setSettings] = useState<IAutoBuildSettings>();
  const { data, loading } = useQuery<IGetAutoBuildSettingsQuery, IGetAutoBuildSettingsQueryVariables>(GetAutoBuildSettings, {
    variables: { villageId },
  });

  useSubscription<IOnAutoBuildSettingsChangedSubscription, IOnAutoBuildSettingsChangedSubscriptionVariables>(OnAutoBuildSettingsChanged, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.loading && subscriptionData.data) {
        setSettings(subscriptionData.data.autoBuildSettingsChanged);
      }
    },
    variables: { villageId },
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

type Props = {
  readonly settings: IAutoBuildSettings;
  readonly villageId: number;
};

type Settings = Omit<IAutoBuildSettings, 'autoStorage'> & {
  readonly allowAutoGranary: boolean;
  readonly allowAutoWarehouse: boolean;
  readonly allowFreeSpots: boolean;
  readonly autoGranaryOverflowLevel: number;
  readonly autoWarehouseOverflowLevel: number;
};

const getStateFromSettings = (settings: IAutoBuildSettings): Settings => {
  const {
    autoStorage: {
      allowFreeSpots,
      granary: {
        allow: allowAutoGranary,
        overflowLevel: autoGranaryOverflowLevel,
      },
      warehouse: {
        allow: allowAutoWarehouse,
        overflowLevel: autoWarehouseOverflowLevel,
      },
    },
    ...otherSettings
  } = settings;

  return {
    ...otherSettings,
    allowAutoGranary,
    allowAutoWarehouse,
    allowFreeSpots,
    autoGranaryOverflowLevel,
    autoWarehouseOverflowLevel,
  };
};

const AutoBuildSettings: React.FC<Props> = (props) => {
  const {
    settings,
    villageId,
  } = props;

  const [state, setState] = useState(getStateFromSettings(settings));

  const input: IUpdateAutoBuildVillageSettingsInput = {
    villageId,
    ...state,
  };

  const [updateSettings] = useMutation<IUpdateAutoBuildVillageSettingsMutation, IUpdateAutoBuildVillageSettingsMutationVariables>(
    UpdateAutoBuildVillageSettings,
    { variables: { settings: input } },
  );

  const isInitialMount = useRef(true);
  const settingsUpdated = useRef(false);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setState(getStateFromSettings(settings));
      settingsUpdated.current = false;
    }
  }, [settings]);

  useEffect(() => {
    if (settingsUpdated.current) {
      updateSettings();
    } else {
      settingsUpdated.current = true;
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
      checked,
      name,
    } = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const {
    allow,
    allowAutoGranary,
    allowAutoWarehouse,
    allowFreeSpots,
    autoCropFields,
    autoGranaryOverflowLevel,
    autoWarehouseOverflowLevel,
    coolDown,
    minCrop,
  } = state;

  const updateState = <TValue extends unknown>(name: string, value: TValue) => setState(prevState => ({
    ...prevState,
    [name]: value,
  }));

  const onMinCropChanged = createOnNumberChanged({
    callback: updateState,
    minValue: 0,
  });

  const onOverflowLevelChanged = createOnNumberChanged({
    callback: updateState,
    maxValue: 100,
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
          onChange={onCooldownChange}
          value={coolDown}
        />
      </div>

      <div>
        <label htmlFor="autoCropFields">Auto crop fields</label>
        <input
          checked={autoCropFields}
          id="autoCropFields"
          name="autoCropFields"
          onChange={onChange}
          type="checkbox"
        />
      </div>

      <div>
        <label htmlFor="allowFreeSpots">Allow auto buildings on new spots</label>
        <input
          checked={allowFreeSpots}
          id="allowFreeSpots"
          name="allowFreeSpots"
          onChange={onChange}
          type="checkbox"
        />
      </div>

      <div>
        <label htmlFor="allowAutoWarehouse">Auto warehouse</label>
        <input
          checked={allowAutoWarehouse}
          id="allowAutoWarehouse"
          name="allowAutoWarehouse"
          onChange={onChange}
          type="checkbox"
        />

        <label htmlFor="autoWarehouseOverflowLevel">Overflow level</label>
        <input
          id="autoWarehouseOverflowLevel"
          name="autoWarehouseOverflowLevel"
          onChange={onOverflowLevelChanged}
          type="number"
          value={autoWarehouseOverflowLevel}
        />
      </div>

      <div>
        <label htmlFor="allowAutoGranary">Auto granary</label>
        <input
          checked={allowAutoGranary}
          id="allowAutoGranary"
          name="allowAutoGranary"
          onChange={onChange}
          type="checkbox"
        />

        <label htmlFor="autoGranaryOverflowLevel">Overflow level</label>
        <input
          id="autoGranaryOverflowLevel"
          name="autoGranaryOverflowLevel"
          onChange={onOverflowLevelChanged}
          type="number"
          value={autoGranaryOverflowLevel}
        />
      </div>

      <div>
        <label htmlFor="minCrop">Min crop</label>
        <input
          id="minCrop"
          name="minCrop"
          onChange={onMinCropChanged}
          type="number"
          value={minCrop}
        />
      </div>
    </div>
  );
};
