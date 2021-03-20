import { Button } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';
import {
  useLazyLoadQuery,
  useMutation,
} from 'react-relay/hooks';
import graphql from 'babel-plugin-relay/macro';

import { CoolDown } from '../../../_shared/components/controls/CoolDown.js';
import { createOnNumberChanged } from '../../../utils/createOnNumberChanged.js';
import type { AutoUnitsSettingsUpdateSettingsMutation } from '../../../_graphql/__generated__/AutoUnitsSettingsUpdateSettingsMutation.graphql.js';
import type { AutoUnitsSettingsQuery } from '../../../_graphql/__generated__/AutoUnitsSettingsQuery.graphql.js';
import type { AutoUnitsSettingsResetSettingsMutation } from '../../../_graphql/__generated__/AutoUnitsSettingsResetSettingsMutation.graphql.js';
import type { CoolDown as CoolDownModel } from '../../../models/coolDown.type.js';

type Props = {
  readonly villageId: string;
};

const autoUnitsSettingsQuery = graphql`
  query AutoUnitsSettingsQuery($villageId: ID!) {
      autoUnitsSettings(villageId: $villageId) {
          allow
          coolDown {
              ...CoolDown @relay(mask: false)
          }
          minCrop
          useHeroResources
      }
  }
`;

const autoUnitsSettingsUpdateSettingsMutation = graphql`
  mutation AutoUnitsSettingsUpdateSettingsMutation($villageId: ID!, $settings: UpdateAutoUnitsSettingsInput!) {
      updateAutoUnitsSettings(villageId: $villageId, settings: $settings) {
          allow
      }
  }
`;

const autoUnitsSettingsResetSettingsMutation = graphql`
    mutation AutoUnitsSettingsResetSettingsMutation($villageId: ID!) {
        resetAutoUnitsSettings(villageId: $villageId) {
            allow
        }
    }
`;

export const AutoUnitsSettings: React.FC<Props> = ({ villageId }) => {
  const { autoUnitsSettings } = useLazyLoadQuery<AutoUnitsSettingsQuery>(autoUnitsSettingsQuery, { villageId });
  const [updateSettings] = useMutation<AutoUnitsSettingsUpdateSettingsMutation>(autoUnitsSettingsUpdateSettingsMutation);
  const [resetSettings] = useMutation<AutoUnitsSettingsResetSettingsMutation>(autoUnitsSettingsResetSettingsMutation);

  const [state, setState] = useState(autoUnitsSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (autoUnitsSettings) {
      setState({
        allow: autoUnitsSettings.allow,
        coolDown: autoUnitsSettings.coolDown,
        minCrop: autoUnitsSettings.minCrop,
        useHeroResources: autoUnitsSettings.useHeroResources,
      });
      setHasChanges(false);
    }
  }, [autoUnitsSettings]);

  useEffect(() => {
    if (state && hasChanges) {
      updateSettings({ variables: { villageId, settings: state } });
    }
  }, [state, hasChanges, updateSettings, villageId]);

  const onCoolDownChange = useCallback((coolDown: CoolDownModel): void => {
    setState(
      (prevState) =>
        prevState && {
          ...prevState,
          coolDown,
        },
    );
    setHasChanges(true);
  }, []);

  const onReset = () => {
    resetSettings({ variables: { villageId } });
  };

  const { allow, coolDown, minCrop, useHeroResources } = state;

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

  const onNumberChange = createOnNumberChanged({
    callback: (name, value) => {
      setState(
        (prevState) =>
          prevState && {
            ...prevState,
            [name]: +value,
          },
      );
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
