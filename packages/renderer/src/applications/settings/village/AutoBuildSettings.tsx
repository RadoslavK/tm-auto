import { Button } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useCallback,
  useEffect,
  useState, 
} from 'react';
import {
  useLazyLoadQuery,
  useMutation,
} from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';

import type {
  AutoBuildSettingsQuery,
  AutoBuildSettingsQueryResponse,
} from '../../../_graphql/__generated__/AutoBuildSettingsQuery.graphql.js';
import type { AutoBuildSettingsResetSettingsMutation } from '../../../_graphql/__generated__/AutoBuildSettingsResetSettingsMutation.graphql.js';
import type {
  AutoBuildSettingsUpdateSettingsMutation,
  UpdateAutoBuildSettingsInput, 
} from '../../../_graphql/__generated__/AutoBuildSettingsUpdateSettingsMutation.graphql.js';
import { tribeState } from '../../../_recoil/atoms/tribe.js';
import { CoolDown } from '../../../_shared/components/controls/CoolDown.js';
import type { CoolDown as CoolDownModel } from '../../../models/coolDown.type.js';
import { createOnNumberChanged } from '../../../utils/createOnNumberChanged.js';

type Settings = Omit<AutoBuildSettingsQueryResponse['autoBuildSettings'], 'autoStorage' | 'dualQueue'> & {
  readonly allowAutoGranary: boolean;
  readonly allowAutoWarehouse: boolean;
  readonly allowFreeSpots: boolean;
  readonly autoGranaryOverflowLevel: number;
  readonly autoWarehouseOverflowLevel: number;

  readonly allowDualQueue: boolean;
  readonly dualQueuePreference: AutoBuildSettingsQueryResponse['autoBuildSettings']['dualQueue']['preference'];
};

const getStateFromSettings = (settings: AutoBuildSettingsQueryResponse['autoBuildSettings']): Settings => {
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
    dualQueue: { allow: allowDualQueue, preference: dualQueuePreference },
    ...otherSettings
  } = settings;

  return {
    ...otherSettings,
    allowAutoGranary,
    allowAutoWarehouse,
    allowFreeSpots,
    autoGranaryOverflowLevel,
    autoWarehouseOverflowLevel,
    allowDualQueue,
    dualQueuePreference,
  };
};

const getSettingsFromState = (
  state: Settings,
): UpdateAutoBuildSettingsInput => {
  const {
    allowAutoGranary,
    allowAutoWarehouse,
    allowFreeSpots,
    autoGranaryOverflowLevel,
    autoWarehouseOverflowLevel,
    allowDualQueue,
    dualQueuePreference,
    ...otherState
  } = state;

  return {
    ...otherState,
    dualQueue: {
      allow: allowDualQueue,
      preference: dualQueuePreference,
    },
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
  };
};

type Props = {
  readonly villageId: string;
};

const autoBuildSettingsQuery = graphql`
  query AutoBuildSettingsQuery($villageId: ID!) {
      autoBuildSettings(villageId: $villageId) {
          allow
          autoCropFields
          autoStorage {
              allowFreeSpots
              granary {
                  allow
                  overflowLevel
              } 
              warehouse {
                  allow
                  overflowLevel
              }
          }
          coolDown {
              ...CoolDown @relay(mask: false)
          }
          dualQueue {
              allow
              preference
          }
          minCrop
          useHeroResources
      }
  }
`;

const autoBuildSettingsUpdateSettingsMutation = graphql`
  mutation AutoBuildSettingsUpdateSettingsMutation($villageId: ID!, $settings: UpdateAutoBuildSettingsInput!) {
      updateAutoBuildSettings(villageId: $villageId, settings: $settings) {
          ...AutoBuildSettings
      }
  }
`;

const autoBuildSettingsResetSettingsMutation = graphql`
    mutation AutoBuildSettingsResetSettingsMutation($villageId: ID!) {
        resetAutoBuildSettings(villageId: $villageId) {
            ...AutoBuildSettings
        }
    }
`;

