import { Button } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useEffect,
  useState, 
} from 'react';
import {
  useLazyLoadQuery,
  useMutation,
} from 'react-relay/hooks';

import type { GeneralVillageSettingsQuery } from '../../../_graphql/__generated__/GeneralVillageSettingsQuery.graphql.js';
import type { GeneralVillageSettingsResetSettingsMutation } from '../../../_graphql/__generated__/GeneralVillageSettingsResetSettingsMutation.graphql.js';
import type { GeneralVillageSettingsUpdateSettingsMutation } from '../../../_graphql/__generated__/GeneralVillageSettingsUpdateSettingsMutation.graphql.js';

type Props = {
  readonly villageId: string;
};

const generalVillageSettingsQuery = graphql`
  query GeneralVillageSettingsQuery($villageId: ID!) {
      generalVillageSettings(villageId: $villageId) {
          allowTasks
      }
  }
`;

const generalVillageSettingsUpdateSettingsMutation = graphql`
  mutation GeneralVillageSettingsUpdateSettingsMutation($villageId: ID!, $settings: UpdateGeneralVillageSettingsInput!) {
      updateGeneralVillageSettings(villageId: $villageId, settings: $settings) {
          ...GeneralVillageSettings
      }
  }
`;

const generalVillageSettingsResetSettingsMutation = graphql`
    mutation GeneralVillageSettingsResetSettingsMutation($villageId: ID!) {
        resetGeneralVillageSettings(villageId: $villageId) {
            ...GeneralVillageSettings
        }
    }
`;

export const GeneralVillageSettings: React.FC<Props> = ({ villageId }) => {
  const { generalVillageSettings } = useLazyLoadQuery<GeneralVillageSettingsQuery>(generalVillageSettingsQuery, { villageId });
  const [updateSettings] = useMutation<GeneralVillageSettingsUpdateSettingsMutation>(generalVillageSettingsUpdateSettingsMutation);
  const [resetSettings] = useMutation<GeneralVillageSettingsResetSettingsMutation>(generalVillageSettingsResetSettingsMutation);

  const [state, setState] = useState(generalVillageSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (generalVillageSettings) {
      setState({
        allowTasks: generalVillageSettings.allowTasks,
      });
      setHasChanges(false);
    }
  }, [generalVillageSettings]);

  useEffect(() => {
    if (state && hasChanges) {
      updateSettings({
        variables: { villageId, settings: state },
        updater: (store) => {
          const newRecord = store.getRootField('updateGeneralVillageSettings');
          store.getRoot().setLinkedRecord(newRecord, 'generalVillageSettings', { villageId });
        },
      });
    }
  }, [hasChanges, state, updateSettings, villageId]);

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

  if (!state) {
    return null;
  }

  const onReset = () => {
    resetSettings({
      variables: { villageId },
      updater: (store) => {
        const newRecord = store.getRootField('updateGeneralVillageSettings');
        store.getRoot().setLinkedRecord(newRecord, 'generalVillageSettings', { villageId });
      },
    });
  };

  const { allowTasks } = state;

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
        <label htmlFor="allowTasks">Allow tasks</label>
        <input
          checked={allowTasks}
          id="allowTasks"
          name="allowTasks"
          onChange={onChange}
          type="checkbox"
        />
      </div>
    </div>
  );
};
