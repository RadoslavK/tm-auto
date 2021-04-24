import {
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
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

import type { GeneralVillageSettingsQuery } from '../../../_graphql/__generated__/GeneralVillageSettingsQuery.graphql.js';
import type { GeneralVillageSettingsResetSettingsMutation } from '../../../_graphql/__generated__/GeneralVillageSettingsResetSettingsMutation.graphql.js';
import type { GeneralVillageSettingsUpdateSettingsMutation } from '../../../_graphql/__generated__/GeneralVillageSettingsUpdateSettingsMutation.graphql.js';

type Props = {
  readonly villageId: string;
  readonly queryRef: PreloadedQuery<GeneralVillageSettingsQuery>;
};

graphql`
    fragment GeneralVillageSettings_generalVillageSettings on GeneralVillageSettings {
        allowTasks
    }
`;

export const generalVillageSettingsQuery = graphql`
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
            ...GeneralVillageOverview_generalVillageSettings
        }
    }
`;

export const GeneralVillageSettings: React.FC<Props> = ({ villageId, queryRef }) => {
  const { generalVillageSettings } = usePreloadedQuery(generalVillageSettingsQuery, queryRef);
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

  const onUpdade = <Prop extends keyof typeof state>(prop: Prop, value: typeof state[Prop]) => {
    setState(prevState => ({
      ...prevState,
      [prop]: value,
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
        <FormControlLabel
          label="Allow tasks"
          control={(
            <Checkbox
              checked={allowTasks}
              onChange={e => onUpdade('allowTasks', e.currentTarget.checked)}
            />
          )}
        />
      </div>
    </div>
  );
};

GeneralVillageSettings.displayName = 'GeneralVillageSettings';