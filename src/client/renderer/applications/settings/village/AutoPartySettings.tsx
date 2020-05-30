import {
  useMutation,
  useQuery,
  useSubscription,
} from '@apollo/client';
import { Button } from '@material-ui/core';
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  GetAutoPartySettings,
  OnAutoPartySettingsChanged,
  ResetVillageSettings,
  UpdateAutoPartySettings,
} from '*/graphql_operations/settings.graphql';

import {
  AutoPartySettings,
  CoolDown as CoolDownModel,
  GetAutoPartySettingsQuery,
  GetAutoPartySettingsQueryVariables,
  OnAutoPartySettingsChangedSubscription,
  OnAutoPartySettingsChangedSubscriptionVariables,
  PartyType,
  ResetVillageSettingsMutation,
  ResetVillageSettingsMutationVariables,
  UpdateAutoPartySettingsInput,
  UpdateAutoPartySettingsMutation,
  UpdateAutoPartySettingsMutationVariables,
  VillageSettingsType,
} from '../../../_graphql/types/graphql.type';
import { CoolDown } from '../../../_shared/components/controls/CoolDown';
import { getAllEnumValues } from '../../../../../_shared/enumUtils';
import { createOnNumberChanged } from '../../../utils/createOnNumberChanged';
import { useVillageSettingsContext } from './context/villageSettingsContext';

const Container: React.FC = () => {
  const { villageId } = useVillageSettingsContext();

  const [settings, setSettings] = useState<AutoPartySettings>();
  const { data, loading } = useQuery<GetAutoPartySettingsQuery, GetAutoPartySettingsQueryVariables>(GetAutoPartySettings, {
    variables: { villageId },
  });

  useSubscription<OnAutoPartySettingsChangedSubscription, OnAutoPartySettingsChangedSubscriptionVariables>(OnAutoPartySettingsChanged, {
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.loading && subscriptionData.data) {
        setSettings(subscriptionData.data.autoPartySettingsChanged);
      }
    },
    variables: { villageId },
  });

  useEffect(() => {
    if (!loading && data) {
      setSettings(data.autoPartySettings);
    }
  }, [loading, data]);

  if (!settings) {
    return null;
  }

  return (
    <AutoPartySettings
      key={villageId}
      settings={settings}
      villageId={villageId}
    />
  );
};

export { Container as AutoPartySettings };

type Props = {
  readonly settings: AutoPartySettings;
  readonly villageId: number;
};

const AutoPartySettings: React.FC<Props> = (props) => {
  const {
    settings,
    villageId,
  } = props;

  const [state, setState] = useState(settings);
  const input: UpdateAutoPartySettingsInput = {
    ...state,
    villageId,
  };

  const [resetSettings] = useMutation<ResetVillageSettingsMutation, ResetVillageSettingsMutationVariables>(ResetVillageSettings, {
    variables: { type: VillageSettingsType.AutoParty, villageId },
  });

  const [updateSettings] = useMutation<UpdateAutoPartySettingsMutation, UpdateAutoPartySettingsMutationVariables>(
    UpdateAutoPartySettings,
    { variables: { settings: input } },
  );

  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      setState(settings);
    }
  }, [settings]);

  useEffect(() => {
    if (state !== settings) {
      updateSettings();
    }
  }, [settings, state, updateSettings]);

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const {
      checked,
      name,
    } = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const onNumberChange = createOnNumberChanged({
    callback: (name, value) => setState(prevState => ({
      ...prevState,
      [name]: +value,
    })),
    minValue: 0,
  });

  const onCoolDownChange = useCallback((updatedCooldown: CoolDownModel): void => {
    setState(prevState => ({
      ...prevState,
      coolDown: updatedCooldown,
    }));
  }, []);

  const onPartyTypeChange = (e: React.FormEvent<HTMLSelectElement>): void => {
    const {
      name,
      value,
    } = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const {
    allow,
    coolDown,
    minCulturePoints,
    partyType,
  } = state;

  const allPartyTypes = getAllEnumValues(PartyType);

  return (
    <div>
      <Button
        color="primary"
        onClick={() => resetSettings()}
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
        <label>Cooldown</label>
        <CoolDown
          onChange={onCoolDownChange}
          value={coolDown}
        />
      </div>

      <div>
        <label htmlFor="minCulturePoints">Min culture points</label>
        <input
          id="minCulturePoints"
          name="minCulturePoints"
          onChange={onNumberChange}
          type="number"
          value={minCulturePoints}
        />
      </div>

      <div>
        <label htmlFor="partyType">Min culture points</label>
        <select
          id="partyType"
          name="partyType"
          onChange={onPartyTypeChange}
          value={partyType}
        >
          {allPartyTypes.map(pType => (
            <option
              key={pType}
              value={pType}
            >
              {pType}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
