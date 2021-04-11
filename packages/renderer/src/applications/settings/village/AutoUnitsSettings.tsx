import { Button } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useCallback,
  useEffect,
  useState, 
} from 'react';
import { useMutation } from 'react-relay/hooks';

import type { AutoUnitsSettingsQuery } from '../../../_graphql/__generated__/AutoUnitsSettingsQuery.graphql.js';
import type { AutoUnitsSettingsResetSettingsMutation } from '../../../_graphql/__generated__/AutoUnitsSettingsResetSettingsMutation.graphql.js';
import type { AutoUnitsSettingsUpdateSettingsMutation } from '../../../_graphql/__generated__/AutoUnitsSettingsUpdateSettingsMutation.graphql.js';
import { CoolDown } from '../../../_shared/components/controls/CoolDown.js';
import { useLazyLoadQuery } from '../../../_shared/hooks/useLazyLoadQuery.js';
import type { CoolDown as CoolDownModel } from '../../../models/coolDown.type.js';
import { createOnNumberChanged } from '../../../utils/createOnNumberChanged.js';

type Props = {
  readonly villageId: string;
};

graphql`
    fragment AutoUnitsSettings_autoUnitsSettings on AutoUnitsSettings {
        allow
        coolDown {
            ...CoolDown @relay(mask: false)
        }
        minCrop
        useHeroResources
    }
`;

const query = graphql`
    query AutoUnitsSettingsQuery($villageId: ID!) {
        autoUnitsSettings(villageId: $villageId) {
            ...AutoUnitsSettings_autoUnitsSettings @relay(mask: false)
        }
    }
`;

const autoUnitsSettingsUpdateSettingsMutation = graphql`
  mutation AutoUnitsSettingsUpdateSettingsMutation($villageId: ID!, $settings: UpdateAutoUnitsSettingsInput!) {
      updateAutoUnitsSettings(villageId: $villageId, settings: $settings) {
          ...AutoUnitsSettings_autoUnitsSettings
          ...Units_autoUnitsSettings
      }
  }
`;

const autoUnitsSettingsResetSettingsMutation = graphql`
    mutation AutoUnitsSettingsResetSettingsMutation($villageId: ID!) {
        resetAutoUnitsSettings(villageId: $villageId) {
            ...AutoUnitsSettings_autoUnitsSettings
            ...Units_autoUnitsSettings
        }
    }
`;

export const AutoUnitsSettings: React.FC<Props> = ({ villageId }) => {
  const { autoUnitsSettings } = useLazyLoadQuery<AutoUnitsSettingsQuery>(query, { villageId }, { fetchPolicy: 'store-and-network' });
  const [updateSettings] = useMutation<AutoUnitsSettingsUpdateSettingsMutation>(autoUnitsSettingsUpdateSettingsMutation);
  const [resetSettings] = useMutation<AutoUnitsSettingsResetSettingsMutation>(autoUnitsSettingsResetSettingsMutation);

  const [state, setState] = useState(autoUnitsSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setState({
      allow: autoUnitsSettings.allow,
      coolDown: autoUnitsSettings.coolDown,
      minCrop: autoUnitsSettings.minCrop,
      useHeroResources: autoUnitsSettings.useHeroResources,
    });
    setHasChanges(false);
  }, [autoUnitsSettings]);

  useEffect(() => {
    if (hasChanges) {
      updateSettings({
        variables: { villageId, settings: state },
        updater: (store) => {
          const record = store.getRoot().getLinkedRecord('autoUnitsSettings', { villageId });
          const newRecord = store.getRootField('updateAutoUnitsSettings');

          record?.copyFieldsFrom(newRecord);
        },
      });
    }
  }, [state, hasChanges, updateSettings, villageId]);

  const onCoolDownChange = useCallback((coolDown: CoolDownModel): void => {
    setState((prevState) => ({
      ...prevState,
      coolDown,
    }));
    setHasChanges(true);
  }, []);

  const onReset = () => {
    resetSettings({
      variables: { villageId },
      updater: (store) => {
        const record = store.getRoot().getLinkedRecord('autoUnitsSettings', { villageId });
        const newRecord = store.getRootField('resetAutoUnitsSettings');

        record?.copyFieldsFrom(newRecord);
      },
    });
  };

  const { allow, coolDown, minCrop, useHeroResources } = state;

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { checked, name } = e.currentTarget;

    setState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    setHasChanges(true);
  };

  const onNumberChange = createOnNumberChanged({
    callback: (name, value) => {
      setState((prevState) => ({
        ...prevState,
        [name]: +value,
      }));
      setHasChanges(true);
    },
    minValue: 0,
  });

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
        <label>Cooldown</label>
        <CoolDown onChange={onCoolDownChange} value={coolDown} />
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

AutoUnitsSettings.displayName = 'AutoUnitsSettings';