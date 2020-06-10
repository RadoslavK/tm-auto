import { Button } from '@material-ui/core';
import React, {
  useEffect,
  useState,
} from 'react';

import {
  GetAutoMentorSettingsDocument,
  GetAutoMentorSettingsQuery,
  GetAutoMentorSettingsQueryVariables,
  UpdateAutoMentorSettingsInput,
  useGetAutoMentorSettingsQuery,
  useResetAutoMentorSettingsMutation,
  useUpdateAutoMentorSettingsMutation,
} from '../../_graphql/graphqlHooks';
import { updateQueryCache } from '../../../../server/utils/graphql';

const useAutoMentorSettings = () => {
  const { data: queryData, loading: queryLoading } = useGetAutoMentorSettingsQuery();

  const [updateSettings] = useUpdateAutoMentorSettingsMutation({
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      updateQueryCache<GetAutoMentorSettingsQuery, GetAutoMentorSettingsQueryVariables>({
        cache,
        query: GetAutoMentorSettingsDocument,
        data: { autoMentorSettings: data.updateAutoMentorSettings },
      });
    },
  });

  const [resetSettings] = useResetAutoMentorSettingsMutation({
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      updateQueryCache<GetAutoMentorSettingsQuery, GetAutoMentorSettingsQueryVariables>({
        cache,
        query: GetAutoMentorSettingsDocument,
        data: { autoMentorSettings: data.resetAutoMentorSettings },
      });
    },
  });

  return {
    settings: queryLoading || !queryData
      ? null
      : queryData.autoMentorSettings,
    updateSettings,
    resetSettings,
  };
};

export const AutoMentorSettings: React.FC = () => {
  const [state, setState] = useState<UpdateAutoMentorSettingsInput>();
  const [hasChanges, setHasChanges] = useState(false);

  const {
    resetSettings,
    settings,
    updateSettings,
  } = useAutoMentorSettings();

  useEffect(() => {
    if (settings) {
      setState(settings);
    }
  }, [settings]);

  useEffect(() => {
    if (state && hasChanges) {
      updateSettings({ variables: { settings: state } });
    }
  }, [state, hasChanges, updateSettings]);

  if (!state) {
    return null;
  }

  const onCheckBoxChange = async (e: React.FormEvent<HTMLInputElement>): Promise<void> => {
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

  const onReset = () => {
    resetSettings();
  };

  return (
    <div>
      <h1>General settings</h1>
      <div>
        <Button
          color="primary"
          onClick={onReset}
          type="button"
          variant="contained"
        >
          Reset to default
        </Button>
      </div>
      <div>
        <div>
          <label htmlFor="acceptTaskRewards">Accept task rewards</label>
          <input
            checked={state.acceptTaskRewards}
            id="acceptTaskRewards"
            name="acceptTaskRewards"
            onChange={onCheckBoxChange}
            type="checkbox"
          />
        </div>
        <div>
          <label htmlFor="acceptDailyRewards">Accept daily rewards</label>
          <input
            checked={state.acceptDailyRewards}
            id="acceptDailyRewards"
            name="acceptDailyRewards"
            onChange={onCheckBoxChange}
            type="checkbox"
          />
        </div>
      </div>
    </div>
  );
};