import Button from '@material-ui/core/Button';
import graphql from 'babel-plugin-relay/macro';
import React, { useCallback, useEffect, useState } from 'react';
import {
  useLazyLoadQuery,
  useMutation,
} from 'react-relay/hooks';

import { Duration as DurationModel } from '../../../../_shared/types/duration.type';
// TODO shared model
import {
  AdventureCriterias,
} from '../../../../main/server/_models/settings/tasks/autoAdventureSettings';
import { AutoAdventureSettingsQuery } from '../../../_graphql/__generated__/AutoAdventureSettingsQuery.graphql';
import { AutoAdventureSettingsResetSettingsMutation } from '../../../_graphql/__generated__/AutoAdventureSettingsResetSettingsMutation.graphql';
import { AutoAdventureSettingsUpdateSettingsMutation } from '../../../_graphql/__generated__/AutoAdventureSettingsUpdateSettingsMutation.graphql';
import { CoolDown } from '../../../_shared/components/controls/CoolDown';
import { Duration } from '../../../_shared/components/controls/Duration';
import { NextTaskExecution } from '../../../_shared/components/nextTaskExecution/NextTaskExecution';
import { CoolDown as CoolDownModel } from '../../../models/coolDown.type';

const autoAdventureSettingsQuery = graphql`
  query AutoAdventureSettingsQuery {
      autoAdventureSettings {
          adventureCriteria
          allow
          coolDown {
              ...CoolDown @relay(mask: false)
          }
          hardMinHealth
          maxTravelTime {
              ...Duration @relay(mask: false)
          }
          normalMinHealth
          preferHard
      }
  }
`;

const autoAdventureSettingsUpdateSettingsMutation = graphql`
  mutation AutoAdventureSettingsUpdateSettingsMutation($settings: UpdateAutoAdventureSettingsInput!) {
      updateAutoAdventureSettings(settings: $settings) {
          allow
      }
  }
`;

const autoAdventureSettingsResetSettingsMutation = graphql`
    mutation AutoAdventureSettingsResetSettingsMutation {
        resetAutoAdventureSettings {
            allow
        }
    }
`;

export const AutoAdventureSettings: React.FC = () => {
  const { autoAdventureSettings } = useLazyLoadQuery<AutoAdventureSettingsQuery>(autoAdventureSettingsQuery, {});
  const [updateSettings] = useMutation<AutoAdventureSettingsUpdateSettingsMutation>(autoAdventureSettingsUpdateSettingsMutation);
  const [resetSettings] = useMutation<AutoAdventureSettingsResetSettingsMutation>(autoAdventureSettingsResetSettingsMutation);

  const [state, setState] = useState(autoAdventureSettings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (autoAdventureSettings) {
      setState(autoAdventureSettings);
      setHasChanges(false);
    }
  }, [autoAdventureSettings]);

  useEffect(() => {
    if (state && hasChanges) {
      updateSettings({ variables: { settings: state } });
    }
  }, [state, hasChanges, updateSettings]);

  const onMaxTravelTimeChange = useCallback(
    (newMaxTravelTime: DurationModel) => {
      setState(
        (prevState) =>
          prevState && { ...prevState, maxTravelTime: newMaxTravelTime },
      );
      setHasChanges(true);
    },
    [],
  );

  const onCooldownChange = useCallback(
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
    resetSettings({ variables: {} });
  };

  const onBoolChange = (e: React.FormEvent<HTMLInputElement>): void => {
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

  const onNumberChange = (e: React.FocusEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;

    if (+value < 0) {
      return;
    }

    setState(
      (prevState) =>
        prevState && {
          ...prevState,
          [name]: +value,
        },
    );
    setHasChanges(true);
  };

  const onAdventureCriteriaChange = (
    e: React.FocusEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = e.currentTarget;

    setState(
      (prevState) =>
        prevState && {
          ...prevState,
          [name]: value,
        },
    );
    setHasChanges(true);
  };

  const {
    adventureCriteria,
    allow,
    coolDown,
    hardMinHealth,
    maxTravelTime,
    normalMinHealth,
    preferHard,
  } = state;

  return (
    <div>
      <h2>AutoAdventure</h2>

      <NextTaskExecution task={'AutoAdventure'} />

      <Button
        color="primary"
        onClick={onReset}
        type="button"
        variant="contained">
        Reset to default
      </Button>

      <div>
        <label htmlFor="allow">Allow</label>
        <input
          checked={allow}
          id="allow"
          name="allow"
          onChange={onBoolChange}
          type="checkbox"
        />
      </div>

      <div>
        <label htmlFor="preferHard">Prefer hard</label>
        <input
          checked={preferHard}
          id="preferHard"
          name="preferHard"
          onChange={onBoolChange}
          type="checkbox"
        />
      </div>

      <div>
        <label htmlFor="maxTravelTime">Max travel time</label>
        <Duration onChange={onMaxTravelTimeChange} value={maxTravelTime} />
      </div>

      <div>
        <label htmlFor="normalMinHealth">Normal min health</label>
        <input
          id="normalMinHealth"
          name="normalMinHealth"
          onChange={onNumberChange}
          type="number"
          value={normalMinHealth}
        />
      </div>

      <div>
        <label htmlFor="hardMinHealth">Hard min health</label>
        <input
          id="hardMinHealth"
          name="hardMinHealth"
          onChange={onNumberChange}
          type="number"
          value={hardMinHealth}
        />
      </div>

      <div>
        <label htmlFor="adventureCriteria">Adventure criteria</label>
        <div id="adventureCriteria">
          {AdventureCriterias.map((option) => (
            <React.Fragment key={option}>
              <input
                checked={option === adventureCriteria}
                id={option}
                name="adventureCriteria"
                onChange={onAdventureCriteriaChange}
                type="radio"
                value={option}
              />
              <label htmlFor={option}>{option}</label>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div>
        <h3>Cooldown</h3>
        <label htmlFor="maxTravelTime">Cooldown</label>
        <CoolDown onChange={onCooldownChange} value={coolDown} />
      </div>
    </div>
  );
};
