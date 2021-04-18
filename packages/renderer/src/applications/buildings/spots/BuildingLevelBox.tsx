import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import type { BuildingState } from 'shared/enums/BuildingState.js';

import type { BuildingLevelBox_buildingSpotLevel$key } from '../../../_graphql/__generated__/BuildingLevelBox_buildingSpotLevel.graphql.js';

type Props = {
  readonly className?: string;
  readonly level: BuildingLevelBox_buildingSpotLevel$key;
};

const buildingLevelBoxBuildingSpotLevelFragment = graphql`
  fragment BuildingLevelBox_buildingSpotLevel on BuildingSpotLevel {
      actual
      ongoing
      queued
      state
  }
`;

type StyleProps = {
  readonly state: BuildingState;
};

const useStyles = makeStyles<unknown, StyleProps>({
  actualLevel: (props) => ({
    background:
      props.state === 'Completed' ? '#B8860B' : '#FFFFFF',
    border: '1px solid black',
    color: props.state === 'Completed' ? '#FFFFFF' : '#000000',
  }),
  ongoingLevel: (props) => ({
    background: '#7FFFD4',
    border: '1px solid black',
    color:
      props.state === 'OngoingMaxed' ? '#B8860B' : '#000000',
  }),
  totalLevel: (props) => ({
    background: '#0000FF',
    border: '1px solid black',
    color:
      props.state === 'QueueMaxed' ? '#B8860B' : '#FFFFFF',
  }),
});

export const BuildingLevelBox: React.FC<Props> = ({ className, level }) => {
  const buildingSpotLevelFragment = useFragment(buildingLevelBoxBuildingSpotLevelFragment, level);

  const classes = useStyles({ state: buildingSpotLevelFragment.state });

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