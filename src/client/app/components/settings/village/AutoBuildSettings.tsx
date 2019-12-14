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
import { createOnNumberChanged } from '../../../utils/input/createOnNumberChanged';
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

type Settings = Omit<IAutoBuildSettings, 'autoStorage'> & {
  readonly allowFreeSpots: boolean;
  readonly allowAutoGranary: boolean;
  readonly allowAutoWarehouse: boolean;
  readonly autoGranaryOverflowLevel: number;
  readonly autoWarehouseOverflowLevel: number;
};

const getStateFromSettings = (settings: IAutoBuildSettings): Settings => {
  const {
    autoStorage: {
      granary: {
        allow: allowAutoGranary,
        overflowLevel: autoGranaryOverflowLevel,
      },
      warehouse: {
        allow: allowAutoWarehouse,
        overflowLevel: autoWarehouseOverflowLevel,
      },
      allowFreeSpots,
    },
    ...otherSettings
  } = settings;

  return {
    ...otherSettings,
    allowFreeSpots,
    autoWarehouseOverflowLevel,
    allowAutoWarehouse,
    autoGranaryOverflowLevel,
    allowAutoGranary,
  };
};

const AutoBuildSettings: React.FC<IProps> = (props) => {
  const {
    settings,
    villageId,
  } = props;

  const [state, setState] = useState(getStateFromSettings(settings));

  const input: IUpdateAutoBuildVillageSettingsInput = {
    villageId,
    ...state,
  };

  const [updateSettings] = useMutation<IUpdateAutoBuildVillageSettingsMutation, IUpdateAutoBuildVillageSettingsMutationVariables>(UpdateAutoBuildVillageSettings,
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
      name,
      checked,
    } = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const {
    allow,
    coolDown,
    autoCropFields,
    minCrop,
    allowFreeSpots,
    allowAutoGranary,
    autoGranaryOverflowLevel,
    allowAutoWarehouse,
    autoWarehouseOverflowLevel,
  } = state;

  const updateState = <TValue extends unknown>(name: string, value: TValue) => setState(prevState => ({
    ...prevState,
    [name]: value,
  }));

  const onMinCropChanged = createOnNumberChanged({
    minValue: 0,
    callback: updateState,
  });

  const onOverflowLevelChanged = createOnNumberChanged({
    minValue: 0,
    maxValue: 100,
    callback: updateState,
  });

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
        <label htmlFor="autoCropFields">Auto crop fields</label>
        <input type="checkbox" checked={autoCropFields} onChange={onChange} id="autoCropFields" name="autoCropFields" />
      </div>

      <div>
        <label htmlFor="allowFreeSpots">Allow auto buildings on new spots</label>
        <input type="checkbox" checked={allowFreeSpots} onChange={onChange} id="allowFreeSpots" name="allowFreeSpots" />
      </div>

      <div>
        <label htmlFor="allowAutoWarehouse">Auto warehouse</label>
        <input type="checkbox" checked={allowAutoWarehouse} onChange={onChange} id="allowAutoWarehouse" name="allowAutoWarehouse" />

        <label htmlFor="autoWarehouseOverflowLevel">Overflow level</label>
        <input type="number" value={autoWarehouseOverflowLevel} onChange={onOverflowLevelChanged} id="autoWarehouseOverflowLevel" name="autoWarehouseOverflowLevel" />
      </div>

      <div>
        <label htmlFor="allowAutoGranary">Auto granary</label>
        <input type="checkbox" checked={allowAutoGranary} onChange={onChange} id="allowAutoGranary" name="allowAutoGranary" />

        <label htmlFor="autoGranaryOverflowLevel">Overflow level</label>
        <input type="number" value={autoGranaryOverflowLevel} onChange={onOverflowLevelChanged} id="autoGranaryOverflowLevel" name="autoGranaryOverflowLevel" />
      </div>

      <div>
        <label htmlFor="minCrop">Min crop</label>
        <input type="number" value={minCrop} onChange={onMinCropChanged} id="minCrop" name="minCrop" />
      </div>
    </div>
  );
};
