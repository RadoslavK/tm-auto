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
} from '../../../../_types/graphql';
import { getAllEnumValues } from '../../../../../_shared/enumUtils';
import { createOnNumberChanged } from '../../../utils/input/createOnNumberChanged';
import { CoolDown } from '../../controls/Cooldown';
import { useVillageSettingsContext } from './_context';

const Container: React.FC = () => {
  const { villageId } = useVillageSettingsContext();

  const [settings, setSettings] = useState<IAutoPartySettings>();
  const { data, loading } = useQuery<IGetAutoPartySettingsQuery, IGetAutoPartySettingsQueryVariables>(GetAutoPartySettings, {
    variables: { villageId },
  });

  useSubscription<IOnAutoPartySettingsChangedSubscription, IOnAutoPartySettingsChangedSubscriptionVariables>(OnAutoPartySettingsChanged, {
    variables: { villageId },
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.loading && subscriptionData.data) {
        setSettings(subscriptionData.data.autoPartySettingsChanged);
      }
    },
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

  const [updateSettings] = useMutation<IUpdateAutoPartySettingsMutation, IUpdateAutoPartySettingsMutationVariables>(UpdateAutoPartySettings,
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
  }, [state, updateSettings]);

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const {
      name,
      checked,
    } = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const onNumberChange = createOnNumberChanged({
    minValue: 0,
    callback: (name, value) => setState(prevState => ({
      ...prevState,
      [name]: +value,
    })),
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
        onClick={() => resetSettings()}
        variant="contained"
        color="primary"
        type="button"
      >
        Reset to default
      </Button>

      <div>
        <label htmlFor="allow">Allow</label>
        <input type="checkbox" checked={allow} onChange={onChange} id="allow" name="allow" />
      </div>

      <div>
        <label>Cooldown</label>
        <CoolDown value={coolDown} onChange={onCoolDownChange} />
      </div>

      <div>
        <label htmlFor="minCulturePoints">Min culture points</label>
        <input type="number" value={minCulturePoints} onChange={onNumberChange} id="minCulturePoints" name="minCulturePoints" />
      </div>

      <div>
        <label htmlFor="partyType">Min culture points</label>
        <select
          value={partyType}
          id="partyType"
          name="partyType"
          onChange={onPartyTypeChange}
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
