import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

import { BuildingSpotLevel } from '../../../_graphql/graphqlHooks';

type Props = {
  readonly className?: string;
  readonly level: BuildingSpotLevel;
};

enum BuildingState {
  Completed = 'Completed',
  None = 'None',
  OngoingMaxed = 'OngoingMaxed',
  QueueMaxed = 'QueueMaxed'
}

type StyleProps = {
  readonly levelState: BuildingState;
};

const useStyles = makeStyles<unknown, StyleProps>({
  actualLevel: props => ({
    background: props.levelState === BuildingState.Completed ? '#B8860B' : '#FFFFFF',
    border: '1px solid black',
    color: props.levelState === BuildingState.Completed ? '#FFFFFF' : '#000000',
  }),
  ongoingLevel: props => ({
    background: '#7FFFD4',
    border: '1px solid black',
    color: props.levelState === BuildingState.OngoingMaxed ? '#B8860B' : '#000000',
  }),
  totalLevel: props => ({
    background: '#0000FF',
    border: '1px solid black',
    color: props.levelState === BuildingState.QueueMaxed ? '#B8860B' : '#FFFFFF',
  }),
});

const getLevelState = (props: Props): BuildingState => {
  const {
    level,
  } = props;

  const isCompleted = level.actual === level.max;
  const isMaxed = level.total === level.max;
  const isOngoingMaxed = level.ongoing === level.max;

  if (isCompleted) {
    return BuildingState.Completed;
  }

  if (isOngoingMaxed) {
    return BuildingState.OngoingMaxed;
  }

  if (isMaxed) {
    return BuildingState.QueueMaxed;
  }

  return BuildingState.None;
};

export const BuildingLevelBox: React.FC<Props> = (props) => {
  const {
    className,
    level,
  } = props;

  const levelState = getLevelState(props);
  const classes = useStyles({ levelState });

  return (
    <div className={className}>
      <span className={classes.actualLevel}>
        {level.actual}
      </span>

      {level.ongoing && (
        <span className={classes.ongoingLevel}>
          {level.ongoing}
        </span>
      )}

      {level.queued && (
        <span className={classes.totalLevel}>
          {level.queued}
        </span>
      )}
    </div>
  );
};
