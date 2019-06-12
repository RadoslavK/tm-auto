import makeStyles from '@material-ui/core/styles/makeStyles';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { formatTimeFromSeconds } from '../../../../../server/src/utils/formatTime';
import { IBuildingInProgress } from '../../../_types/graphql';
import { imageLinks } from '../../../utils/imageLinks';

interface IProps {
  readonly building: IBuildingInProgress;
}

const propTypes: PropTypesShape<IProps> = {
  building: PropTypes.shape({
    level: PropTypes.number.isRequired,
    type: PropTypes.number.isRequired,
  }).isRequired,
};

const getInitialTimer = (finishedAt: Date): number => {
  const timer = Math.floor((finishedAt.valueOf() - new Date().valueOf()) / 1000);

  return timer > 0
    ? timer
    : 0;
};

const useStyles = makeStyles<unknown, IProps>({
  root: {
    display: 'flex',
  },
  image: props => ({
    flex: '1',
    height: '4rem',
    width: '4rem',
    backgroundImage: `url("${imageLinks.getBuilding(props.building.type)}")`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
  }),
  info: {
    flex: '1',
  },
});

const BuildingInProgress: React.FunctionComponent<IProps> = (props) => {
  const {
    building,
  } = props;

  const [timer, setTimer] = useState(getInitialTimer(building.finishedAt));
  const classes = useStyles(props);

  useEffect(() => {
    const intervalId = setInterval(
      () =>  {
        if (timer <= 0) {
          clearInterval(intervalId);
        } else {
          setTimer(prevTimer => prevTimer - 1);
        }
      },
      1000,
    );

    return () => clearInterval(intervalId);
  }, [ building.finishedAt ]);

  const time = formatTimeFromSeconds(timer);

  return (
    <div className={classes.root}>
      <div className={classes.image} />
      <div className={classes.info}>
        <div>{building.name}</div>
        <div>Level {building.level}</div>
        <div>{time}</div>
      </div>
    </div>
  );
};

BuildingInProgress.displayName = 'BuildingInProgress';
BuildingInProgress.propTypes = propTypes;

export { BuildingInProgress };
