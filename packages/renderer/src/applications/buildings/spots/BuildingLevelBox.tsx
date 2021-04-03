import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';

import type {
  BuildingLevelBox_buildingSpotLevel,
  BuildingLevelBox_buildingSpotLevel$key, 
} from '../../../_graphql/__generated__/BuildingLevelBox_buildingSpotLevel.graphql.js';

type Props = {
  readonly className?: string;
  readonly level: BuildingLevelBox_buildingSpotLevel$key;
  readonly maxLevel: number;
};

const buildingLevelBoxBuildingSpotLevelFragment = graphql`
  fragment BuildingLevelBox_buildingSpotLevel on BuildingSpotLevel {
      actual
      ongoing
      queued
      total
  }
`;

enum BuildingState {
  Completed = 'Completed',
  None = 'None',
  OngoingMaxed = 'OngoingMaxed',
  QueueMaxed = 'QueueMaxed',
}

type StyleProps = {
  readonly levelState: BuildingState;
};

const useStyles = makeStyles<unknown, StyleProps>({
  actualLevel: (props) => ({
    background:
      props.levelState === BuildingState.Completed ? '#B8860B' : '#FFFFFF',
    border: '1px solid black',
    color: props.levelState === BuildingState.Completed ? '#FFFFFF' : '#000000',
  }),
  ongoingLevel: (props) => ({
    background: '#7FFFD4',
    border: '1px solid black',
    color:
      props.levelState === BuildingState.OngoingMaxed ? '#B8860B' : '#000000',
  }),
  totalLevel: (props) => ({
    background: '#0000FF',
    border: '1px solid black',
    color:
      props.levelState === BuildingState.QueueMaxed ? '#B8860B' : '#FFFFFF',
  }),
});

//  TODO compute this on BE and send for BuildingSpot aka get rid of maxLevel from BuildingSpot
const getLevelState = (level: BuildingLevelBox_buildingSpotLevel, maxLevel: number): BuildingState => {
  const isCompleted = level.actual === maxLevel;
  const isMaxed = level.total === maxLevel;
  const isOngoingMaxed = level.ongoing === maxLevel;

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

export const BuildingLevelBox: React.FC<Props> = ({ className, level, maxLevel }) => {
  const buildingSpotLevelFragment = useFragment(buildingLevelBoxBuildingSpotLevelFragment, level);

  const levelState = getLevelState(buildingSpotLevelFragment, maxLevel);
  const classes = useStyles({ levelState });

  return (
    <div className={className}>
      <span className={classes.actualLevel}>{buildingSpotLevelFragment.actual}</span>

      {buildingSpotLevelFragment.ongoing && (
        <span className={classes.ongoingLevel}>{buildingSpotLevelFragment.ongoing}</span>
      )}

      {buildingSpotLevelFragment.queued && (
        <span className={classes.totalLevel}>{buildingSpotLevelFragment.queued}</span>
      )}
    </div>
  );
};

BuildingLevelBox.displayName = 'BuildingLevelBox';