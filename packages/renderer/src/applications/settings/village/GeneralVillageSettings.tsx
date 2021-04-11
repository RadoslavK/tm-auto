import { Button } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React, {
  useEffect,
  useState, 
} from 'react';
import { useMutation } from 'react-relay/hooks';

import type { GeneralVillageSettingsQuery } from '../../../_graphql/__generated__/GeneralVillageSettingsQuery.graphql.js';
import type { GeneralVillageSettingsResetSettingsMutation } from '../../../_graphql/__generated__/GeneralVillageSettingsResetSettingsMutation.graphql.js';
import type { GeneralVillageSettingsUpdateSettingsMutation } from '../../../_graphql/__generated__/GeneralVillageSettingsUpdateSettingsMutation.graphql.js';
import { useLazyLoadQuery } from '../../../_shared/hooks/useLazyLoadQuery.js';

type Props = {
  readonly villageId: string;
};

graphql`
    fragment GeneralVillageSettings_generalVillageSettings on GeneralVillageSettings {
        allowTasks
    }
`;

const query = graphql`
    query GeneralVillageSettingsQuery($villageId: ID!) {
        generalVillageSettings(villageId: $villageId) {
            ...GeneralVillageSettings_generalVillageSettings @relay(mask: false)
        }
    }
`;

const generalVillageSettingsUpdateSettingsMutation = graphql`
  mutation GeneralVillageSettingsUpdateSettingsMutation($villageId: ID!, $settings: UpdateGeneralVillageSettingsInput!) {
      updateGeneralVillageSettings(villageId: $villageId, settings: $settings) {
          ...GeneralVillageSettings_generalVillageSettings
      }
  }
`;

const generalVillageSettingsResetSettingsMutation = graphql`
    mutation GeneralVillageSettingsResetSettingsMutation($villageId: ID!) {
        resetGeneralVillageSettings(villageId: $villageId) {
            ...GeneralVillageSettings_generalVillageSettings
        }
    }
`;

export const GeneralVillageSettings: React.FC<Props> = ({ villageId }) => {
  const { generalVillageSettings } = useLazyLoadQuery<GeneralVillageSettingsQuery>(query, { villageId }, { fetchPolicy: 'store-and-network' });
  const [updateSettings] = useMutation<GeneralVillageSettingsUpdateSettingsMutation>(generalVillageSettingsUpdateSettingsMutation);
  const [resetSettings] = useMutation<GeneralVillageSettingsResetSettingsMutation>(generalVillageSettingsResetSettingsMutation);

  const [state, setState] = useState({
    allowTasks: generalVillageSettings.allowTasks,
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setState({
      allowTasks: generalVillageSettings.allowTasks,
    });
    setHasChanges(false);
  }, [generalVillageSettings]);

  useEffect(() => {
    if (hasChanges) {
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

    setState((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    setHasChanges(true);
  };

  const onReset = () => {
    resetSettings({
      variables: { villageId },
      updater: (store) => {
        const newRecord = store.getRootField('resetGeneralVillageSettings');
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

GeneralVillageSettings.displayName = 'GeneralVillageSettings';