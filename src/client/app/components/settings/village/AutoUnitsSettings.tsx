import React, {
  useEffect,
  useState,
} from 'react';
import {
  useMutation,
  useQuery,
} from '@apollo/react-hooks';
import { Button } from '@material-ui/core';
import {
  IAutoUnitsSettings,
  ICoolDown,
  IGetAutoUnitsSettingsQuery,
  IGetAutoUnitsSettingsQueryVariables,
  IResetAutoUnitsSettingsMutation,
  IResetAutoUnitsSettingsMutationVariables,
  IUpdateAutoUnitsSettingsMutation,
  IUpdateAutoUnitsSettingsMutationVariables,
} from '../../../../_types/graphql';
import { CoolDown } from '../../controls/Cooldown';
import {
  GetAutoUnitsSettings,
  ResetAutoUnitsSettings,
  UpdateAutoUnitsSettings,
} from '*/graphql_operations/settings.graphql';
import { useVillageContext } from '../../../hooks/useVillageContext';

interface IProps {
  readonly settings: IAutoUnitsSettings;
  readonly reload: () => void;
}

const Container: React.FC = () => {
  const { villageId } = useVillageContext();
  const { data, loading, refetch } = useQuery<IGetAutoUnitsSettingsQuery, IGetAutoUnitsSettingsQueryVariables>(GetAutoUnitsSettings, {
    variables: { villageId },
  });

  if (!data || loading) {
    return null;
  }

  return (
    <AutoUnitsSettings
      settings={data.autoUnitsSettings}
      reload={refetch}
    />
  );
};

export { Container as AutoUnitsSettings };

const AutoUnitsSettings: React.FC<IProps> = (props) => {
  const {
    reload,
    settings,
  } = props;

  const { villageId } = useVillageContext();
  const [state, setState] = useState(settings);
  
  const [updateSettings] = useMutation<IUpdateAutoUnitsSettingsMutation, IUpdateAutoUnitsSettingsMutationVariables>(UpdateAutoUnitsSettings, {
    variables: {
      input: { ...state, villageId },
    },
  });

  useEffect(() => {
    if (state !== settings) {
      updateSettings();
    }
  }, [state, settings, updateSettings]);
  
  const [resetSettings, resetSettingsResult] = useMutation<IResetAutoUnitsSettingsMutation, IResetAutoUnitsSettingsMutationVariables>(ResetAutoUnitsSettings, {
    variables: { input: { villageId } },
  });

  useEffect(() => {
    if (resetSettingsResult.called && !resetSettingsResult.loading) {
      reload();
    }
  }, [resetSettingsResult, reload]);

  const {
    allow,
    coolDown,
    minCrop,
  } = state;

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

  const onNumberChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const {
      name,
      value,
    } = e.currentTarget;

    if (+value < 0) {
      return;
    }

    setState(prevState => ({
      ...prevState,
      [name]: +value,
    }));
  };

  const onCooldownChange = (updatedCooldown: ICoolDown): void => {
    setState(prevState => ({
      ...prevState,
      coolDown: updatedCooldown,
    }));
  };
  
  return (
    <div>
      <h2>AutoUnits</h2>

      <Button
        onClick={() => resetSettings()}
        variant="contained"
        color="primary"
        type="button"
      >
        Reset to default
      </Button>

      <label htmlFor="allow">Allow</label>
      <input type="checkbox" checked={allow} onChange={onChange} id="allow" name="allow" />

      <h3>Cooldown</h3>
      <label>Cooldown</label>
      <CoolDown value={coolDown} onChange={onCooldownChange} />

      <label htmlFor="minCrop">Min crop</label>
      <input type="number" value={minCrop} onChange={onNumberChange} id="minCrop" name="minCrop" />
    </div>
  );
};