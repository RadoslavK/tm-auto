import { Button } from '@material-ui/core';
import React, {
  useEffect,
  useState,
} from 'react';

import {
  GetGeneralVillageSettingsDocument,
  GetGeneralVillageSettingsQuery,
  GetGeneralVillageSettingsQueryVariables,
  UpdateGeneralVillageSettingsInput,
  useGetGeneralVillageSettingsQuery,
  useResetGeneralVillageSettingsMutation,
  useUpdateGeneralVillageSettingsMutation,
} from '../../../_graphql/graphqlHooks';
import { updateQueryCache } from '../../../../../server/utils/graphql';
import { useVillageSettingsContext } from './context/villageSettingsContext';

const useGeneralVillageSettings = () => {
  const { villageId } = useVillageSettingsContext();

  const { data: queryData, loading: queryLoading } = useGetGeneralVillageSettingsQuery({ variables: { villageId } });

  const [updateSettings] = useUpdateGeneralVillageSettingsMutation({
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      updateQueryCache<GetGeneralVillageSettingsQuery, GetGeneralVillageSettingsQueryVariables>({
        query: GetGeneralVillageSettingsDocument,
        cache,
        data: { generalVillageSettings: data.updateGeneralVillageSettings },
        variables: { villageId },
      });
    },
  });

  const [resetSettings] = useResetGeneralVillageSettingsMutation({
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      updateQueryCache<GetGeneralVillageSettingsQuery, GetGeneralVillageSettingsQueryVariables>({
        query: GetGeneralVillageSettingsDocument,
        cache,
        data: { generalVillageSettings: data.resetGeneralVillageSettings },
        variables: { villageId },
      });
    },
  });

  return {
    settings: queryLoading || !queryData
      ? null
      : queryData.generalVillageSettings,
    updateSettings,
    resetSettings,
  };
};

export const GeneralVillageSettings: React.FC = () => {
  const {
    resetSettings,
    settings,
    updateSettings,
  } = useGeneralVillageSettings();

  const { villageId } = useVillageSettingsContext();

  const [state, setState] = useState<UpdateGeneralVillageSettingsInput>();
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (settings) {
      setState({
        allowTasks: settings.allowTasks,
      });
      setHasChanges(false);
    }
  }, [settings]);

  useEffect(() => {
    if (state && hasChanges) {
      updateSettings({ variables: { villageId, settings: state } });
    }
  }, [hasChanges, state, updateSettings, villageId]);

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const {
      checked,
      name,
    } = e.currentTarget;

    setState(prevState => prevState && ({
      ...prevState,
      [name]: checked,
    }));
    setHasChanges(true);
  };

  if (!state) {
    return null;
  }

  const onReset = () => {
    resetSettings({ variables: { villageId } });
  };

  const {
    allowTasks,
  } = state;

  return (
    <div>
      <Button
        color="primary"
        onClick={onReset}
        type="button"
        variant="contained"
      >
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
