import { makeStyles } from '@material-ui/core';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import {
  useFragment,
  useLazyLoadQuery,
} from 'react-relay/hooks';

import type { QueuedBuildingRangeComponent_QueuedBuildingRange$key } from '../../../../_graphql/__generated__/QueuedBuildingRangeComponent_QueuedBuildingRange.graphql.js';
import type { QueuedBuildingRangeComponentBuildingInfoQuery } from '../../../../_graphql/__generated__/QueuedBuildingRangeComponentBuildingInfoQuery.graphql.js';
import { imageLinks } from '../../../../utils/imageLinks.js';
import { Cost } from '../Cost.js';
import { QueuedBuildingRangeActions } from './QueuedBuildingRangeActions.js';

type StyleProps = {
  readonly buildingType: number;
};

const useStyles = makeStyles<unknown, StyleProps>({
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
  readonly buildingRange: QueuedBuildingRangeComponent_QueuedBuildingRange$key;
  readonly isHighlight?: boolean;
  readonly onExpand?: (id: string) => void;
};

const queuedBuildingRangeComponentQueuedBuildingRangeFragment = graphql`
  fragment QueuedBuildingRangeComponent_QueuedBuildingRange on QueuedBuildingRange {
      type
      id
      fieldId
      buildings {
          level
      }
      buildingTime {
          ...Cost_duration
      }
      cost {
          ...Cost_resources
      }
      ...QueuedBuildingRangeActions_queuedBuildingRange
  }
`;

const queuedBuildingRangeComponentBuildingInfoQuery = graphql`
  query QueuedBuildingRangeComponentBuildingInfoQuery($buildingType: Int!) {
      buildingInfo(buildingType: $buildingType) {
          name
      }
  }
`;

export const QueuedBuildingRangeComponent: React.FC<Props> = ({
  buildingRange,
  isHighlight,
  onExpand,
}) => {
  const buildingRangeFragment = useFragment(queuedBuildingRangeComponentQueuedBuildingRangeFragment, buildingRange);
  const { buildingInfo } = useLazyLoadQuery<QueuedBuildingRangeComponentBuildingInfoQuery>(queuedBuildingRangeComponentBuildingInfoQuery, { buildingType: buildingRangeFragment.type });

  const classes = useStyles({
    buildingType: buildingRangeFragment.type,
  });

  return (
    <div className={classes.root}>
      {!isHighlight && onExpand && (
        <QueuedBuildingRangeActions
          className={classes.actions}
          onExpand={() => onExpand(buildingRangeFragment.id)}
          range={buildingRangeFragment}
        />
      )}
      <div className={classes.imageWithFieldId}>
        <div className={classes.buildingImage} />
        <div>[{buildingRangeFragment.fieldId}]</div>
      </div>
      <div className={classes.info}>
        <div>
          {buildingInfo.name} Levels {buildingRangeFragment.buildings[0].level}-
          {buildingRangeFragment.buildings[buildingRangeFragment.buildings.length - 1].level}
        </div>
        <Cost
          buildTime={buildingRangeFragment.buildingTime}
          resources={buildingRangeFragment.cost}
        />
      </div>
    </div>
  );
};