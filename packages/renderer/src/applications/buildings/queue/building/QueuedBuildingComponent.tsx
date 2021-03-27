import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  useFragment,
  useLazyLoadQuery,
} from 'react-relay/hooks';

import type { QueuedBuildingComponent_queuedBuilding$key } from '../../../../_graphql/__generated__/QueuedBuildingComponent_queuedBuilding.graphql.js';
import type { QueuedBuildingComponentBuildingInfoQuery } from '../../../../_graphql/__generated__/QueuedBuildingComponentBuildingInfoQuery.graphql.js';
import { imageLinks } from '../../../../utils/imageLinks.js';
import { Cost } from '../Cost.js';
import { QueuedBuildingActions } from './QueuedBuildingActions.js';

type StyleProps = {
  readonly buildingType: number;
};

const useStyles = makeStyles<unknown, StyleProps>({
  actions: {
    '& button': {
      display: 'block',
    },
  },
  buildingImage: (props) => ({
    backgroundImage: `url("${imageLinks.getBuilding(props.buildingType)}")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '4rem',
    width: '4rem',
  }),
  imageWithFieldId: {
    alignItems: 'center',
    display: 'flex',
    flexFlow: 'column',
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
  root: {
    '&>*': {
      marginLeft: '10px',
    },
    'display': 'flex',
  },
});

type Props = {
  readonly building: QueuedBuildingComponent_queuedBuilding$key;
  readonly isHighlight?: boolean;
  readonly onCollapse?: () => void;
  readonly villageId: string;
};

const queuedBuildingComponentQueuedBuildingFragment = graphql`
    fragment QueuedBuildingComponent_queuedBuilding on QueuedBuilding {
        type
        level
        fieldId
        queueId
        buildingTime {
            ...Cost_duration
        }
    }
`;

const queuedBuildingComponentBuildingInfoQuery = graphql`
  query QueuedBuildingComponentBuildingInfoQuery($buildingType: Int!, $level: Int!) {
      buildingInfo(buildingType: $buildingType) {
          name
      }
      buildingLevelInfo(buildingType: $buildingType, level: $level) {
          cost {
              ...Cost_resources
          }
      }
  }
`;

export const QueuedBuildingComponent: React.FC<Props> = ({
  building,
  isHighlight,
  onCollapse,
  villageId,
}) => {
  const queuedBuildingFragment = useFragment(queuedBuildingComponentQueuedBuildingFragment, building);
  const { buildingLevelInfo, buildingInfo } = useLazyLoadQuery<QueuedBuildingComponentBuildingInfoQuery>(queuedBuildingComponentBuildingInfoQuery, {
    buildingType: queuedBuildingFragment.type,
    level: queuedBuildingFragment.level,
  });

  const classes = useStyles({
    buildingType: queuedBuildingFragment.type,
  });

  return (
    <div className={classes.root}>
      {!isHighlight && (
        <QueuedBuildingActions
          buildingQueueId={queuedBuildingFragment.queueId}
          className={classes.actions}
          onCollapse={onCollapse}
          villageId={villageId}
        />
      )}
      <div className={classes.imageWithFieldId}>
        <div className={classes.buildingImage} />
        <div>[{queuedBuildingFragment.fieldId}]</div>
      </div>
      <div className={classes.info}>
        <div>
          {buildingInfo.name} Level {queuedBuildingFragment.level}
        </div>
        <Cost
          buildTime={queuedBuildingFragment.buildingTime}
          resources={buildingLevelInfo.cost}
        />
      </div>
    </div>
  );
};
