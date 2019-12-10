import makeStyles from '@material-ui/core/styles/makeStyles';
import React, {
  useEffect,
  useState,
} from 'react';

import {
  IBuildingInProgress,
  ITimestamp,
} from '../../../../_types/graphql';
import { formatTimeFromSeconds } from '../../../../../server/utils/formatTime';
import { imageLinks } from '../../../../utils/imageLinks';

interface IProps {
  readonly building: IBuildingInProgress;
}

const getInitialTimer = (finishedAt: ITimestamp): number => {
  const timer = Math.floor(finishedAt.totalSeconds - new Date().valueOf() / 1000);

  return timer > 0
    ? timer
    : 0;
};

const useStyles = makeStyles<unknown, IProps>({
  root: {
    display: 'flex',
  },
  imageWithFieldId: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    marginRight: 10,
  },
  image: props => ({
    flex: 'auto',
    height: '4rem',
    width: '4rem',
    backgroundImage: `url("${imageLinks.getBuilding(props.building.type)}")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  }),
  info: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
  },
});

export const BuildingInProgress: React.FC<IProps> = (props) => {
  const {
    building,
  } = props;

  const [timer, setTimer] = useState(getInitialTimer(building.finishedAt));
  const classes = useStyles(props);

  useEffect(() => {
    setTimer(getInitialTimer(building.finishedAt));
  }, [building]);

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        if (timer <= 0) {
          clearInterval(intervalId);
        } else {
          setTimer(prevTimer => prevTimer - 1);
        }
      },
      1000,
    );

    return () => clearInterval(intervalId);
  }, [building.finishedAt, timer]);

  const time = formatTimeFromSeconds(timer);

  return (
    <div className={classes.root}>
      <div className={classes.imageWithFieldId}>
        <div className={classes.image} />
        <div>[{building.fieldId}]</div>
      </div>
      <div className={classes.info}>
        <div>{building.name}</div>
        <div>Level {building.level}</div>
        <div>{time}</div>
      </div>
    </div>
  );
};
