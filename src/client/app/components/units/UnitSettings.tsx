import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  useMutation,
  useQuery,
} from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core';
import {
  IAutoUnitsUnitSettings,
  IGetGameInfoQuery,
  IGetUnitInfoQuery,
  IGetUnitInfoQueryVariables,
  IUpdateAutoUnitsUnitSettingsMutation,
  IUpdateAutoUnitsUnitSettingsMutationVariables,
  Tribe,
} from '../../../_types/graphql';
import { imageLinks } from '../../../utils/imageLinks';
import { GetGameInfo } from '*/graphql_operations/player.graphql';
import { GetUnitInfo } from '*/graphql_operations/unit.graphql';
import {
  UpdateAutoUnitsUnitSettings,
} from '*/graphql_operations/settings.graphql';
import {
  IVillageContext,
  VillageContext,
} from '../villages/context/VillageContext';

interface IProps {
  readonly settings: IAutoUnitsUnitSettings;
}

const useStyles = makeStyles<unknown, [number, boolean, Tribe | null]>({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gridTemplateRows: 'repeat(3, 1fr)',
    gridGap: 10,
  },
  unitName: {
    gridColumn: '1 / 3',
    gridRow: '1',
  },
  unitImage: ([index, autoBuild, tribe]) => ({
    gridColumn: '1',
    gridRow: '2 / 3',
    backgroundImage: tribe ? `url("${imageLinks.getUnit(tribe, index)}")` : '',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    filter: autoBuild ? undefined : 'grayscale(100%)',
  }),
  trainForever: {
    gridColumn: '2',
    gridRow: '2',
  },
  targetAmount: ([_, autoBuild]) => ({
    gridColumn: '2',
    gridRow: '3',
    display: 'flex',
    visibility: autoBuild ? 'hidden' : undefined,
  }),
});

export const UnitSettings: React.FC<IProps> = (props) => {
  const {
    settings,
  } = props;

  const { villageId } = useContext<IVillageContext>(VillageContext);
  const { data, loading } = useQuery<IGetGameInfoQuery>(GetGameInfo);

  const { data: unitInfoData, loading: unitInfoLoading } = useQuery<IGetUnitInfoQuery, IGetUnitInfoQueryVariables>(GetUnitInfo, {
    variables: { index: settings.index },
  });

  const [state, setState] = useState(settings);

  const {
    autoBuild,
    trainForever,
    targetAmount,
  } = state;

  const [updateSettings] = useMutation<IUpdateAutoUnitsUnitSettingsMutation, IUpdateAutoUnitsUnitSettingsMutationVariables>(UpdateAutoUnitsUnitSettings, {
    variables: {
      input: {
        villageId,
        unitIndex: settings.index,
        autoBuild,
        targetAmount,
        trainForever,
      },
    },
  });

  const classes = useStyles([settings.index, autoBuild, data ? data.gameInfo.tribe : null]);

  useEffect(() => {
    if (state === settings) {
      return;
    }

    updateSettings();
  }, [state, settings, updateSettings]);

  if (loading || !data || unitInfoLoading || !unitInfoData) {
    return null;
  }

  const onBoolChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const {
      name,
      checked,
    } = e.currentTarget;

    setState(prevState => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const onNumberChange = (e: React.FocusEvent<HTMLInputElement>): void => {
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

  const toggleAutoBuild = () => {
    setState(prevState => ({
      ...prevState,
      autoBuild: !prevState.autoBuild,
    }));
  };

  return (
    <div className={classes.root}>
      <div className={classes.unitName}>
        {unitInfoData.unitInfo.name}
      </div>
      <div
        className={classes.unitImage}
        onClick={toggleAutoBuild}
      />
      <div className={classes.trainForever}>
        <label htmlFor="trainForever">Unlimited</label>
        <input type="checkbox" checked={trainForever} onChange={onBoolChange} id="trainForever" name="trainForever" />
      </div>
      <div className={classes.targetAmount}>
        <label>Target:</label>
        <input type="number" value={targetAmount} onChange={onNumberChange} id="targetAmount" name="targetAmount" />
      </div>
    </div>
  );
};