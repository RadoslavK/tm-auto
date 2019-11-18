import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { IBuildingSpotLevel } from '../../../../_types/graphql';

interface IProps {
  readonly className?: string;
  readonly level: IBuildingSpotLevel;
}

enum BuildingState {
  None = 'None',
  Completed = 'Completed',
  QueueMaxed = 'QueueMaxed',
  OngoingMaxed = 'OngoingMaxed',
}

interface IStyleProps {
  readonly levelState: BuildingState;
}

const useStyles = makeStyles<unknown, IStyleProps>({
  actualLevel: props => ({
    border: '1px solid black',
    background: props.levelState === BuildingState.Completed ? '#B8860B' : '#FFFFFF',
    color: props.levelState === BuildingState.Completed ? '#FFFFFF' : '#000000',
  }),
  ongoingLevel: props => ({
    border: '1px solid black',
    background: '#7FFFD4',
    color: props.levelState === BuildingState.OngoingMaxed ? '#B8860B' : '#000000',
  }),
  totalLevel: props => ({
    border: '1px solid black',
    background: '#0000FF',
    color: props.levelState === BuildingState.QueueMaxed ? '#B8860B' : '#FFFFFF',
  }),
});

const getLevelState = (props: IProps): BuildingState => {
  const {
    level,
  } = props;

  const isCompleted = level.actual === level.max;
  const isMaxed = level.total === level.max;
  const totalOngoing = level.total - level.queued;
  const isOngoingMaxed = totalOngoing === level.max;

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

export const BuildingLevelBox: React.FunctionComponent<IProps> = (props) => {
  const {
    className,
    level,
  } = props;

  const totalOngoing = level.actual + level.ongoing;
  const levelState = getLevelState(props);
  const classes = useStyles({ levelState });

  return (
    <div className={className}>
      <span className={classes.actualLevel}>
        {level.actual}
      </span>

      {level.ongoing > 0 && (
        <span className={classes.ongoingLevel}>
          {totalOngoing}
        </span>
      )}

      {level.queued > 0 && (
        <span className={classes.totalLevel}>
          {level.total}
        </span>
      )}
    </div>
  )
};
