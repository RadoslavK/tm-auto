import { Button } from '@material-ui/core';
import React, { useCallback, useEffect, useState } from 'react';

import { updateQueryCache } from '../../../../../server/utils/graphql';
import {
  CoolDown as CoolDownModel,
  GetAutoPartySettingsDocument,
  GetAutoPartySettingsQuery,
  GetAutoPartySettingsQueryVariables,
  OnAutoPartySettingsUpdatedDocument,
  OnAutoPartySettingsUpdatedSubscription,
  OnAutoPartySettingsUpdatedSubscriptionVariables,
  UpdateAutoPartySettingsInput,
  useGetAutoPartySettingsQuery,
  useResetAutoPartySettingsMutation,
  useUpdateAutoPartySettingsMutation,
} from '../../../_graphql/graphqlHooks';
import { CoolDown } from '../../../_shared/components/controls/CoolDown';
import { createOnNumberChanged } from '../../../utils/createOnNumberChanged';

const useAutoPartySettings = (villageId: string) => {
  const {
    data: queryData,
    loading: queryLoading,
    subscribeToMore,
  } = useGetAutoPartySettingsQuery({
    variables: { villageId },
  });

  subscribeToMore<
    OnAutoPartySettingsUpdatedSubscription,
    OnAutoPartySettingsUpdatedSubscriptionVariables
  >({
    document: OnAutoPartySettingsUpdatedDocument,
    updateQuery: (_prev, { subscriptionData: { data } }) => ({
      autoPartySettings: data.autoPartySettingsUpdated,
    }),
    variables: { villageId },
  });

  const [updateSettings] = useUpdateAutoPartySettingsMutation({
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      updateQueryCache<
        GetAutoPartySettingsQuery,
        GetAutoPartySettingsQueryVariables
      >({
        cache,
        query: GetAutoPartySettingsDocument,
        data: { autoPartySettings: data.updateAutoPartySettings },
        variables: { villageId },
      });
    },
  });

  const [resetSettings] = useResetAutoPartySettingsMutation({
    update: (cache, { data }) => {
      if (!data) {
        return;
      }

      updateQueryCache<
        GetAutoPartySettingsQuery,
        GetAutoPartySettingsQueryVariables
      >({
        cache,
        query: GetAutoPartySettingsDocument,
        data: { autoPartySettings: data.resetAutoPartySettings },
        variables: { villageId },
      });
    },
  });

  return {
    settings: queryLoading || !queryData ? null : queryData.autoPartySettings,
    updateSettings,
    resetSettings,
  };
};

type Props = {
  readonly villageId: string;
};

export const AutoPartySettings: React.FC<Props> = ({ villageId }) => {
  const [state, setState] = useState<UpdateAutoPartySettingsInput>();
  const [hasChanges, setHasChanges] = useState(false);

  const { resetSettings, settings, updateSettings } = useAutoPartySettings(
    villageId,
  );

  useEffect(() => {
    if (settings) {
      setState(settings);
      setHasChanges(false);
    }
  }, [settings]);

  useEffect(() => {
    if (state && hasChanges) {
      updateSettings({ variables: { villageId, settings: state } });
    }
  }, [hasChanges, state, updateSettings, villageId]);

  const onCoolDownChange = useCallback(
    (updatedCooldown: CoolDownModel): void => {
      setState(
        (prevState) =>
          prevState && {
            ...prevState,
            coolDown: updatedCooldown,
          },
      );
      setHasChanges(true);
    },
    [],
  );

  if (!state) {
    return null;
  }

  const onReset = () => {
    resetSettings({ variables: { villageId } });
  };

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

  const onNumberChange = createOnNumberChanged({
    callback: (name, value) => {
      setState(
        (prevState) =>
          prevState && {
            ...prevState,
            [name]: +value,
          },
      );
      setHasChanges(true);
    },
    minValue: 0,
  });

  const {
    allowLarge,
    allowSmall,
    coolDown,
    minCulturePointsLarge,
    minCulturePointsSmall,
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

      <div>
        <label htmlFor="minCulturePointsSmall">Min cp for small party</label>
        <input
          id="minCulturePointsSmall"
          name="minCulturePointsSmall"
          onChange={onNumberChange}
          type="number"
          value={minCulturePointsSmall}
        />
      </div>

      <div>
        <label htmlFor="minCulturePointsLarge">Min cp for large party</label>
        <input
          id="minCulturePointsLarge"
          name="minCulturePointsLarge"
          onChange={onNumberChange}
          type="number"
          value={minCulturePointsLarge}
        />
      </div>
    </div>
  );
};
