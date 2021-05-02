import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'react-relay/hooks';
import { useRecoilValue } from 'recoil';
import { formatTimeFromSeconds } from 'shared/utils/formatTime.js';

import type { BuildingInProgress_buildingInProgress$key } from '../../../_graphql/__generated__/BuildingInProgress_buildingInProgress.graphql.js';
import { villageTribeState } from '../../../_recoil/atoms/tribe.js';
import { useCountDown } from '../../../hooks/useCountDown.js';
import type { Timestamp } from '../../../models/timestamp.js';
import { imageLinks } from '../../../utils/imageLinks.js';

type Props = {
  readonly building: BuildingInProgress_buildingInProgress$key;
};

const buildingInProgress_buildingInProgress = graphql`
  fragment BuildingInProgress_buildingInProgress on BuildingInProgress {
      name
      fieldId
      finishedAt {
          totalSeconds
      }
      level
      type
  }
`;

const getInitialTimer = (finishedAt: Timestamp): number => {
  const timer = Math.floor(
    finishedAt.totalSeconds - new Date().valueOf() / 1000,
  );

  return timer > 0 ? timer : 0;
};

type StylesType = {
  readonly buildingType: number;
  readonly tribe: string;
};

const useStyles = makeStyles<unknown, StylesType>({
  buildingName: {
    fontWeight: 500,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: (props) => ({
    backgroundImage: `url("${imageLinks.getBuilding(props.buildingType, props.tribe)}")`,
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
  root: {
    display: 'flex',
  },
});

export const BuildingInProgress: React.FC<Props> = ({ building }) => {
  const buildingFragment = useFragment(buildingInProgress_buildingInProgress, building);
  const tribe = useRecoilValue(villageTribeState);
  const classes = useStyles({ buildingType: buildingFragment.type, tribe });
  const timer = useCountDown(getInitialTimer(buildingFragment.finishedAt));
  const time = formatTimeFromSeconds(timer);

  return (
    <div className={classes.root}>
      <div className={classes.imageWithFieldId}>
        <div className={classes.image} />
        <div>[{buildingFragment.fieldId}]</div>
      </div>
      <div className={classes.info}>
        <div className={classes.buildingName}>
          {buildingFragment.name} {buildingFragment.level}
        </div>
        <div>
          {time}
        </div>
      </div>
    </div>
  );
};

BuildingInProgress.displayName = 'BuildingInProgress';