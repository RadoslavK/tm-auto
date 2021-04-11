import { Button } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useEffect,
  useState, 
} from 'react';
import {
  useFragment,
  useMutation,
} from 'react-relay/hooks';

import type { GeneralSettingsForm_generalSettings$key } from '../../_graphql/__generated__/GeneralSettingsForm_generalSettings.graphql.js';
import type { GeneralSettingsFormResetSettingsMutation } from '../../_graphql/__generated__/GeneralSettingsFormResetSettingsMutation.graphql.js';
import type { GeneralSettingsFormUpdateSettingsMutation } from '../../_graphql/__generated__/GeneralSettingsFormUpdateSettingsMutation.graphql.js';

const fragmentDef = graphql`
  fragment GeneralSettingsForm_generalSettings on GeneralSettings {
    chromePath
    headlessChrome
  }
`;

const generalSettingsFormUpdateSettingsMutation = graphql`
  mutation GeneralSettingsFormUpdateSettingsMutation($settings: UpdateGeneralSettingsInput!) {
      updateGeneralSettings(settings: $settings) {
          ...GeneralSettingsForm_generalSettings
      }
  }
`;

const generalSettingsFormResetSettingsMutation = graphql`
    mutation GeneralSettingsFormResetSettingsMutation {
        resetGeneralSettings {
            ...GeneralSettingsForm_generalSettings
        }
    }
`;

type Props = {
  readonly settingsKey: GeneralSettingsForm_generalSettings$key;
};

export const GeneralSettingsForm: React.FC<Props> = ({ settingsKey }) => {
  const generalSettings = useFragment(fragmentDef, settingsKey);
  const [updateSettings] = useMutation<GeneralSettingsFormUpdateSettingsMutation>(generalSettingsFormUpdateSettingsMutation);
  const [resetSettings] = useMutation<GeneralSettingsFormResetSettingsMutation>(generalSettingsFormResetSettingsMutation);

  const [state, setState] = useState(generalSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setState(generalSettings);
    setHasChanges(false);
  }, [generalSettings]);

  useEffect(() => {
    if (hasChanges) {
      updateSettings({
        variables: { settings: state },
        updater: (store) => {
          const newRecord = store.getRootField('updateGeneralSettings');
          store.getRoot().setLinkedRecord(newRecord, 'generalSettings');
        },
      });
    }
  }, [state, hasChanges, updateSettings]);

  const onTextChanges = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setState((prevState) => ({ ...prevState, [name]: value }));
    setHasChanges(true);
  };

  const onBoolChanges = (e: React.FormEvent<HTMLInputElement>) => {
    const { checked, name } = e.currentTarget;

    setState((prevState) => ({ ...prevState, [name]: checked }));
    setHasChanges(true);
  };

  const onReset = () => {
    resetSettings({
      variables: {},
      updater: (store) => {
        const newRecord = store.getRootField('resetGeneralSettings');
        store.getRoot().setLinkedRecord(newRecord, 'generalSettings');
      },
    });
  };

  return (
    <div>
      <h1>General Settings</h1>
      <div>
        <Button
          color="primary"
          onClick={onReset}
          type="button"
          variant="contained">
          Reset to default
        </Button>
      </div>

      <div>
        <label htmlFor="headlessChrome">Use headless</label>
        <input
          checked={state.headlessChrome}
          id="headlessChrome"
          name="headlessChrome"
          onChange={onBoolChanges}
          type="checkbox"
        />
      </div>

      <div>
        <label htmlFor="chromePath">Chrome path</label>
        <input
          id="chromePath"
          name="chromePath"
          onChange={onTextChanges}
          value={state.chromePath}
        />
      </div>
    </div>
  );
};

GeneralSettingsForm.displayName = 'GeneralSettingsForm';