import { Button } from '@material-ui/core';
import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';

import {
  CoolDown as CoolDownModel,
  GetAutoUnitsSettingsDocument,
  GetAutoUnitsSettingsQuery,
  GetAutoUnitsSettingsQueryVariables,
  UpdateAutoUnitsSettingsInput,
  useGetAutoUnitsSettingsQuery,
  useResetAutoUnitsSettingsMutation,
  useUpdateAutoUnitsSettingsMutation,
} from '../../../_graphql/graphqlHooks';
import { CoolDown } from '../../../_shared/components/controls/CoolDown';
import { updateQueryCache } from '../../../../../server/utils/graphql';
import { createOnNumberChanged } from '../../../utils/createOnNumberChanged';

export const useAutoUnitsSettings = (villageId: string) => {
  const { data: queryData, loading: queryLoading } = useGetAutoUnitsSettingsQuery({ variables: { villageId } });

  const [updateSettings] = useUpdateAutoUnitsSettingsMutation({
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      updateQueryCache<GetAutoUnitsSettingsQuery, GetAutoUnitsSettingsQueryVariables>({
        query: GetAutoUnitsSettingsDocument,
        cache,
        data: { autoUnitsSettings: data.updateAutoUnitsSettings },
        variables: { villageId },
      });
    },
  });

  const [resetSettings] = useResetAutoUnitsSettingsMutation({
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      updateQueryCache<GetAutoUnitsSettingsQuery, GetAutoUnitsSettingsQueryVariables>({
        query: GetAutoUnitsSettingsDocument,
        cache,
        data: { autoUnitsSettings: data.resetAutoUnitsSettings },
        variables: { villageId },
      });
    },
  });

  return {
    settings: queryLoading || !queryData
      ? null
      : queryData.autoUnitsSettings,
    updateSettings,
    resetSettings,
  };
};

type Props = {
  readonly villageId: string;
};

export const AutoUnitsSettings: React.FC<Props> = ({ villageId }) => {
  const [state, setState] = useState<UpdateAutoUnitsSettingsInput>();
  const [hasChanges, setHasChanges] = useState(false);

  const {
    resetSettings,
    settings,
    updateSettings,
  } = useAutoUnitsSettings(villageId);

  useEffect(() => {
    if (settings) {
      setState({
        allow: settings.allow,
        coolDown: settings.coolDown,
        minCrop: settings.minCrop,
        useHeroResources: settings.useHeroResources,
      });
      setHasChanges(false);
    }
  }, [settings]);

  useEffect(() => {
    if (state && hasChanges) {
      updateSettings({ variables: { villageId, settings: state } });
    }
  }, [state, hasChanges, updateSettings, villageId]);

  const onCoolDownChange = useCallback((coolDown: CoolDownModel): void => {
    setState(prevState => prevState && ({
      ...prevState,
      coolDown,
    }));
    setHasChanges(true);
  }, []);

  if (!state) {
    return null;
  }

  const onReset = () => {
    resetSettings({ variables: { villageId } });
  };

  const {
    allow,
    coolDown,
    minCrop,
    useHeroResources,
  } = state;

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

  const onNumberChange = createOnNumberChanged({
    callback: (name, value) => {
      setState(prevState => prevState && ({
        ...prevState,
        [name]: +value,
      }));
      setHasChanges(true);
    },
    minValue: 0,
  });

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
        <label htmlFor="allow">Allow</label>
        <input
          checked={allow}
          id="allow"
          name="allow"
          onChange={onChange}
          type="checkbox"
        />
      </div>

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
        <label>Cooldown</label>
        <CoolDown
          onChange={onCoolDownChange}
          value={coolDown}
        />
      </div>

      <div>
        <label htmlFor="minCrop">Min crop</label>
        <input
          id="minCrop"
          name="minCrop"
          onChange={onNumberChange}
          type="number"
          value={minCrop}
        />
      </div>
    </div>
  );
};