export const AutoBuildSettings: React.FC<Props> = ({ villageId }) => {
  const { autoBuildSettings } = useLazyLoadQuery<AutoBuildSettingsQuery>(autoBuildSettingsQuery, { villageId });
  const [updateSettings] = useMutation<AutoBuildSettingsUpdateSettingsMutation>(autoBuildSettingsUpdateSettingsMutation);
  const [resetSettings] = useMutation<AutoBuildSettingsResetSettingsMutation>(autoBuildSettingsResetSettingsMutation);

  const [state, setState] = useState<Settings>(getStateFromSettings(autoBuildSettings));
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (autoBuildSettings) {
      setState(getStateFromSettings(autoBuildSettings));
      setHasChanges(false);
    }
  }, [autoBuildSettings]);

  useEffect(() => {
    if (state && hasChanges) {
      updateSettings({
        variables: { villageId, settings: getSettingsFromState(state) },
        updater: (store) => {
          const newRecord = store.getRootField('updateAutoBuildSettings');
          store.getRoot().setLinkedRecord(newRecord, 'autoBuildSettings', { villageId });
        },
      });
    }
  }, [state, hasChanges, updateSettings, villageId]);

  const onCoolDownChange = useCallback(
    (updatedCoolDown: CoolDownModel): void => {
      setState(
        (prevState) =>
          prevState && {
            ...prevState,
            coolDown: updatedCoolDown,
          },
      );
      setHasChanges(true);
    },
    [],
  );

  const tribe = useRecoilValue(tribeState);
  const isRoman = tribe === 'Romans';

  const onReset = () => {
    resetSettings({
      variables: { villageId },
      updater: (store) => {
        const newRecord = store.getRootField('resetAutoBuildSettings');
        store.getRoot().setLinkedRecord(newRecord, 'autoBuildSettings', { villageId });
      },
    });
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { checked, name } = e.currentTarget;

    setState(
      (prevState) =>
        prevState && {
          ...prevState,
          [name]: checked,
        },
    );
    setHasChanges(true);
  };

  const {
    allow,
    allowAutoGranary,
    allowAutoWarehouse,
    allowDualQueue,
    dualQueuePreference,
    allowFreeSpots,
    autoCropFields,
    autoGranaryOverflowLevel,
    autoWarehouseOverflowLevel,
    coolDown,
    minCrop,
    useHeroResources,
  } = state;

  const updateState = <TValue extends unknown>(name: string, value: TValue) => {
    setState(
      (prevState) =>
        prevState && {
          ...prevState,
          [name]: value,
        },
    );
    setHasChanges(true);
  };

  const onMinCropChanged = createOnNumberChanged({
    callback: updateState,
    minValue: 0,
  });

  const onOverflowLevelChanged = createOnNumberChanged({
    callback: updateState,
    maxValue: 100,
    minValue: 0,
  });

  const onPreferenceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;

    setState((prevState) => prevState && { ...prevState, [name]: value });
    setHasChanges(true);
  };

  return (
    <div>
      <Button
        color="primary"
        onClick={onReset}
        type="button"
        variant="contained">
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

      {isRoman && (
        <>
          <div>
            <label htmlFor="allowDualQueue">Allow dual queue</label>
            <input
              checked={allowDualQueue}
              id="allowDualQueue"
              name="allowDualQueue"
              onChange={onChange}
              type="checkbox"
            />
          </div>

          <div>
            <label htmlFor="dualQueuePreference">Dual queue preference</label>
            <select
              id="dualQueuePreference"
              name="dualQueuePreference"
              value={dualQueuePreference}
              onChange={onPreferenceChange}>
              {/*TODO*/}
              {['Resources', 'Infrastructure'].map((preference) => (
                <option
                  key={preference}
                  value={preference}
                  label={preference}
                />
              ))}
            </select>
          </div>
        </>
      )}

      <div>
        <label>Cooldown</label>
        <CoolDown onChange={onCoolDownChange} value={coolDown} />
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
        <label htmlFor="allowFreeSpots">
          Allow auto buildings on new spots
        </label>
        <input
          checked={allowFreeSpots}
          id="allowFreeSpots"
          name="allowFreeSpots"
          onChange={onChange}
          type="checkbox"
        />
      </div>

      <div>
        <label htmlFor="useHeroResources">Use hero resources</label>
        <input
          checked={useHeroResources}
          id="useHeroResources"
          name="useHeroResources"
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
