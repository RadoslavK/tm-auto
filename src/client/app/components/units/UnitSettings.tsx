import {
  useMutation,
  useQuery,
} from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core';
import React, {
  useEffect,
  useState,
} from 'react';

import { UpdateAutoUnitsUnitSettings } from '*/graphql_operations/settings.graphql';
import { GetUnitInfo } from '*/graphql_operations/unit.graphql';

import {
  IAutoUnitsUnitSettings,
  IGetUnitInfoQuery,
  IGetUnitInfoQueryVariables,
  IUpdateAutoUnitsUnitSettingsMutation,
  IUpdateAutoUnitsUnitSettingsMutationVariables,
} from '../../../_types/graphql';
import { imageLinks } from '../../../utils/imageLinks';
import { useVillageContext } from '../../hooks/useVillageContext';

interface IProps {
  readonly settings: IAutoUnitsUnitSettings;
}

interface IStyleProps {
  readonly unitIndex: number;
  readonly autoBuild: boolean;
  readonly trainForever: boolean;
}

const useStyles = makeStyles<unknown, IStyleProps>({
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
  unitImage: props => ({
    gridColumn: '1',
    gridRow: '2 / 3',
    backgroundImage: `url("${imageLinks.getUnit(props.unitIndex)}")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    filter: props.autoBuild ? undefined : 'grayscale(100%)',
  }),
  trainForever: {
    gridColumn: '2',
    gridRow: '2',
  },
  targetAmount: props => ({
    gridColumn: '2',
    gridRow: '3',
    display: 'flex',
    visibility: props.trainForever ? 'hidden' : undefined,
  }),
});

export const UnitSettings: React.FC<IProps> = (props) => {
  const {
    settings,
  } = props;

  const { villageId } = useVillageContext();

  const { data, loading } = useQuery<IGetUnitInfoQuery, IGetUnitInfoQueryVariables>(GetUnitInfo, {
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
        autoBuild: state.autoBuild,
        targetAmount: state.targetAmount,
        trainForever: state.trainForever,
      },
    },
  });

  const classes = useStyles({ unitIndex: settings.index, autoBuild, trainForever });

  useEffect(() => {
    if (state === settings) {
      return;
    }

    updateSettings();
  }, [state, settings, updateSettings]);

  if (loading || !data) {
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
        {data.unitInfo.name}
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
