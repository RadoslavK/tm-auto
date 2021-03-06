import { Button } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useCallback,
  useEffect,
  useState, 
} from 'react';
import {
  PreloadedQuery,
  useMutation,
  usePreloadedQuery,
} from 'react-relay/hooks';

import type { AutoPartySettingsQuery } from '../../../_graphql/__generated__/AutoPartySettingsQuery.graphql.js';
import type { AutoPartySettingsResetSettingsMutation } from '../../../_graphql/__generated__/AutoPartySettingsResetSettingsMutation.graphql.js';
import type { AutoPartySettingsUpdateSettingsMutation } from '../../../_graphql/__generated__/AutoPartySettingsUpdateSettingsMutation.graphql.js';
import { CoolDown } from '../../../_shared/components/controls/CoolDown.js';
import type { CoolDown as CoolDownModel } from '../../../models/coolDown.type.js';

type Props = {
  readonly villageId: string;
  readonly queryRef: PreloadedQuery<AutoPartySettingsQuery>;
};

graphql`
    fragment AutoPartySettings_autoPartySettings on AutoPartySettings {
        allowLarge
        allowSmall
        coolDown {
            ...CoolDown @relay(mask: false)
        }
        useHeroResources
    }
`;

export const autoPartySettingsQuery = graphql`
    query AutoPartySettingsQuery($villageId: ID!) {
        autoPartySettings(villageId: $villageId) {
            ...AutoPartySettings_autoPartySettings @relay(mask: false)
        }
    }
`;

const autoPartySettingsUpdateSettingsMutation = graphql`
  mutation AutoPartySettingsUpdateSettingsMutation($villageId: ID!, $settings: UpdateAutoPartySettingsInput!) {
      updateAutoPartySettings(villageId: $villageId, settings: $settings) {
          ...AutoPartySettings_autoPartySettings
      }
  }
`;

const autoPartySettingsResetSettingsMutation = graphql`
    mutation AutoPartySettingsResetSettingsMutation($villageId: ID!) {
        resetAutoPartySettings(villageId: $villageId) {
            ...AutoPartySettings_autoPartySettings
        }
    }
`;

export const AutoPartySettings: React.FC<Props> = ({ villageId, queryRef }) => {
  const { autoPartySettings } = usePreloadedQuery(autoPartySettingsQuery, queryRef);
  const [updateSettings] = useMutation<AutoPartySettingsUpdateSettingsMutation>(autoPartySettingsUpdateSettingsMutation);
  const [resetSettings] = useMutation<AutoPartySettingsResetSettingsMutation>(autoPartySettingsResetSettingsMutation);

  const [state, setState] = useState(autoPartySettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setState(autoPartySettings);
    setHasChanges(false);
  }, [autoPartySettings]);

  useEffect(() => {
    if (hasChanges) {
      updateSettings({
        variables: { villageId, settings: state },
        updater: (store) => {
          const newRecord = store.getRootField('updateAutoPartySettings');
          store.getRoot().setLinkedRecord(newRecord, 'autoPartySettings', { villageId });
        },
      });
    }
  }, [hasChanges, state, updateSettings, villageId]);

  const onCoolDownChange = useCallback(
    (updatedCooldown: CoolDownModel): void => {
      setState((prevState) => ({
        ...prevState,
        coolDown: updatedCooldown,
      }));
      setHasChanges(true);
    },
    [],
  );

  const onReset = () => {
    resetSettings({
      variables: { villageId },
      updater: (store) => {
        const newRecord = store.getRootField('resetAutoPartySettings');
        store.getRoot().setLinkedRecord(newRecord, 'autoPartySettings', { villageId });
      },
    });
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { checked, name } = e.currentTarget;

    setState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    setHasChanges(true);
  };

  const {
    allowLarge,
    allowSmall,
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
        <label htmlFor="allowSmall">Hold small parties</label>
        <input
          checked={allowSmall}
          id="allowSmall"
          name="allowSmall"
          onChange={onChange}
          type="checkbox"
        />
      </div>

      <div>
        <label htmlFor="allowLarge">Hold large parties</label>
        <input
          checked={allowLarge}
          id="allowLarge"
          name="allowLarge"
          onChange={onChange}
          type="checkbox"
        />
      </div>

      <div>
        <label>Cooldown</label>
        <CoolDown onChange={onCoolDownChange} value={coolDown} />
      </div>
    </div>
  );
};

AutoPartySettings.displayName = 'AutoPartySettings';