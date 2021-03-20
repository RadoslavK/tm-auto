import Button from '@material-ui/core/Button';
import graphql from 'babel-plugin-relay/macro';
import React, { useEffect, useState } from 'react';
import {
  useLazyLoadQuery,
  useMutation,
} from 'react-relay/hooks';
import { GeneralSettingsFormQuery } from '../../_graphql/__generated__/GeneralSettingsFormQuery.graphql.js';
import { GeneralSettingsFormResetSettingsMutation } from '../../_graphql/__generated__/GeneralSettingsFormResetSettingsMutation.graphql.js';
import { GeneralSettingsFormUpdateSettingsMutation } from '../../_graphql/__generated__/GeneralSettingsFormUpdateSettingsMutation.graphql.js';

const generalSettingsFormQuery = graphql`
  query GeneralSettingsFormQuery {
      generalSettings {
          chromePath
          headlessChrome
      }
  }
`;

const generalSettingsFormUpdateSettingsMutation = graphql`
  mutation GeneralSettingsFormUpdateSettingsMutation($settings: UpdateGeneralSettingsInput!) {
      updateGeneralSettings(settings: $settings) {
          chromePath
      }
  }
`;

const generalSettingsFormResetSettingsMutation = graphql`
    mutation GeneralSettingsFormResetSettingsMutation {
        resetGeneralSettings {
            chromePath
        }
    }
`;

export const GeneralSettingsForm: React.FunctionComponent = () => {
  const { generalSettings } = useLazyLoadQuery<GeneralSettingsFormQuery>(generalSettingsFormQuery, {});
  const [updateSettings] = useMutation<GeneralSettingsFormUpdateSettingsMutation>(generalSettingsFormUpdateSettingsMutation);
  const [resetSettings] = useMutation<GeneralSettingsFormResetSettingsMutation>(generalSettingsFormResetSettingsMutation);

  const [state, setState] = useState(generalSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (generalSettings) {
      setState(generalSettings);
      setHasChanges(false);
    }
  }, [generalSettings]);

  useEffect(() => {
    if (state && hasChanges) {
      updateSettings({ variables: { settings: state } });
    }
  }, [state, hasChanges, updateSettings]);

  const onTextChanges = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setState((prevState) => prevState && { ...prevState, [name]: value });
    setHasChanges(true);
  };

  const onBoolChanges = (e: React.FormEvent<HTMLInputElement>) => {
    const { checked, name } = e.currentTarget;

    setState((prevState) => prevState && { ...prevState, [name]: checked });
    setHasChanges(true);
  };

  const onReset = () => {
    resetSettings({ variables: {} });
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
