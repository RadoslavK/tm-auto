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

import type { AutoSmithySettingsQuery } from '../../../_graphql/__generated__/AutoSmithySettingsQuery.graphql.js';
import type { AutoSmithySettingsResetMutation } from '../../../_graphql/__generated__/AutoSmithySettingsResetMutation.graphql.js';
import type { AutoSmithySettingsUpdateMutation } from '../../../_graphql/__generated__/AutoSmithySettingsUpdateMutation.graphql.js';
import { CoolDown } from '../../../_shared/components/controls/CoolDown.js';

type Props = {
  readonly villageId: string;
  readonly queryRef: PreloadedQuery<AutoSmithySettingsQuery>;
};

graphql`
    fragment AutoSmithySettings_autoSmithyUnitLevelSettings on AutoSmithyUnitLevelSettings {
        targetLevel
        minTroops
    }
`;

graphql`
  fragment AutoSmithySettings_autoSmithyUnitSettings on AutoSmithyUnitSettings {
      unitIndex
      levels {
          ...AutoSmithySettings_autoSmithyUnitLevelSettings @relay(mask: false)
      }
  }
`;

graphql`
    fragment AutoSmithySettings_autoSmithySettings on AutoSmithySettings {
        allow
        coolDown {
            ...CoolDown @relay(mask: false)
        }
        useHeroResources
        units {
            ...AutoSmithySettings_autoSmithyUnitSettings @relay(mask: false)
        }
    }
`;

export const autoSmithySettingsQuery = graphql`
    query AutoSmithySettingsQuery($villageId: ID!) {
        autoSmithySettings(villageId: $villageId) {
            ...AutoSmithySettings_autoSmithySettings @relay(mask: false)
        }
    }
`;

const updateMutation = graphql`
    mutation AutoSmithySettingsUpdateMutation($villageId: ID!, $settings: AutoSmithySettingsInput!) {
        updateAutoSmithySettings(villageId: $villageId, settings: $settings) {
            ...AutoSmithySettings_autoSmithySettings
        }
    }
`;

const resetMutation = graphql`
    mutation AutoSmithySettingsResetMutation($villageId: ID!) {
        resetAutoSmithySettings(villageId: $villageId) {
            ...AutoSmithySettings_autoSmithySettings
        }
    }
`;

export const AutoSmithySettings: React.FC<Props> = ({ villageId, queryRef }) => {
  const { autoSmithySettings } = usePreloadedQuery(autoSmithySettingsQuery, queryRef);
  const [updateSettings] = useMutation<AutoSmithySettingsUpdateMutation>(updateMutation);
  const [resetSettings] = useMutation<AutoSmithySettingsResetMutation>(resetMutation);

  const [state, setState] = useState(autoSmithySettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setState(autoSmithySettings);
    setHasChanges(false);
  }, [autoSmithySettings]);

  useEffect(() => {
    if (!hasChanges) {
      return;
    }

    updateSettings({
      variables: { villageId, settings: state },
      updater: (store) => {
        const newRecord = store.getRootField('updateAutoSmithySettings');
        store.getRoot().setLinkedRecord(newRecord, 'autoSmithySettings', { villageId });
      },
    });
  }, [hasChanges, state, updateSettings, villageId]);

  const onReset = () => {
    resetSettings({
      variables: { villageId },
      updater: (store) => {
        const newRecord = store.getRootField('resetAutoSmithySettings');
        store.getRoot().setLinkedRecord(newRecord, 'autoSmithySettings', { villageId });
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

AutoSmithySettings.displayName = 'AutoSmithySettings';