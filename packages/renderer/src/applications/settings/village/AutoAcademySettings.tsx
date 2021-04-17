import { Button } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useEffect,
  useState,
} from 'react';
import {
  PreloadedQuery,
  useMutation,
  usePreloadedQuery,
} from 'react-relay/hooks';

import type { AutoAcademySettingsQuery } from '../../../_graphql/__generated__/AutoAcademySettingsQuery.graphql.js';
import type { AutoAcademySettingsResetMutation } from '../../../_graphql/__generated__/AutoAcademySettingsResetMutation.graphql.js';
import type { AutoAcademySettingsUpdateMutation } from '../../../_graphql/__generated__/AutoAcademySettingsUpdateMutation.graphql.js';
import { CoolDown } from '../../../_shared/components/controls/CoolDown.js';

type Props = {
  readonly villageId: string;
  readonly queryRef: PreloadedQuery<AutoAcademySettingsQuery>;
};

graphql`
    fragment AutoAcademySettings_autoAcademySettings on AutoAcademySettings {
        allow
        coolDown {
            ...CoolDown @relay(mask: false)
        }
        useHeroResources
        units
    }
`;

export const autoAcademySettingsQuery = graphql`
    query AutoAcademySettingsQuery($villageId: ID!) {
        autoAcademySettings(villageId: $villageId) {
            ...AutoAcademySettings_autoAcademySettings @relay(mask: false)
        }
    }
`;

const updateMutation = graphql`
    mutation AutoAcademySettingsUpdateMutation($villageId: ID!, $settings: AutoAcademySettingsInput!) {
        updateAutoAcademySettings(villageId: $villageId, settings: $settings) {
            ...AutoAcademySettings_autoAcademySettings
            ...Academy_autoAcademySettings
        }
    }
`;

const resetMutation = graphql`
    mutation AutoAcademySettingsResetMutation($villageId: ID!) {
        resetAutoAcademySettings(villageId: $villageId) {
            ...AutoAcademySettings_autoAcademySettings
            ...Academy_autoAcademySettings
        }
    }
`;

export const AutoAcademySettings: React.FC<Props> = ({ villageId, queryRef }) => {
  const { autoAcademySettings } = usePreloadedQuery(autoAcademySettingsQuery, queryRef);
  const [updateSettings] = useMutation<AutoAcademySettingsUpdateMutation>(updateMutation);
  const [resetSettings] = useMutation<AutoAcademySettingsResetMutation>(resetMutation);

  const [state, setState] = useState(autoAcademySettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setState(autoAcademySettings);
    setHasChanges(false);
  }, [autoAcademySettings]);

  useEffect(() => {
    if (!hasChanges) {
      return;
    }

    updateSettings({
      variables: {
        villageId,
        settings: {
          ...state,
          units: [...state.units],
        },
      },
      updater: (store) => {
        const newRecord = store.getRootField('updateAutoAcademySettings');
        store.getRoot().setLinkedRecord(newRecord, 'autoAcademySettings', { villageId });
      },
    });
  }, [hasChanges, state, updateSettings, villageId]);

  const onReset = () => {
    resetSettings({
      variables: { villageId },
      updater: (store) => {
        const newRecord = store.getRootField('resetAutoAcademySettings');
        store.getRoot().setLinkedRecord(newRecord, 'autoAcademySettings', { villageId });
      },
    });
  };

  const onUpdate = <TProp extends keyof typeof state>(prop: TProp, value: typeof state[TProp]): void => {
    setState(prevState => ({
      ...prevState,
      [prop]: value,
    }));
    setHasChanges(true);
  };

  const {
    allow,
    coolDown,
    useHeroResources,
  } = state;

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
          onChange={e => onUpdate('allow', e.currentTarget.checked)}
          type="checkbox"
        />
      </div>

      <div>
        <label htmlFor="useHeroResources">Use hero resources</label>
        <input
          checked={useHeroResources}
          id="useHeroResources"
          name="useHeroResources"
          onChange={e => onUpdate('useHeroResources', e.currentTarget.checked)}
          type="checkbox"
        />
      </div>

      <div>
        <label>Cooldown</label>
        <CoolDown onChange={cd => onUpdate('coolDown', cd)} value={coolDown} />
      </div>
    </div>
  );
};

AutoAcademySettings.displayName = 'AutoAcademySettings';