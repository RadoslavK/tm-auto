import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { IBuildingSpotLevel } from '../../../_types/graphql';
import classNames = require('classnames');

interface IProps {
  readonly level: IBuildingSpotLevel;
}

const useStyles = makeStyles({
  actualLevel: {
    background: '#FFFFFF',
    color: '#000000',
    '&--completed': {
      background: '#b8860b',
      color: '#FFFFFF',
    },
  },
  ongoingLevel: {
    background: '#7FFFD4',
    color: '#000000',
    '&--maxed': {
      foreground: '#b8860b',
    },
  },
  totalLevel: {
    background: '#0000FF',
    color: '#FFFFFF',
    '&--maxed': {
      color: '#b8860b',
    },
  },
});

export const BuildingLevelBox: React.FunctionComponent<IProps> = (props) => {
  const {
    level,
  } = props;

  const classes = useStyles({});

  const isCompleted = level.actual === level.max;
  const isMaxed = level.total === level.max;
  const totalOngoing = level.total - level.queued;
  const isOngoingMaxed = totalOngoing === level.max;

  return (
    <div>
      <span className={classNames(
        classes.actualLevel,
        { [`${classes.actualLevel}--completed`]: isCompleted },
      )}>
        {level.actual}
      </span>

      {level.ongoing > 0 && (
        <span className={classNames(
          classes.ongoingLevel,
          { [`${classes.ongoingLevel}--maxed`]: isOngoingMaxed },
        )}>
          {totalOngoing}
        </span>
      )}

      {level.queued > 0 && (
        <span className={classNames(
          classes.totalLevel,
          { [`${classes.totalLevel}--maxed`]: isMaxed },
        )}>
          {level.total}
        </span>
      )}
    </div>
  )
};
