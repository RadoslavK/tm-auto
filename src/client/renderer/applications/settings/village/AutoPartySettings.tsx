import {
  useMutation,
  useQuery,
  useSubscription,
} from '@apollo/react-hooks';
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

import { CoolDown } from '../../../_shared/components/controls/CoolDown';
import {
  IAutoPartySettings,
  ICoolDown,
  IGetAutoPartySettingsQuery,
  IGetAutoPartySettingsQueryVariables,
  IOnAutoPartySettingsChangedSubscription,
  IOnAutoPartySettingsChangedSubscriptionVariables,
  IResetVillageSettingsMutation,
  IResetVillageSettingsMutationVariables,
  IUpdateAutoPartySettingsInput,
  IUpdateAutoPartySettingsMutation,
  IUpdateAutoPartySettingsMutationVariables,
  PartyType,
  VillageSettingsType,
} from '../../../_types/graphql';
import { getAllEnumValues } from '../../../../../_shared/enumUtils';
import { createOnNumberChanged } from '../../../utils/createOnNumberChanged';
import { useVillageSettingsContext } from './_context';

const Container: React.FC = () => {
  const { villageId } = useVillageSettingsContext();

  const [settings, setSettings] = useState<IAutoPartySettings>();
  const { data, loading } = useQuery<IGetAutoPartySettingsQuery, IGetAutoPartySettingsQueryVariables>(GetAutoPartySettings, {
    variables: { villageId },
  });

  useSubscription<IOnAutoPartySettingsChangedSubscription, IOnAutoPartySettingsChangedSubscriptionVariables>(OnAutoPartySettingsChanged, {
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

interface IProps {
  readonly settings: IAutoPartySettings;
  readonly villageId: number;
}

const AutoPartySettings: React.FC<IProps> = (props) => {
  const {
    settings,
    villageId,
  } = props;

  const [state, setState] = useState(settings);
  const input: IUpdateAutoPartySettingsInput = {
    ...state,
    villageId,
  };

  const [resetSettings] = useMutation<IResetVillageSettingsMutation, IResetVillageSettingsMutationVariables>(ResetVillageSettings, {
    variables: { type: VillageSettingsType.AutoParty, villageId },
  });

  const [updateSettings] = useMutation<IUpdateAutoPartySettingsMutation, IUpdateAutoPartySettingsMutationVariables>(
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

  const onCoolDownChange = useCallback((updatedCooldown: ICoolDown): void => {
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
