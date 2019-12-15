import {
  useMutation,
  useQuery,
} from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core';
import classNames from 'classnames';
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
  readonly className?: string;
  readonly settings: IAutoUnitsUnitSettings;
}

interface IStyleProps {
  readonly unitIndex: number;
  readonly autoBuild: boolean;
  readonly trainForever: boolean;
}

const useStyles = makeStyles<unknown, IStyleProps>({
  root: {
    display: 'flex',
  },
  unitImage: props => ({
    flex: '1',
    backgroundImage: `url("${imageLinks.getUnit(props.unitIndex)}")`,
    filter: props.autoBuild ? undefined : 'grayscale(100%)',
    opacity: props.autoBuild ? undefined : 0.2,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    marginRight: 15,
  }),
  unitInfo: {
    flex: '3',
    display: 'flex',
    flexDirection: 'column',
  },
  targetAmount: props => ({
    display: 'flex',
    visibility: props.trainForever ? 'hidden' : undefined,
  }),
});

export const UnitSettings: React.FC<IProps> = (props) => {
  const {
    className,
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
      settings: {
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
    <div className={classNames(className, classes.root)}>
      <div
        className={classes.unitImage}
        onClick={toggleAutoBuild}
      />
      <div className={classes.unitInfo}>
        <div>
          <label htmlFor="trainForever">Unlimited</label>
          <input type="checkbox" checked={trainForever} onChange={onBoolChange} id="trainForever" name="trainForever" />
        </div>
        <div className={classes.targetAmount}>
          <label>Target:</label>
          <input type="number" value={targetAmount} onChange={onNumberChange} id="targetAmount" name="targetAmount" />
        </div>
      </div>
    </div>
  );
};
