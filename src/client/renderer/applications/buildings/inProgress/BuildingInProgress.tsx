import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import {
  IBuildingInProgress,
  ITimestamp,
} from '../../../_types/graphql';
import { formatTimeFromSeconds } from '../../../../../server/utils/formatTime';
import { useCountDown } from '../../../hooks/useCountDown';
import { imageLinks } from '../../../utils/imageLinks';

type Props = {
  readonly building: IBuildingInProgress;
};

const getInitialTimer = (finishedAt: ITimestamp): number => {
  const timer = Math.floor(finishedAt.totalSeconds - new Date().valueOf() / 1000);

  return timer > 0
    ? timer
    : 0;
};

const useStyles = makeStyles<unknown, Props>({
  image: props => ({
    backgroundImage: `url("${imageLinks.getBuilding(props.building.type)}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    flex: 'auto',
    height: '4rem',
    width: '4rem',
  }),
  imageWithFieldId: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column',
    marginRight: 10,
  },
  info: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
  },
  root: {
    display: 'flex',
  },
});

export const BuildingInProgress: React.FC<Props> = (props) => {
  const {
    building,
  } = props;

  const classes = useStyles(props);
  const timer = useCountDown(getInitialTimer(building.finishedAt));

  const time = formatTimeFromSeconds(timer);

  return (
    <div className={classes.root}>
      <div className={classes.imageWithFieldId}>
        <div className={classes.image} />
        <div>
          [
          {building.fieldId}
          ]
        </div>
      </div>
      <div className={classes.info}>
        <div>{building.name}</div>
        <div>
          Level
          {building.level}
        </div>
        <div>{time}</div>
      </div>
    </div>
  );
};
