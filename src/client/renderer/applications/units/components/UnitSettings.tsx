import {
  useMutation,
  useQuery,
} from '@apollo/react-hooks';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, {
  useEffect,
  useState,
} from 'react';

import { UpdateAutoUnitsUnitSettings } from '*/graphql_operations/settings.graphql';
import { GetUnitInfo } from '*/graphql_operations/unit.graphql';

import {
  AutoUnitsUnitSettings,
  GetUnitInfoQuery,
  GetUnitInfoQueryVariables,
  UpdateAutoUnitsUnitSettingsMutation,
  UpdateAutoUnitsUnitSettingsMutationVariables,
} from '../../../_types/graphql';
import { imageLinks } from '../../../utils/imageLinks';
import { useVillageContext } from '../../villages/context/villageContext';

type Props = {
  readonly className?: string;
  readonly settings: AutoUnitsUnitSettings;
};

type StyleProps = {
  readonly autoBuild: boolean;
  readonly trainForever: boolean;
  readonly unitIndex: number;
};

const useStyles = makeStyles<unknown, StyleProps>({
  root: {
    display: 'flex',
  },
  targetAmount: props => ({
    display: 'flex',
    visibility: props.trainForever ? 'hidden' : undefined,
  }),
  targetAmountInput: {
    maxWidth: 70,
  },
  unitImage: props => ({
    backgroundImage: `url("${imageLinks.getUnit(props.unitIndex)}")`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    filter: props.autoBuild ? undefined : 'grayscale(100%)',
    flex: '1',
    marginRight: 15,
    opacity: props.autoBuild ? undefined : 0.2,
  }),
  unitInfo: {
    display: 'flex',
    flex: '3',
    flexDirection: 'column',
  },
});

export const UnitSettings: React.FC<Props> = (props) => {
  const {
    className,
    settings,
  } = props;

  const { villageId } = useVillageContext();

  const { data, loading } = useQuery<GetUnitInfoQuery, GetUnitInfoQueryVariables>(GetUnitInfo, {
    variables: { index: settings.index },
  });

  const [state, setState] = useState(settings);

  const {
    autoBuild,
    targetAmount,
    trainForever,
  } = state;

  const [updateSettings] = useMutation<UpdateAutoUnitsUnitSettingsMutation, UpdateAutoUnitsUnitSettingsMutationVariables>(UpdateAutoUnitsUnitSettings, {
    variables: {
      settings: {
        autoBuild: state.autoBuild,
        targetAmount: state.targetAmount,
        trainForever: state.trainForever,
        unitIndex: settings.index,
        villageId,
      },
    },
  });

  const classes = useStyles({ autoBuild, trainForever, unitIndex: settings.index });

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
      checked,
      name,
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

  const toggleAutoBuild = (): void => {
    setState(prevState => ({
      ...prevState,
      autoBuild: !prevState.autoBuild,
    }));
  };

  return (
    <div className={clsx(className, classes.root)}>
      <div
        className={classes.unitImage}
        onClick={toggleAutoBuild}
      />
      <div className={classes.unitInfo}>
        <div>
          <label htmlFor="trainForever">Unlimited</label>
          <input
            checked={trainForever}
            id="trainForever"
            name="trainForever"
            onChange={onBoolChange}
            type="checkbox"
          />
        </div>
        <div className={classes.targetAmount}>
          <label>Target:</label>
          <input
            className={classes.targetAmountInput}
            id="targetAmount"
            name="targetAmount"
            onChange={onNumberChange}
            type="number"
            value={targetAmount}
          />
        </div>
      </div>
    </div>
  );
};
