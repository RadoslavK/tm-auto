import { Button } from '@material-ui/core';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  CoolDown as CoolDownModel,
  GetAccountSettingsDocument,
  GetAccountSettingsQuery,
  GetAccountSettingsQueryVariables,
  UpdateAccountSettingsInput,
  useGetAccountSettingsQuery,
  useResetAccountSettingsMutation,
  useUpdateAccountSettingsMutation,
} from '../../_graphql/graphqlHooks';
import { CoolDown } from '../../_shared/components/controls/CoolDown';
import { updateQueryCache } from '../../../../server/utils/graphql';

const useAccountSettings = () => {
  const { data: queryData, loading: queryLoading } = useGetAccountSettingsQuery();

  const [updateSettings] = useUpdateAccountSettingsMutation({
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      updateQueryCache<GetAccountSettingsQuery, GetAccountSettingsQueryVariables>({
        query: GetAccountSettingsDocument,
        cache,
        data: { accountSettings: data.updateAccountSettings },
      });
    },
  });

  const [resetSettings] = useResetAccountSettingsMutation({
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      updateQueryCache<GetAccountSettingsQuery, GetAccountSettingsQueryVariables>({
        query: GetAccountSettingsDocument,
        cache,
        data: { accountSettings: data.resetAccountSettings },
      });
    },
  });

  return {
    settings: queryLoading || !queryData
      ? null
      : queryData.accountSettings,
    updateSettings,
    resetSettings,
  };
};

export const AccountSettings: React.FC = () => {
  const [state, setState] = useState<UpdateAccountSettingsInput>();
  const [hasChanges, setHasChanges] = useState(false);

  const {
    resetSettings,
    settings,
    updateSettings,
  } = useAccountSettings();

  useEffect(() => {
    if (settings) {
      setState(settings);
      setHasChanges(false);
    }
  }, [settings]);

  useEffect(() => {
    if (state && hasChanges) {
      updateSettings({ variables: { settings: state } });
    }
  }, [hasChanges, state, updateSettings]);

  const onCoolDownChange = useCallback((updatedCoolDown: CoolDownModel): void => {
    setState(prevState => prevState && ({
      ...prevState,
      tasksCoolDown: updatedCoolDown,
    }));
    setHasChanges(true);
  }, []);

  if (!state) {
    return null;
  }

  const onReset = () => {
    resetSettings();
  };

  const onCheckboxChange = (e: React.FormEvent<HTMLInputElement>) => {
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

  const {
    allowTasks,
    autoBuild,
    autoParty,
    autoStart,
    autoUnits,
    tasksCoolDown,
  } = state;

  return (
    <div>
      <h1>Account settings</h1>
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
          <label htmlFor="autoStart">Start after sign in</label>
          <input
            checked={autoStart}
            id="autoStart"
            name="autoStart"
            onChange={onCheckboxChange}
            type="checkbox"
          />
        </div>

        <h2>Tasks</h2>

        <div>
          <label htmlFor="allowTasks">Allow tasks</label>
          <input
            checked={allowTasks}
            id="allowTasks"
            name="allowTasks"
            onChange={onCheckboxChange}
            type="checkbox"
          />
        </div>

        <div>
          <label>Cooldown</label>
          <CoolDown
            onChange={onCoolDownChange}
            value={tasksCoolDown}
          />
        </div>

        <div>
          <label htmlFor="autoBuild">Auto Build</label>
          <input
            checked={autoBuild}
            id="autoBuild"
            name="autoBuild"
            onChange={onCheckboxChange}
            type="checkbox"
          />
        </div>

        <div>
          <label htmlFor="autoUnits">Auto Units</label>
          <input
            checked={autoUnits}
            id="autoUnits"
            name="autoUnits"
            onChange={onCheckboxChange}
            type="checkbox"
          />
        </div>

        <div>
          <label htmlFor="autoParty">Auto Party</label>
          <input
            checked={autoParty}
            id="autoParty"
            name="autoParty"
            onChange={onCheckboxChange}
            type="checkbox"
          />
        </div>
      </div>
    </div>
  );
};