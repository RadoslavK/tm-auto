import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import {
  useFragment,
  useLazyLoadQuery,
} from 'react-relay/hooks';
import { formatTimeFromSeconds } from '../../../../_shared/utils/formatTime.js';

import { useCountDown } from '../../../hooks/useCountDown.js';
import { Timestamp } from '../../../models/timestamp.js';
import { imageLinks } from '../../../utils/imageLinks.js';
import graphql from 'babel-plugin-relay/macro';
import { BuildingInProgress_buildingInProgress$key } from '../../../_graphql/__generated__/BuildingInProgress_buildingInProgress.graphql.js';
import { BuildingInProgressBuildingInfoQuery } from '../../../_graphql/__generated__/BuildingInProgressBuildingInfoQuery.graphql.js';

type Props = {
  readonly building: BuildingInProgress_buildingInProgress$key;
};

const buildingInProgress_buildingInProgress = graphql`
  fragment BuildingInProgress_buildingInProgress on BuildingInProgress {
      fieldId
      finishedAt {
          totalSeconds
      }
      level
      type
  }
`;

const buildingInProgressBuildingInfoQuery = graphql`
  query BuildingInProgressBuildingInfoQuery($buildingType: Int!) {
      buildingInfo(buildingType: $buildingType) {
          name
      }
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
};

const useStyles = makeStyles<unknown, StylesType>({
  image: (props) => ({
    backgroundImage: `url("${imageLinks.getBuilding(props.buildingType)}")`,
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

export const BuildingInProgress: React.FC<Props> = ({ building }) => {
  const buildingFragment = useFragment(buildingInProgress_buildingInProgress, building);
  const { buildingInfo } = useLazyLoadQuery<BuildingInProgressBuildingInfoQuery>(buildingInProgressBuildingInfoQuery, { buildingType: buildingFragment.type });

  const classes = useStyles({ buildingType: buildingFragment.type });
  const timer = useCountDown(getInitialTimer(buildingFragment.finishedAt));
  const time = formatTimeFromSeconds(timer);

  return (
    <div className={classes.root}>
      <div className={classes.imageWithFieldId}>
        <div className={classes.image} />
        <div>[{buildingFragment.fieldId}]</div>
      </div>
      <div className={classes.info}>
        <div>{buildingInfo.name}</div>
        <div>
          Level
          {buildingFragment.level}
        </div>
        <div>{time}</div>
      </div>
    </div>
  );
};
